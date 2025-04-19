import type { RefreshTokenDto } from '@/application/dtos';
import type { UserRepository } from '@/application/interfaces';
import type { UserEntity } from '@/domain';

export interface ISaveRefreshTokenUseCase {
  execute(refreshTokenDto: RefreshTokenDto): Promise<UserEntity>;
}

export class SaveRefreshTokenUseCase implements ISaveRefreshTokenUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  execute(refreshTokenDto: RefreshTokenDto): Promise<UserEntity> {
    return this.userRepository.saveRefreshToken(refreshTokenDto);
  }
}
