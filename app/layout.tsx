import "./globals.css";
import { Providers } from "@/components/providers";
import type { ReactNode } from "react";

export const metadata = {
  title: "Warehouse Returns Inspection",
  description: "Fast, touch-first tool for inspecting returns"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="min-h-dvh flex flex-col">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}


