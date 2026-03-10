import { useMemo, useCallback } from "react";
import { appActions, selectModals } from "@/utils/store/app/app.slice";
import { useAppDispatch, useAppSelector } from "./redux";

const useModal = <T = unknown>(modalName?: string) => {
  const dispatch = useAppDispatch();
  const modals = useAppSelector(selectModals);

  const modal = useMemo(
    () => modals.find((m) => m.name === modalName),
    [modals, modalName],
  );

  const open = modal?.opened ?? false;
  const data = modal?.data as T | undefined;

  const resolveName = useCallback(
    (name?: string) => name?.trim() || modalName?.trim(),
    [modalName],
  );

  const openModal = useCallback(
    (name?: string, data?: T) => {
      const n = resolveName(name);
      if (!n) {
        return;
      }

      dispatch(appActions.openModal({ name: n, data }));
    },
    [dispatch, resolveName],
  );

  const changeVisibility = useCallback(
    (name?: string, visible?: boolean) => {
      const n = resolveName(name);
      if (!n) {
        return;
      }

      dispatch(
        appActions.changeModalVisibility({
          name: n,
          visible: visible ?? false,
        }),
      );
    },
    [dispatch, resolveName],
  );

  const closeModal = useCallback(
    (name?: string) => {
      const n = resolveName(name);
      if (!n) {
        return;
      }

      dispatch(appActions.closeModal(n));
    },
    [dispatch, resolveName],
  );

  const handleOpenChange = useCallback(
    (opened: boolean) => changeVisibility(modalName, opened),
    [changeVisibility, modalName],
  );

  return {
    open,
    data,
    handleOpenChange,
    openModal,
    changeVisibility,
    closeModal,
  };
};

export default useModal;
