import type { DataState } from "@/utils/types/app";
import type {
  UpdateUserAvatarRequestDto,
  UpdateUserRequestDto,
  UpdateUserResponseDto,
  User,
} from "@/utils/types/user";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "..";

interface UserState extends DataState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
  fetchStatus: "idle",
  mutateStatus: "idle",
  errors: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUser(status) {
      status.fetchStatus = "loading";
      status.errors = [];
    },
    fetchUserFulfilled(status, action: PayloadAction<User>) {
      status.user = action.payload;
    },
    fetchUserRejected(status, action: PayloadAction<string[]>) {
      status.fetchStatus = "error";
      status.errors = action.payload;
    },
    updateUser(status, _: PayloadAction<UpdateUserRequestDto>) {
      status.mutateStatus = "loading";
      status.errors = [];
    },
    updateUserFulfilled(status, _: PayloadAction<UpdateUserResponseDto>) {
      status.mutateStatus = "success";
    },
    updateUserRejected(status, action: PayloadAction<string[]>) {
      status.mutateStatus = "error";
      status.errors = action.payload;
    },
    updateUserAvatar(status, _: PayloadAction<UpdateUserAvatarRequestDto>) {
      status.mutateStatus = "loading";
      status.errors = [];
    },
    updateUserAvatarFulfilled(status, _: PayloadAction<UpdateUserResponseDto>) {
      status.mutateStatus = "success";
    },
    updateUserAvatarRejected(status, action: PayloadAction<string[]>) {
      status.mutateStatus = "error";
      status.errors = action.payload;
    },
    resetStatus(status) {
      status.fetchStatus = "idle";
      status.mutateStatus = "idle";
      status.errors = [];
    },
  },
});

export const userActions = userSlice.actions;

export type UserActions = ReturnType<
  (typeof userActions)[keyof typeof userActions]
>;

export const selectUser = (state: RootState) => state.user.user;
export const selectUserFetchStatus = (state: RootState) =>
  state.user.fetchStatus;
export const selectUserMutateStatus = (state: RootState) =>
  state.user.mutateStatus;

export default userSlice.reducer;
