import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CircleUserRound } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Cookies from "js-cookie";
import { PopoverClose } from "@radix-ui/react-popover";

export function UserActions() {
  const session = useSession();
  const resetPreferences = () => {
    ["age", "gender", "date_gte", "date_lte"].forEach((name) => {
      Cookies.remove(name);
    });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1 right-1"
        >
          <CircleUserRound width={30} height={30} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          {session.data?.user && (
            <>
              <p>{session.data.user.name}</p>
              <p>{session.data.user.email}</p>
            </>
          )}
          <PopoverClose asChild >
            <Button size={"sm"} variant="outline" onClick={resetPreferences}>
              Reset Preferences
            </Button>
          </PopoverClose>
          <Button onClick={() => signOut()} size={"sm"} variant="outline">
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
