"use client";

import Link from "next/link";
import { Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Main Card */}
        <Card className="border-muted/20 bg-card p-8 shadow-lg">
          {/* Icon Container */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl" />
              <div className="relative bg-primary/5 p-4 rounded-full border border-primary/20">
                <Search className="w-8 h-8 text-primary" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="text-center space-y-4">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">404</h1>
              <p className="text-lg text-muted-foreground">Sahifa topilmadi</p>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Siz qidirayotgan sahifa mavjud emas yoki koʻchirilgan
            </p>

            {/* Info Box */}
            <div className="bg-muted/50 border border-muted rounded-lg p-4 mt-6">
              <p className="text-sm text-muted-foreground text-left">
                {`Agar sahifa o'chirilgan bo'lsa, URL noto'g'ri bo'lsa, bu sodir
                bo'lishi mumkin. Yoki siz unga kirish huquqiga ega emassiz.`}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 mt-8">
            <Link href="/" className="w-full">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Asosiy sahifaga qaytish
              </Button>
            </Link>
            <Button
              onClick={() => {
                router.back();
              }}
              variant="outline"
              className="w-full border-border hover:bg-muted bg-transparent"
            >
              Orqaga qaytish
            </Button>
          </div>
        </Card>

        {/* Footer Text */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Lost?{" "}
          <Link
            href="/help"
            className="text-primary hover:underline font-medium"
          >
            Check our help center
          </Link>
        </p>
      </div>
    </main>
  );
}
