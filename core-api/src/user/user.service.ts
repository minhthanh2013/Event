/* eslint-disable prettier/prettier */
import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs/internal/Observable';
import { from } from 'rxjs/internal/observable/from';
import { Repository } from 'typeorm';
import { UserAuthDto } from './dto/user.auth';
import { UserEntity } from './models/user.entity';
import { User, UserResponseDto } from './models/user.interface';
import * as argon from 'argon2';
import { ResponseData } from 'src/responsedata/response-data.dto';
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

    async findOne(id: number): Promise<UserResponseDto> {
        const user = await this.userRepository.findOne({where: {user_id: id}});
        // delete user.password;
        delete user.create_at;
        delete user.update_at;
        const response: UserResponseDto =  {} as UserResponseDto;
        response.user_id = user.user_id;
        response.user_name = user.user_name;
        response.email = user.email;
        response.firstName = user.first_name;
        response.lastName = user.last_name;
        response.balance = user.balance;
        response.password = user.password;
        return response;
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
        if (await this.userRepository.findOne({where: {email: dto.email}})) {
            throw new ConflictException('Email already exists');
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

    async updateUser(id: number, user: UserResponseDto): Promise<ResponseData> {
        const response = new ResponseData()
        const currentUser = await this.userRepository.findOne({where: {user_id: id}});
        const email = currentUser.email;
        if(email !== user.email) {
            const checkUser = await this.userRepository.findOne({where: {email: user.email}});
            if(checkUser) {
                response.status = false;
                response.data = 'Email already exists';
                return response;
            }
        }
        const data = await this.userRepository.createQueryBuilder()
        .update(UserEntity)
        .set({ email: user.email,
            first_name: user.firstName,
            last_name: user.lastName})
        .where("user_id = :id", { id: id })
        .execute()
        response.status = data.affected === 1 || data.affected === 2 || data.affected === 3;
        response.data = null;
        return response;
    }
}
