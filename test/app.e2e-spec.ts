import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing'
import * as pactum from 'pactum';
import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from '../src/app.module';
import { AuthDto } from 'src/auth/dto';
import { EditUserDto } from 'src/user/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,  
      })
    );
  await app.init();
  await app.listen(3333);
  prisma = app.get(PrismaService);
  await prisma.cleanDb();
  pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(() => {
    app.close();
  })

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'thanh@gmail.com',
      password: '123',
    }
    describe('Signup', () => {
      it('Should throw error if email empty', () => {
        return pactum
        .spec()
        .post(
          '/auth/signup',
        )
        .withBody({
          password: dto.password,
        })
        .expectStatus(400)
      })
    });

    describe('Signup', () => {
      it('Should throw error if password empty', () => {
        return pactum
        .spec()
        .post(
          '/auth/signup',
        )
        .withBody({
          password: dto.email,
        })
        .expectStatus(400)
      })
    });

    describe('Signup', () => {
      it('Should throw error if no dto', () => {
        return pactum
        .spec()
        .post(
          '/auth/signup',
        )
        .withBody({})
        .expectStatus(400)
      })
    });


    describe('Signup', () => {
      it('Should signup', () => {
        return pactum
        .spec()
        .post(
          '/auth/signup',
        )
        .withBody(dto)
        .expectStatus(201)
      })
    });

    describe('Signin', () => {
      it('Should throw error if email empty', () => {
        return pactum
        .spec()
        .post(
          '/auth/signin',
        )
        .withBody({
          password: dto.password,
        })
        .expectStatus(400)
      })
    });

    describe('Signin', () => {
      it('Should throw error if password empty', () => {
        return pactum
        .spec()
        .post(
          '/auth/signin',
        )
        .withBody({
          password: dto.email,
        })
        .expectStatus(400)
      })
    });

    describe('Signin', () => {
      it('Should throw error if no dto', () => {
        return pactum
        .spec()
        .post(
          '/auth/signin',
        )
        .withBody({})
        .expectStatus(400)
      })
    });
    
    describe('Signin', () => {
      it('Should signin', () => {
        return pactum
        .spec()
        .post(
          '/auth/signin',
        )
        .withBody(dto)
        .expectStatus(200)
        .stores('userAt', 'access_token')
      })
    });
  });

  describe('User', () => {
    describe('Get me', () => {
      it('Should get current user', () => {
        return pactum
        .spec()
        .withHeaders({
          Authorization: 'Bearer $S{userAt}'
        })
        .get('/users/me')
        .expectStatus(200);
      })
    });
    describe('Edit user', () => {
      it('Should edit user', () => {
        const dto: EditUserDto = {
          firstName: 'Thanh',
          lastName:'Do'
        }
        return pactum
        .spec()
        .withHeaders({
          Authorization: 'Bearer $S{userAt}'
        })
        .patch('/users')
        .withBody(dto)
        .expectStatus(200)
        .expectBodyContains(dto.firstName)
        .expectBodyContains(dto.lastName)
      })
    });
  });
})
