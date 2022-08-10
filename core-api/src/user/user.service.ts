/* eslint-disable prettier/prettier */
import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs/internal/Observable';
import { from } from 'rxjs/internal/observable/from';
import { Repository } from 'typeorm';
import { UserAuthDto } from './dto/user.auth';
import { UserEntity } from './models/user.entity';
import { User } from './models/user.interface';
import * as argon from 'argon2';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwt: JwtService,
  ) {}

  findAllUsers(): Observable<User[]> {
    return from(this.userRepository.find());
  }

  findOne(id: number): Observable<User> {
    return from(this.userRepository.findOne({where: {user_id: id}}));
  }

  async signinUser(dto: UserAuthDto) {
    // find the user by email
    const user = await this.userRepository.findOne({
        where: {
            user_name: dto.username,
        },
    });
    console.log(35, user)
    // if user does not exist throw exception
    if(!user) 
        throw new ForbiddenException(
            'Creadentials incorrect',
        );
    // compare password
    const pwMatches = await argon.verify(
        user.password,
        dto.password,
    );
    // if password incorrect throw exception
    if(!pwMatches) 
        throw new ForbiddenException(
            'Creadentials incorrect',
        );

    return this.signToken(user.user_id, user.user_name, 'user');
}

async signupUser(dto: User) {
    if (await this.userRepository.findOne({where: {user_name: dto.user_name}})) {
        throw new ConflictException('Username already exists');
    }
    // generate the password hash
    const hash = await argon.hash(dto.password);
    // save the new user in the db
    try{
      dto.password = hash;
        const user = await this.userRepository.save({
          ...dto,
        });
        return this.signToken(user.user_id, user.email, 'user');
    } catch(error) {
        throw error;
    }
}

async signToken(userId: number, username: string, role: string): Promise<{access_token: string}> {
    const payload = {
        sub: userId,
        username,
        role,
    }

    const token = await this.jwt.signAsync(
        payload,
    );

    return {
        access_token: token,
    } 
}
}
