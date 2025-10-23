"use client";

import PageLoader from "@/components/core/page-loader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CalendarIcon, Chrome, LogOut, MailIcon } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
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
    // <Button
    //   onClick={() => {
    //     setLoading(true);
    //     signIn("google");
    //   }}
    // >
    //   Google orqali
    // </Button>
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Main Card */}
        <Card className="bg-card p-8 shadow-lg border-border">
          {/* Header */}
          <div className="text-center space-y-2 mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              Xush kelibsiz!
            </h1>
          </div>

          {/* Google Signup Button */}
          <div className="space-y-4">
            <Button
              onClick={() => {
                setLoading(true);
                signIn("google");
              }}
              className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-colors"
            >
              <Chrome className="w-5 h-5 mr-2" />
              {loading ? "Kirilyapti..." : "Google orqali kirish"}
            </Button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">
                  Faqatgina shu variant
                </span>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-muted/30 border border-border rounded-lg p-4 space-y-3">
              <div className="flex gap-3">
                <MailIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Xavfsiz kirish
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Biz sizni himoya qilish uchun Google xavfsiz
                    autentifikatsiyasidan foydalanamiz hisob
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
};

export default AuthPage;
