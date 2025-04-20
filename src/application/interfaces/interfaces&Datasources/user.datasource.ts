import type { CreateUserDto, UpdateUserDto, RefreshTokenDto, SignInUserDto, RefreshTokenCookieDto } from '@/application/dtos';
import type { UserEntity } from '@/domain';

export abstract class UserDatasource {
  abstract create(createUserDto: CreateUserDto): Promise<UserEntity>;
  abstract updateById(updateUserDto: UpdateUserDto): Promise<UserEntity>;
  abstract getAll(): Promise<Array<UserEntity>>;
  abstract getById(id: number): Promise<UserEntity>;
  abstract saveRefreshToken(refreshTokenDto: RefreshTokenDto): Promise<UserEntity>;
  abstract login(signInUserDto: SignInUserDto): Promise<UserEntity | null>;
  abstract refreshToken(refreshTokenDto: RefreshTokenCookieDto): Promise<UserEntity | null>;
}
