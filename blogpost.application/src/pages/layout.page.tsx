import Footer from "@/components/footer.component";
import Header from "@/components/header.component";
import Notification from "@/components/notification.component";
import PostDialog from "@/components/post-dialog.component";
import ScrollTopButton from "@/components/scroll-top-button.component";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <TooltipProvider>
      <div className="w-full flex flex-col h-dvh">
        <Header />
        <main className="mt-14 flex-1 w-full px-3 max-w-7xl mx-auto flex flex-col">
          <Outlet />
        </main>
        <PostDialog />
        <Footer />
        <Toaster />
        <Notification />
        <ScrollTopButton />
      </div>
    </TooltipProvider>
  );
};

export default RootLayout;
