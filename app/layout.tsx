import React, { ReactNode } from "react";
import "../styles/globals.css";
import Header from "../components/Header";
import Providers from "../components/Providers";

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }: RootLayoutProps) => {
  return (
    <html>
      <Providers>
        <body className="bg-gray-100 dark:bg-zinc-900 transition-all duration-700">
          <Header />
          <div className="max-w-6xl mx-auto">{children}</div>
        </body>
      </Providers>
    </html>
  );
};

export default RootLayout;
