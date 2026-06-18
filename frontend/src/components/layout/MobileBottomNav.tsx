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
    <nav className="fixed inset-x-0 bottom-0 z-40 border-top bg-white md:hidden">
      <ul className="nav nav-pills nav-justified m-1">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <li key={item.href} className="nav-item">
              <Link
                href={item.href}
                className={`nav-link text-xs font-semibold ${
                  active
                    ? "active bg-danger text-white"
                    : "text-muted"
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
