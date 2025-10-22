"use client";

import PageLoader from "@/components/core/page-loader";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AuthPage = () => {
  const { status } = useSession();

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, router]);
  return status !== "unauthenticated" || loading ? (
    <PageLoader />
  ) : (
    <Button
      onClick={() => {
        setLoading(true);
        signIn("google");
      }}
    >
      Google orqali
    </Button>
  );
};

export default AuthPage;
