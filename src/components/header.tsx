
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/intro", label: "Intro" },
  { href: "/digital-footprint", label: "Digital Footprint" },
  { href: "/attack-simulation", label: "Attack Simulation" },
  { href: "/steganography-challenge", label: "Steganography" },
  { href: "/latest-scams", label: "Latest Scams"},
  { href: "/conclusion", label: "Conclusion" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-8 flex items-center">
          <Link href="/intro" className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block">
              CyberAware Interactive
            </span>
          </Link>
        </div>
        <nav className="flex-1 flex items-center space-x-4 lg:space-x-6 text-sm font-medium overflow-x-auto">
          {navLinks.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className={cn(
                "transition-colors hover:text-primary whitespace-nowrap",
                pathname === href ? "text-primary" : "text-foreground/60"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
