"use client";

import "@rainbow-me/rainbowkit/styles.css";
import "./globals.css";

import { Raleway } from "next/font/google";
import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { Toaster } from "react-hot-toast";
import { WagmiConfig } from "wagmi";

import NavBar from "./home/components/NavBar.client";
import { BannerWrapper } from "./common/components/BannerWrapper";
import { navigationBarConfig } from "./router";

import { wagmiConfig } from "lib/scaffold-lib/services/web3/wagmiConfig";
import { appChains } from "lib/scaffold-lib/services/web3/wagmiConnectors";

const raleway = Raleway({
  weight: ["400", "500", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-raleway",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${raleway.variable} font-sans full-screen-gradient`}
    >
      <body>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={appChains.chains} theme={lightTheme()}>
            <BannerWrapper />
            <NavBar items={navigationBarConfig} />
            <Toaster />
            <div className="mt-20 md:mt-24 mx-[3%] md:mx-[5%] lg:mx-[7%]">
              {children}
            </div>
          </RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
