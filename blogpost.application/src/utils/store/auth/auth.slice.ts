import type {
  AuthLoginRequestDto,
  AuthLoginResponseDto,
  AuthRefreshRequestDto,
  AuthRefreshResponseDto,
  AuthRegisterRequestDto,
  AuthRegisterResponseDto,
} from "@/utils/types/auth";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "..";

interface AuthState {
  isAuthenticated: boolean;
  accessToken?: string;
  isLoading: boolean;
  initialized: boolean;
  errors: string[];
}

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  initialized: false,
  errors: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, _: PayloadAction<AuthLoginRequestDto>) {
      state.isLoading = true;
      state.errors = [];
    },
    loginFulfilled(state, action: PayloadAction<AuthLoginResponseDto>) {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.initialized = true;
      state.accessToken = action.payload.accessToken;
    },
    loginRejected(state, action: PayloadAction<string[]>) {
      state.isLoading = false;
      state.initialized = true;
      state.errors = action.payload;
    },
    register(state, _: PayloadAction<AuthRegisterRequestDto>) {
      state.isLoading = true;
      state.errors = [];
    },
    registerFulfilled(state, action: PayloadAction<AuthRegisterResponseDto>) {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.initialized = true;
      state.accessToken = action.payload.accessToken;
    },
    registerRejected(state, action: PayloadAction<string[]>) {
      state.isLoading = false;
      state.initialized = true;
      state.errors = action.payload;
    },
    logout(state) {
      state.isLoading = true;
      state.errors = [];
    },
    logoutFulfilled(state) {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.initialized = true;
      state.accessToken = undefined;
    },
    logoutRejected(state, action: PayloadAction<string[]>) {
      state.isLoading = false;
      state.initialized = true;
      state.errors = action.payload;
    },
    refresh(state, _: PayloadAction<AuthRefreshRequestDto>) {
      state.isLoading = true;
      state.errors = [];
    },
    refreshFulfilled(state, action: PayloadAction<AuthRefreshResponseDto>) {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.initialized = true;
      state.accessToken = action.payload.accessToken;
    },
    refreshRejected(state, action: PayloadAction<string[]>) {
      state.isLoading = false;
      state.initialized = true;
      state.errors = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export type AuthActions = ReturnType<
  (typeof authActions)[keyof typeof authActions]
>;

export const selectIsAuthLoading = (state: RootState) => state.auth.isLoading;
export const selectIsAuthInitialized = (state: RootState) =>
  state.auth.initialized;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export default authSlice.reducer;
