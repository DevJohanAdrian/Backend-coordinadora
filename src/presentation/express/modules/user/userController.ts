import type { UserRepository } from '@/application/interfaces';
import {
  CreateUserUseCase,
  GetAllUsersUseCase,
  GetUserByIdUseCase,
  UpdateUserByIdUseCase,
  LoginUseCase,
  RefreshTokenUseCase
} from '@/application/use-cases';
import type { Request, Response } from 'express';
import { handleCatchErrorAsync } from '@presentation/express/common/utils/handleRequest';
import { NodeMailerEmailService } from '@/infrastructure/services/NodeMailerEmailService';

export class UserContoller {
  constructor(private readonly userRepository: UserRepository) { }

  /**
   * Handle user sign-up.
   *
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   * @returns {Promise<void>} A user object.
   */
  public createUser = handleCatchErrorAsync(async (req: Request, res: Response) => {
    const { nombres, apellidos, email, password } = req.body;
    // Instanciar el servicio de email
    const emailService = new NodeMailerEmailService();
    // Pasar el servicio al caso de uso
    const userEntity = await new CreateUserUseCase(this.userRepository, emailService).execute({ nombres, apellidos, email, password });
    console.log("usercreado",userEntity);
    if (userEntity) {
      res.cookie('jwt', userEntity.refreshToken, { httpOnly: true, secure: true, sameSite: 'none', path: '/', maxAge: 24 * 60 * 60 * 1000 /** 24 horas */ })
    }
    // Responder con el modelo esperado por el frontend
    res.json({ id: userEntity.id, nombres: userEntity.nombres, apellidos: userEntity.apellidos, email: userEntity.email, token: userEntity.token }).status(201);
  })

  /**
   * Handle user sign-in.
   *
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   * @returns {Promise<void>} A user object or error.
   */
  public signIn = handleCatchErrorAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await new LoginUseCase(this.userRepository).execute({ email, password });
    // Creates Secure Cookie with refresh token
    if (user) {
      res.cookie('jwt', user.refreshToken, { httpOnly: true, secure: true, sameSite: 'none', path: '/', maxAge: 24 * 60 * 60 * 1000 /** 24 horas */ })
    }
    res.json({ id: user?.id, nombres: user?.nombres, apellidos: user?.apellidos, email: user?.email, token: user?.token }).status(200);
  })

  /**
 * Refresh the user token.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Promise<void>} A new user token.
 */
  public refreshToken = handleCatchErrorAsync(async (req: Request, res: Response) => {
    const cookies = req.cookies;
    console.log('Cookies:', cookies);

    const data = await new RefreshTokenUseCase(this.userRepository).execute({ jwt: cookies.jwt });
    res.json(data).status(200);
  })

  public getAllUser = handleCatchErrorAsync(async (req: Request, res: Response) => {
    const users = await new GetAllUsersUseCase(this.userRepository).execute();
    res.json(users);
  });

  public getUserById = handleCatchErrorAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await new GetUserByIdUseCase(this.userRepository).execute(Number.parseInt(id));
    res.json(user);
  });



  public updateUserById = handleCatchErrorAsync(async (req: Request, res: Response) => {
    const { body } = req;
    const user = await new UpdateUserByIdUseCase(this.userRepository).execute(body);
    res.json(user);
  });


}
