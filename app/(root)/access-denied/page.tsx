import Link from "next/link";
import { AlertCircle, Lock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function AccessDeniedPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Main Card */}
        <Card className="border-destructive/20 bg-card p-8 shadow-lg">
          {/* Icon Container */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-destructive/10 rounded-full blur-xl" />
              <div className="relative bg-destructive/5 p-4 rounded-full border border-destructive/20">
                <Lock className="w-8 h-8 text-destructive" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="text-center space-y-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Ruxsat berilmadi
              </h1>
              <p className="text-lg text-muted-foreground">403</p>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Sizda bu manbaga kirish uchun ruxsat {"yo'q"}. Agar nimadir xato{" "}
              {"bo'lsa"} bu xato, iltimos, {"qo'llab"}-quvvatlash xizmatiga
              murojaat qiling.
            </p>

            {/* Alert Box */}
            <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4 flex gap-3 mt-6">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-sm text-destructive/80 text-left">
                Sizning hisobingiz ushbu amal uchun zarur ruxsatlarga ega
                {"bo'lmasligi"} mumkin.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 mt-8">
            <Link href="/" className="w-full">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Bosh sahifa
              </Button>
            </Link>
            <Link href="https://t.me/woxmen_w" className="w-full">
              <Button
                variant="outline"
                className="w-full border-border hover:bg-muted bg-transparent"
              >
                {"Qo'llab quvatlash xizmati"}
              </Button>
            </Link>
          </div>
        </Card>

        {/* Footer Text */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Yordam kerakmi?{" "}
          <Link
            href="/help"
            className="text-primary hover:underline font-medium"
          >
            {"Qo'llab quvatlash xizmatiga tashriv buyuring"}
          </Link>
        </p>
      </div>
    </main>
  );
}
