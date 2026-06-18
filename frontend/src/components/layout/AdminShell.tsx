"use client";

import Image from "next/image";
import Link from "next/link";
import { AppContent, DashboardLayout, type MenuNode } from "@adminlte/react";
import { Button } from "@/components/ui/Button";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";

type UserInfo = {
  name?: string;
  username?: string;
  role?: string;
};

type Props = {
  pageTitle: string;
  pageSubtitle?: string;
  user?: UserInfo | null;
  onLogout?: () => void;
  children: React.ReactNode;
};

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "bi bi-speedometer2" },
  { href: "/sale", label: "For Sale", icon: "bi bi-building" },
  { href: "/rent", label: "For Rent", icon: "bi bi-key" },
  { href: "/property", label: "Property", icon: "bi bi-file-earmark-text" },
  { href: "/records", label: "Records", icon: "bi bi-folder2-open" },
];

const menuItems: MenuNode[] = [
  {
    type: "group",
    text: "Workspace",
    icon: "bi bi-grid",
    children: navItems.map((item) => ({
      type: "item" as const,
      text: item.label,
      href: item.href,
      icon: item.icon,
    })),
  },
];

export function AdminShell({
  pageTitle,
  pageSubtitle,
  user,
  onLogout,
  children,
}: Props) {
  return (
    <DashboardLayout
      menuItems={menuItems}
      logo={
        <span>
          <Image src="/icons/icon-192.svg" alt="X Suite" width={28} height={28} priority />
          <span style={{ marginLeft: 8 }}>X Suite</span>
        </span>
      }
      logoHref="/dashboard"
      user={{
        name: user?.name || "Umair",
        image: "/icons/icon-192.svg",
        role: user?.role || "superadmin",
      }}
      fixedHeader
      fixedSidebar
      colorModeToggle
      topbarEnd={
        onLogout ? <Button onClick={onLogout}>Logout</Button> : undefined
      }
      linkComponent={({ href, children: linkChildren, ...props }) => (
        <Link href={href} {...props}>{linkChildren}</Link>
      )}
      footer={<><strong>X Suite.</strong> Admin workspace.</>}
    >
      <AppContent
        title={pageTitle}
        breadcrumbs={[
          { label: "Home", href: "/dashboard" },
          { label: pageTitle },
        ]}
      >
        {pageSubtitle ? <p className="text-muted mb-3">{pageSubtitle}</p> : null}
        {children}
      </AppContent>
      <MobileBottomNav />
    </DashboardLayout>
  );
}
