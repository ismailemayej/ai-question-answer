import React from "react";
import loadingIcon from "../../app/load-time.gif";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import Image from "next/image";

const CustomLoading = ({ loading }: { loading: boolean }) => {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent className="bg-transparent  border-none rounded-none flex justify-center items-center">
        <Image
          src={loadingIcon}
          alt="loading"
          width={200}
          height={200}
          className="rounded-xl text-3xl bg-transparent"
        />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomLoading;
