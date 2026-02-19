import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ArrowUp } from "lucide-react";

const ScrollTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!visible) return null;

  return (
    <Button
      className="fixed bottom-5 right-5 rounded-full w-10 h-10 p-3 shadow-lg"
      onClick={scrollToTop}
      variant="outline"
    >
      <ArrowUp className="w-5 h-5" />
    </Button>
  );
};

export default ScrollTopButton;
