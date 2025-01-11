"use client";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { subtle } from "node:crypto";
import { verifySecret, sendEmailOTP } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

const OtpModal = ({
  accountId,
  email,
}: {
  accountId: string;
  email: string;
}) => {
  const router = useRouter();
  const [isopen, setIsopen] = useState(true);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const sessionId = await verifySecret({ accountId, password });

      if (sessionId) router.push("/");
    } catch (error) {
      console.log("failed to verify otp");
    }

    setIsLoading(false);
  };
  const handleResendOtp = async () => {
    await sendEmailOTP({ email });
  };

  return (
    <AlertDialog open={isopen} onOpenChange={setIsopen}>
      <AlertDialogContent className={"shad-alert-dialog"}>
        <AlertDialogHeader className={"relative flex justify-center"}>
          <AlertDialogTitle className={"h2 text-center"}>
            Enter OTP
            <Image
              src={"/assets/icons/close-dark.svg"}
              alt={"close"}
              width={20}
              height={20}
              onClick={() => setIsopen(false)}
              className={"otp-close-button"}
            />
          </AlertDialogTitle>
          <AlertDialogDescription
            className={"subtitle-2 text-center text-light-100"}
          >
            We have sent a code to your
            <span className={"pl-1 text-brand"}>{email}</span>
          </AlertDialogDescription>
          <InputOTP maxLength={6} value={password} onChange={setPassword}>
            <InputOTPGroup className={"shad-otp"}>
              <InputOTPSlot index={0} className={"shad-otp-slot"} />
              <InputOTPSlot index={1} className={"shad-otp-slot"} />
              <InputOTPSlot index={2} className={"shad-otp-slot"} />
              <InputOTPSlot index={3} className={"shad-otp-slot"} />
              <InputOTPSlot index={4} className={"shad-otp-slot"} />
              <InputOTPSlot index={5} className={"shad-otp-slot"} />
            </InputOTPGroup>
          </InputOTP>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className={"fle w-full flex-col gap-4"}>
            <AlertDialogAction
              onClick={handleSubmit}
              className={"shad-submit-btn h-12 w-full"}
              type="button"
            >
              Submit
              {isLoading && (
                <Image
                  src="/assets/icons/loader.svg"
                  alt={"loader"}
                  width={24}
                  height={24}
                  className={"ml-2 animate-spin"}
                />
              )}
            </AlertDialogAction>
            <div className={"subtitle-2 mt-2 text-center text-light-100"}>
              Did not get a code ?
              <Button
                type="button"
                variant="link"
                className={"pl-1 text-brand"}
                onClick={handleResendOtp}
              >
                Click to resend
              </Button>
            </div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default OtpModal;
