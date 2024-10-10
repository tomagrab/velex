import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

type UserDropdownProps = {
  user: UserProfile | undefined;
};

export default function UserDropdown({ user }: UserDropdownProps) {
  const userName = user?.name ?? 'User';
  const userImage = user?.picture ?? 'https://picsum.photos/64';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Image
          src={userImage}
          alt={userName}
          height={32}
          width={32}
          className="rounded-full"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{userName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex">
          <Link href="/settings/profile" className="flex-1">
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex">
          <Link href="/api/auth/logout" className="flex-1">
            Logout
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
