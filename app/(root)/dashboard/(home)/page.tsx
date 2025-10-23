"use client";

import { useSession } from "next-auth/react";
import React from "react";
import SplitText from "@/components/SplitText";
import TrueFocus from "@/components/TrueFocus";

const DashboardPage = () => {
  const { data: session } = useSession();

  // To‘liq ismni ajratib, faqat 2 tasini olish:
  const fullName = session?.currentUser?.name || "";
  const displayName = fullName.split(" ").slice(0, 2).join(" "); // "Ixtiyor Saitov"

  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex items-center justify-center flex-col gap-5 py-[10%]">
        <SplitText
          text="Xush kelibsiz!"
          className="text-5xl font-semibold text-center"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
        />

        <TrueFocus
          sentence={displayName}
          manualMode={false}
          blurAmount={5}
          borderColor="var(--primary)"
          animationDuration={2}
          pauseBetweenAnimations={1}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
