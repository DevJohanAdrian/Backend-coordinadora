import { UserEntity } from '@/domain';
export class UserMapper {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static toDomain(user: any): UserEntity {
    return new UserEntity(user.id, user.names, user.last_names, user.email, user.password, user.token, user.refresh_token, user.is_admin);
  }
}
