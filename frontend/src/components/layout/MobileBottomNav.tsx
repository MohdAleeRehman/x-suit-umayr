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
    <nav>
      <ul>
        {navItems.map((item) => {
          return (
            <li key={item.href}>
              <Link href={item.href}>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
