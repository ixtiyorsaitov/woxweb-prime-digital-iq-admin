import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { IUser } from "@/types/user";

interface UserAvatarProfileProps {
  className?: string;
  showInfo?: boolean;
  showInfoEmail?: boolean;
  user: IUser;
}

export function UserAvatarProfile({
  className,
  showInfo = false,
  showInfoEmail = true,
  user,
}: UserAvatarProfileProps) {
  return (
    <div className="flex items-center gap-2">
      <Avatar className={cn("border", className)}>
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback className="rounded-lg">
          {user.name.slice(0, 2)?.toUpperCase()}
        </AvatarFallback>
      </Avatar>

      {showInfo && (
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">{user.name}</span>
          {showInfoEmail && (
            <span className="truncate text-xs">{user.email}</span>
          )}
        </div>
      )}
    </div>
  );
}
