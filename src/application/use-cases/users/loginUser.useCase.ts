import type { UserRepository } from '@/application/interfaces';
import type { SignInUserDto } from '@/application/dtos/users/signInUserDto';
import type { UserEntity } from '@/domain';
import { comparePassword } from '@/presentation/express/common/utils';
import { createToken, createRefreshToken } from '@/presentation/express/common/utils';
import { SaveRefreshTokenUseCase } from './saveRefreshToken.useCase';
import { CustomError } from '@/application/customErrors/errors';

export interface ILoginUseCase {
    execute(signInUserDto: SignInUserDto): Promise<UserEntity | null>;
}

export class LoginUseCase implements ILoginUseCase {
    constructor(
        private readonly UserRepository: UserRepository,
    ) { }

    async execute(input: SignInUserDto): Promise<UserEntity | null> {
        const { email, password } = input;
        const user = await this.UserRepository.login(input);
        console.log("si busque", user);
        if (!user) {
            throw new CustomError('Este correo no esta registrado.');
        }


        // comparar el pasword
        const validPassword = await comparePassword(
            password,
            user.password
        )

        if (!validPassword) {
            throw new CustomError('Contraseña invalida.');
        }

        // create the token
        const token = await createToken(user.id.toString())
        const refreshToken = await createRefreshToken(user.id.toString())
        await new SaveRefreshTokenUseCase(this.UserRepository).execute({ refreshToken: refreshToken, userId: user.id});

        return { token, refreshToken, id: user.id, nombres: user.nombres, apellidos: user.apellidos, email: user.email, password: user.password };

    }
}
