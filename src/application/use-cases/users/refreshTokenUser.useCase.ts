import type { UserRepository } from '@/application/interfaces';
import type { UserEntity } from '@/domain';
import { createToken } from '@/presentation/express/common/utils';
import { CustomError } from '@/application/customErrors/errors';
import { RefreshTokenCookieDto } from '@/application/dtos';
import env  from '@/presentation/express/config/envs';
import jwt from 'jsonwebtoken'


export interface IRefreshTokenUseCase {
    execute(signInUserDto: RefreshTokenCookieDto): Promise<UserEntity | null>;
}

export class RefreshTokenUseCase implements IRefreshTokenUseCase {
    constructor(
        private readonly UserRepository: UserRepository,
    ) { }

    async execute(cookie: RefreshTokenCookieDto): Promise<UserEntity | null> {

        if (!cookie.jwt) {
            throw new CustomError('Refresh token no encontrado', 400)
        }

        const user = await this.UserRepository.refreshToken(cookie);
        if (!user) { throw new CustomError('Forbidden', 403) }


        const decoded = await jwt.verify(cookie.jwt, env.REFRESHSECRETKEY)
        const { id } = decoded as { id: number };
        if (user.id !== id) { throw new CustomError('Forbidden', 403) }


        // create the token
        const accessToken = await createToken(user.id.toString())
        return { token: accessToken, refreshToken: null, id: user.id, nombres: user.nombres, apellidos: user.apellidos, email: user.email, password: user.password };
    }
}
