export type ActionStatus = "idle" | "loading" | "success" | "error";

export type OrderType = "asc" | "desc";

export interface DefaultQueryParams {
  search?: string;
  page?: number;
  limit?: number;
  order?: OrderType;
}

export interface DataState {
  fetchStatus: ActionStatus;
  mutateStatus: ActionStatus;
  errors: string[];
}

export interface Modal {
  name: string;
  opened: boolean;
  data: unknown;
}

export interface ModalPayload {
  name: string;
  data: unknown;
}

export interface ModalVisibilityPayload {
  name: string;
  visible: boolean;
}

export const ModalType = {
  LOGIN: "login",
  REGISTER: "register",
  EDIT_PROFILE: "edit_profile",
  POST: "post",
  EDIT_COMMENT: "comment_edit",
  EDIT_POST: "post_edit",
  DELETE_POST: "post_delete",
  DELETE_COMMENT: "comment_delete",
};
