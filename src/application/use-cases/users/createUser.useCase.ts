import type { CreateUserDto } from '@/application/dtos';
import type { UserRepository } from '@/application/interfaces';
import type { UserEntity } from '@/domain';
import { createToken, encryptPassword } from '@/presentation/express/common/utils';
import type { EmailService } from '@/application/services/EmailService';
import { CustomError } from '@/application/customErrors/errors';


export interface ICreateUserUseCase {
  execute(createUserDto: CreateUserDto): Promise<UserEntity>;
}



export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly emailService: EmailService
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userExist = await this.userRepository.login(createUserDto);


    if (userExist) {
        throw new CustomError('Este correo ya esta registrado.');
    }
    // encriptar la contraseña
    createUserDto.password = await encryptPassword(createUserDto.password)

    const user = await this.userRepository.create(createUserDto);

    // Generar token JWT
    const token = await createToken(user.id.toString());

    // se actualiza el usuario
    const userUpdated = await this.userRepository.updateById({ id: user.id, token: token, nombres: null, apellidos: null, email: null, password: null, refreshToken: null });
    // Enviar correo de confirmación
    await this.emailService.sendRegistrationConfirmation(user.email, user.nombres);
    // Responder con el modelo esperado por el frontend
    return { ...user, token };
  }
}
