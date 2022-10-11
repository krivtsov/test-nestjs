import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { AuthDto } from 'src/user/dto/auth.dto';
import {
  USER_NOT_FOUND_ERROR,
  WRONG_PASSWORD_ERROR,
  ALREADY_REGISTRED_ERROR,
  NOT_VALID_ID_ERROR,
} from '../src/user/user.constants';

const newUserPhone: AuthDto = {
  id: '+79992342358',
  password: '1213',
};

const newUserEmail: AuthDto = {
  id: 'n22ewuser@mail.ru',
  password: '1213',
};

const newUserNotValid: AuthDto = {
  id: 'n22ewuser',
  password: '1213',
};

const path = {
  signin: '/signin',
  signup: '/signup',
};

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it(`${path.signup} (POST) - success phone`, async () => {
    const { body } = await request(app.getHttpServer())
      .post(path.signup)
      .send(newUserPhone)
      .expect(201);
    const { access_token } = body;
    expect(access_token).toBeDefined();
  });

  it(`${path.signup} (POST) - fail phone`, () => {
    return request(app.getHttpServer())
      .post(path.signup)
      .send(newUserPhone)
      .expect(400, {
        statusCode: 400,
        message: ALREADY_REGISTRED_ERROR,
        error: 'Bad Request',
      });
  });

  it(`${path.signup} (POST) - success email`, async () => {
    const { body } = await request(app.getHttpServer())
      .post(path.signup)
      .send(newUserEmail)
      .expect(201);
    const { access_token } = body;
    expect(access_token).toBeDefined();
  });

  it(`${path.signup} (POST) - fail email`, () => {
    return request(app.getHttpServer())
      .post(path.signup)
      .send(newUserPhone)
      .expect(400, {
        statusCode: 400,
        message: ALREADY_REGISTRED_ERROR,
        error: 'Bad Request',
      });
  });

  it(`${path.signup} (POST) - fail id`, () => {
    return request(app.getHttpServer())
      .post(path.signup)
      .send(newUserNotValid)
      .expect(400, {
        statusCode: 400,
        message: [NOT_VALID_ID_ERROR],
        error: 'Bad Request',
      });
  });

  it(`${path.signin} (POST) - success`, async () => {
    return request(app.getHttpServer())
      .post(path.signin)
      .send(newUserPhone)
      .expect(200)
      .then(({ body }: request.Response) => {
        const { access_token } = body;
        expect(access_token).toBeDefined();
      });
  });

  it(`${path.signin} (POST) - fail pass`, () => {
    return request(app.getHttpServer())
      .post(path.signin)
      .send({ ...newUserPhone, password: '321' })
      .expect(401, {
        statusCode: 401,
        message: WRONG_PASSWORD_ERROR,
        error: 'Unauthorized',
      });
  });

  it(`${path.signin} (POST) - fail login`, () => {
    return request(app.getHttpServer())
      .post(path.signin)
      .send({ ...newUserPhone, id: '+79992342300' })
      .expect(401, {
        statusCode: 401,
        message: USER_NOT_FOUND_ERROR,
        error: 'Unauthorized',
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
