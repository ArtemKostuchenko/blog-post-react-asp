"use client";

import {
  CirclePlus,
  LogOut,
  MessageSquareQuote,
  Scroll,
  User,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import useAuth from "@/hooks/auth";
import useUser from "@/hooks/user";
import { Skeleton } from "./ui/skeleton";
import { getResourceUrl, getShortName } from "@/utils/func";
import { useNavigate } from "react-router";
import useModal from "@/hooks/modal";
import { ModalType } from "@/utils/types/app";

export function NavUser() {
  const { openModal } = useModal(ModalType.POST);
  const { logout } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => logout();

  const handleAddPost = () => openModal();

  if (!user) {
    return <Skeleton className="w-8 h-8 rounded-full" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar>
              {user.avatar && (
                <AvatarImage
                  src={getResourceUrl(user.avatar.url)}
                  alt={user.nickname}
                />
              )}
              <AvatarFallback className="rounded-lg">
                {getShortName(user.nickname)}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={4}>
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              {user.avatar && (
                <AvatarImage
                  src={getResourceUrl(user.avatar.url)}
                  alt={user.nickname}
                />
              )}
              <AvatarFallback className="rounded-lg">
                {getShortName(user.nickname)}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.nickname}</span>
              <span className="truncate text-xs">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleAddPost}>
            <CirclePlus />
            Add Post
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => navigate("/user/posts")}>
            <Scroll />
            My Posts
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/user/comments")}>
            <MessageSquareQuote />
            My Comments
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/profile")}>
            <User />
            My Profile
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
