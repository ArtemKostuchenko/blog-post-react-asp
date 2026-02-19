import {
  selectUser,
  selectUserFetchStatus,
  selectUserMutateStatus,
} from "@/utils/store/user/user.slice";
import { useAppSelector } from "./redux";

const useUser = () => {
  const user = useAppSelector(selectUser);
  const fetchStatus = useAppSelector(selectUserFetchStatus);
  const mutateStatus = useAppSelector(selectUserMutateStatus);

  return {
    user,
    fetchStatus,
    mutateStatus,
  };
};

export default useUser;
