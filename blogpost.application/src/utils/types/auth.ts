export interface AuthLoginRequestDto {
  email: string;
  password: string;
}

export interface AuthLoginResponseDto {
  accessToken: string;
  refreshToken: string;
}

export interface AuthRegisterRequestDto {
  nickname: string;
  email: string;
  password: string;
}

export interface AuthRegisterResponseDto {
  accessToken: string;
  refreshToken: string;
}

export interface AuthRefreshRequestDto {
  refreshToken: string;
}

export interface AuthRefreshResponseDto {
  accessToken: string;
  refreshToken: string;
}
