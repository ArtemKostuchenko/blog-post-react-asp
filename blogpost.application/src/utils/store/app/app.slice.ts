import type {
  Modal,
  ModalPayload,
  ModalVisibilityPayload,
} from "@/utils/types/app";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "..";

interface AppState {
  modals: Modal[];
}

const initialState: AppState = {
  modals: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    appStarted() {},
    openModal(state, action: PayloadAction<ModalPayload>) {
      const modal = state.modals.find(
        (modal) => modal.name === action.payload.name,
      );

      if (modal) {
        if (action.payload.data) {
          modal.data = action.payload.data;
        }

        modal.opened = true;
      } else {
        state.modals.push({ ...action.payload, opened: true });
      }
    },
    changeModalVisibility(
      state,
      action: PayloadAction<ModalVisibilityPayload>,
    ) {
      const modal = state.modals.find(
        (modal) => modal.name === action.payload.name,
      );
      if (modal) modal.opened = action.payload.visible;
    },
    closeModal(state, action: PayloadAction<string>) {
      state.modals = state.modals.filter(
        (modal) => modal.name !== action.payload,
      );
    },
  },
});

export const appActions = appSlice.actions;

export type AppActions = ReturnType<
  (typeof appSlice.actions)[keyof typeof appSlice.actions]
>;

export const selectModals = (state: RootState) => state.app.modals;

export default appSlice.reducer;
