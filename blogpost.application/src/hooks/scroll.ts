import { useEffect } from "react";
import { useLocation } from "react-router";

const useScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.search]);
};

export default useScrollToTop;
