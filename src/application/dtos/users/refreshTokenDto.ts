export interface RefreshTokenDto {
  refreshToken: string;
  userId: number;
}

export interface RefreshTokenCookieDto {
  jwt: string;
}

