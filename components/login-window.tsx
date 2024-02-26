import QRCode from "qrcode.react";
import { FarcasterUser } from "@/utils/types/farcaster-user";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Terms } from "./terms";
import Link from "next/link";

export const LoginWindow = ({
  farcasterUser,
  loading,
  startFarcasterSignerProcess,
  logout,
}: {
  farcasterUser: FarcasterUser | null;
  loading: boolean;
  startFarcasterSignerProcess: () => void;
  logout: () => void;
}) => {
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <div className="m-4 w-full">
        {farcasterUser?.status === "approved" ? (
          farcasterUser.fid ? (
            <>
              <p className="text-center mb-4">FID: {farcasterUser.fid}</p>
              <Button className="w-full" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            "Something is wrong..."
          )
        ) : farcasterUser?.status === "pending_approval" ? (
          ""
        ) : (
          <h2 className="text-center">Sign in to start casting photos</h2>
        )}
      </div>
      <div className="flex w-full flex-col justify-center items-center">
        {!farcasterUser?.status && (
          <div>
            <Terms
              loading={loading}
              startFarcasterSignerProcess={startFarcasterSignerProcess}
            />
          </div>
        )}
        {farcasterUser?.status === "pending_approval" &&
          farcasterUser?.signerApprovalUrl && (
            <Card className="w-full">
              <CardContent className="flex w-full flex-col items-center justify-center gap-5">
                <QRCode
                  className="mt-5"
                  value={farcasterUser.signerApprovalUrl}
                  size={200}
                />
                <h2 className="text-2xl font-bold">Use link below on mobile</h2>
                <Button asChild className="w-full">
                  <Link
                    href={farcasterUser.signerApprovalUrl}
                    className="w-full"
                  >
                    Open Link
                  </Link>
                </Button>
                <Button className="w-full" onClick={logout}>
                  Cancel
                </Button>
              </CardContent>
            </Card>
          )}
      </div>
    </div>
  );
};
