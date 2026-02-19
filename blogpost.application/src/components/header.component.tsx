import Logo from "@/assets/logo.svg";
import LoginDialog from "./login-dialog.component";
import { NavUser } from "./nav-user.component";
import useAuth from "@/hooks/auth";
import { Button } from "./ui/button";
import useModal from "@/hooks/modal";
import { ModalType } from "@/utils/types/app";
import RegisterDialog from "./register-dialog.component";
import { Link } from "react-router";
import SearchForm from "./search-form.component";

const Header = () => {
  const { openModal } = useModal(ModalType.LOGIN);
  const { isAuthenticated, isInitialized } = useAuth();

  const handleLogin = () => openModal();

  return (
    <header className="fixed w-full min-h-14 flex items-center backdrop-blur-2xl bg-white/65 border border-gray-200/65 shadow-sm z-25">
      <div className="w-full px-3 max-w-7xl mx-auto flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <img src={Logo} className="w-4 h-4" alt="BlogPost" />
          <Link className="font-medium text-gray-700" to="/">
            BlogPost
          </Link>
        </div>
        {isInitialized && <SearchForm placeholder="Search posts..." to="/" />}
        {!isAuthenticated && isInitialized && (
          <Button size="sm" type="button" onClick={handleLogin}>
            Login
          </Button>
        )}
        {isAuthenticated && isInitialized && <NavUser />}
        <LoginDialog />
        <RegisterDialog />
      </div>
    </header>
  );
};

export default Header;
