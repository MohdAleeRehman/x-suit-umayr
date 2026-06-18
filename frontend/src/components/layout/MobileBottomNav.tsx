"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  label: string;
};

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Home" },
  { href: "/sale", label: "Sale" },
  { href: "/rent", label: "Rent" },
  { href: "/property", label: "Property" },
  { href: "/records", label: "Records" },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  if (pathname === "/login") {
    return null;
  }

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur md:hidden">
      <ul className="mx-auto grid max-w-5xl grid-cols-5 gap-1 px-2 py-2">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex h-11 items-center justify-center rounded-lg text-[11px] font-semibold transition ${
                  active
                    ? "bg-(--brand) text-white"
                    : "bg-slate-100 text-(--ink-soft) hover:bg-slate-200"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
