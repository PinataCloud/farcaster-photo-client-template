import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { LoginWindow } from "./login-window";
import { useFarcasterIdentity } from "@/utils/use-farcaster-identity";
import { UserRound } from "lucide-react";
import { ChannelSwitch } from "./channel-change";

export function Nav({ setChannel }: any) {
  const { farcasterUser, loading, startFarcasterSignerProcess, logout } =
    useFarcasterIdentity();

  return (
    <div className="flex justify-between w-full items-center sm:w-[500px] mt-6">
      <Dialog>
        <div className="flex flex-col">
          <h1 className="font-display sm:text-4xl text-3xl">Photocaster</h1>
          <p>
            powered by{" "}
            <a
              href="https://pinata.cloud"
              className="underline text-md sm:text-lg"
              target="_blank"
            >
              Pinata
            </a>
          </p>
        </div>
        <div className="flex gap-4">
          <ChannelSwitch setChannel={setChannel} />
          <DialogTrigger>
            <Button variant="outline" size="icon">
              <UserRound className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <ThemeToggle />
        </div>
        <DialogContent className="sm:max-w-[425px] max-w-[375px]">
          <LoginWindow
            farcasterUser={farcasterUser}
            loading={loading}
            startFarcasterSignerProcess={startFarcasterSignerProcess}
            logout={logout}
          ></LoginWindow>
        </DialogContent>
      </Dialog>
    </div>
  );
}
