import type { CreateUserDto, UpdateUserDto, RefreshTokenDto, SignInUserDto, RefreshTokenCookieDto } from '@/application/dtos';
import type { UserDatasource } from '@/application/interfaces';
import type { UserEntity } from '@/domain';
import { CustomGeneralError } from '@/domain/customErrors/customGeneral.error';
import { UserMapper } from '@/infrastructure/mappers/users/user.mapper';
import { pgPool } from '@/infrastructure/services/postgres.client';

export class UserDatasourceImpl implements UserDatasource {
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const query = `
      INSERT INTO users (names, last_names, email, password)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [createUserDto.nombres, createUserDto.apellidos, createUserDto.email, createUserDto.password];
    const result = await pgPool.query(query, values);
    return UserMapper.toDomain(result.rows[0]);
  }

  async login(signInUserDto: SignInUserDto): Promise<UserEntity | null> {
    const query = `SELECT * FROM users WHERE email = $1`;
    const result = await pgPool.query(query, [signInUserDto.email]);
    const user = result.rows[0];
    if (!user) return null;
    return UserMapper.toDomain(user);
  }

  async saveRefreshToken(refreshTokenDto: RefreshTokenDto): Promise<UserEntity> {
    const query = `
      UPDATE users
      SET refresh_token = $1
      WHERE id = $2
      RETURNING *;
    `;
    const values = [refreshTokenDto.refreshToken, refreshTokenDto.userId];
    const result = await pgPool.query(query, values);
    return UserMapper.toDomain(result.rows[0]);
  }

  
  async updateById(updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.getById(updateUserDto.id);
    if (!user) throw new CustomGeneralError(`User with id: ${updateUserDto.id} not found`, 404);
  
    const query = `
      UPDATE users
      SET
        names = COALESCE($1, names),
        last_names = COALESCE($2, last_names),
        email = COALESCE($3, email),
        password = COALESCE($4, password),
        token = COALESCE($5, token),
        refresh_token = COALESCE($6, refresh_token)
      WHERE id = $7
      RETURNING *;
    `;
  
    const values = [
      updateUserDto.nombres ?? null,
      updateUserDto.apellidos ?? null,
      updateUserDto.email ?? null,
      updateUserDto.password ?? null,
      updateUserDto.token ?? null,
      updateUserDto.refreshToken ?? null,
      updateUserDto.id
    ];
  
    const result = await pgPool.query(query, values);
    return UserMapper.toDomain(result.rows[0]);
  }

// --------------------------------------------------------------------------------

  async getAll(): Promise<Array<UserEntity>> {
    const users = await pgPool.query('SELECT * FROM users');
    return users.rows.map(user => UserMapper.toDomain(user));
  }

  async getById(id: number): Promise<UserEntity> {
    const user = await pgPool.query('SELECT * FROM users WHERE id = $1', [id]);

    if (!user.rows[0]) throw new CustomGeneralError(`User with id: ${id} not found`, 404);
    return UserMapper.toDomain(user.rows[0]);
  }

  async refreshToken(refreshTokenDto: RefreshTokenCookieDto): Promise<UserEntity | null> {
    const user = await pgPool.query('SELECT * FROM users WHERE refresh_token = $1', [refreshTokenDto.jwt]);

    if (!user.rows[0]) throw new CustomGeneralError(`User with refresh token: ${refreshTokenDto.jwt} not found`, 404);
    return UserMapper.toDomain(user.rows[0]);
  }

}
