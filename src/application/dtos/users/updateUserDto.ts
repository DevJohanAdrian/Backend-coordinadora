export interface UpdateUserDto {
  id: number;
  nombres: string | null;
  apellidos: string | null;
  email: string | null;
  password: string | null;
  token: string | null;
  refreshToken: string | null;
}
