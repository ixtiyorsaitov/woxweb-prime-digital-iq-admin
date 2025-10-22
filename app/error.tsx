"use client";

import Image from "next/image";
import React from "react";
import { toast } from "sonner";

const ErrorPage = ({ error }: { error: string }) => {
  toast.error(error);
  return (
    <div className="w-full flex items-center justify-center flex-col gap-3">
      <Image width={400} height={400} src="/error.jpg" alt="Error" />
      <div className="text-center">
        <h1 className="font-semibold text-4xl">Xatolik</h1>
        <p className="text-destructive">{error}</p>
      </div>
    </div>
  );
};

export default ErrorPage;
