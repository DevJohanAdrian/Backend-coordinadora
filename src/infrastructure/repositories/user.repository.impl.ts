import type { CreateUserDto, UpdateUserDto, RefreshTokenDto, SignInUserDto, RefreshTokenCookieDto } from '@/application/dtos';
import type { UserDatasource, UserRepository } from '@/application/interfaces/index';
import type { UserEntity } from '@/domain';

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly userDatastore: UserDatasource) {}

  create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userDatastore.create(createUserDto);
  }
  updateById(updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return this.userDatastore.updateById(updateUserDto);
  }
  getAll(): Promise<Array<UserEntity>> {
    return this.userDatastore.getAll();
  }
  getById(id: number): Promise<UserEntity> {
    return this.userDatastore.getById(id);
  }
  refreshToken(refreshTokenDto: RefreshTokenCookieDto): Promise<UserEntity | null> {
    return this.userDatastore.refreshToken(refreshTokenDto);
  }
  login(signInUserDto: SignInUserDto): Promise<UserEntity | null> {
    return this.userDatastore.login(signInUserDto);
  }
  saveRefreshToken(refreshTokenDto: RefreshTokenDto): Promise<UserEntity> {
    return this.userDatastore.saveRefreshToken(refreshTokenDto);
  }
}
