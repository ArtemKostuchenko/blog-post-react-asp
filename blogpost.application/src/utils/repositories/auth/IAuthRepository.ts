import type {
  AuthLoginRequestDto,
  AuthLoginResponseDto,
  AuthRefreshRequestDto,
  AuthRefreshResponseDto,
  AuthRegisterRequestDto,
  AuthRegisterResponseDto,
} from "@/utils/types/auth";

export interface IAuthRepository {
  login(request: AuthLoginRequestDto): Promise<AuthLoginResponseDto>;
  register(request: AuthRegisterRequestDto): Promise<AuthRegisterResponseDto>;
  refresh(request: AuthRefreshRequestDto): Promise<AuthRefreshResponseDto>;
  logout(accessToken?: string): Promise<void>;
}
