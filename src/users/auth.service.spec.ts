import { BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersService } from './users.service';

describe('AuthService', () => {
  let authService: AuthService;
  let fakeUsersService: Partial<UsersService>;
  beforeEach(async () => {
    const users: User[] = [];
    fakeUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 999999),
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    authService = module.get(AuthService);
  });
  it('can create instance of auth service', async () => {
    expect(authService).toBeDefined();
  });
  it('create a new user with salt and hashed password', async () => {
    const user = await authService.signup('test@test.com', 'asdf');
    expect(user.password).not.toEqual('asdf');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  //   it('throws an error if user signup with email that in use', async (done) => {
  //     fakeUserService.find = () =>
  //       Promise.resolve([
  //         {
  //           id: 1,
  //           email: 'test@test.com',
  //           password: 'test',
  //         } as User,
  //       ]);
  //     try {
  //       await authService.signup('test@test.com', 'test');
  //     } catch (err) {
  //       done();
  //     }
  //   });

  it('throws an error if user signs up with email that is in use', async () => {
    await authService.signup('asdf@asdf.com', 'asdf');
    try {
      await authService.signup('asdf@asdf.com', 'asdf');
    } catch (e) {
      expect(e.toString()).toMatch('email in use');
    }
  });

  it('throws if an invalid password is provided', async () => {
    await authService.signup('test@test.com', 'pass1');
    try {
      await authService.signin('test@test.com', 'pass2');
    } catch (e) {
      expect(e.toString()).toMatch('bad password.');
    }
  });

  it('throws if signin is called with an unused email', async () => {
    try {
      await authService.signin('asdflkj@asdlfkj.com', 'passdflkj');
    } catch (e) {
      expect(e.toString()).toMatch('user not found.');
    }
  });
  it('returns a user if correct password is provided', async () => {
    await authService.signup('asdf@asdf.com', 'mypassword');

    const user = await authService.signin('asdf@asdf.com', 'mypassword');
    expect(user).toBeDefined();
  });
});
