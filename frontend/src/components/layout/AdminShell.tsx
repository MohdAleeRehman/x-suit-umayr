"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  { href: "/dashboard", label: "Dashboard", icon: "fas fa-gauge" },
  { href: "/sale", label: "For Sale", icon: "fas fa-building" },
  { href: "/rent", label: "For Rent", icon: "fas fa-key" },
  { href: "/property", label: "Property", icon: "fas fa-file-lines" },
  { href: "/records", label: "Records", icon: "fas fa-folder-open" },
];

export function AdminShell({
  pageTitle,
  pageSubtitle,
  user,
  onLogout,
  children,
}: Props) {
  const pathname = usePathname();

  return (
    <div className="hold-transition sidebar-mini layout-fixed">
      <div className="wrapper">
      <nav className="main-header navbar navbar-expand navbar-white navbar-light border-bottom">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="#" role="button">
              <i className="fas fa-bars" />
            </a>
          </li>
          <li className="nav-item d-none d-md-inline-block">
            <span className="nav-link font-weight-semibold">{pageTitle}</span>
          </li>
          {pageSubtitle ? (
            <li className="nav-item d-none d-md-inline-block">
              <span className="nav-link text-muted">{pageSubtitle}</span>
            </li>
          ) : null}
        </ul>

        <ul className="navbar-nav ml-auto align-items-center">
          <li className="nav-item d-none d-sm-inline-block mr-2 text-right">
            <div className="small text-muted">{user?.role || "superadmin"}</div>
            <div className="small font-weight-bold">{user?.name || "Umair"} ({user?.username || "umair"})</div>
          </li>
          {onLogout ? (
            <li className="nav-item">
              <Button variant="primary" className="btn-sm" onClick={onLogout}>Logout</Button>
            </li>
          ) : null}
        </ul>
      </nav>

      <aside className="main-sidebar sidebar-dark-danger elevation-4">
        <Link href="/dashboard" className="brand-link d-flex align-items-center">
          <span className="brand-image img-circle elevation-2 d-flex align-items-center justify-content-center bg-white overflow-hidden">
            <Image src="/icons/icon-192.svg" alt="X Suite" width={28} height={28} priority />
          </span>
          <span className="brand-text font-weight-light">X Suite</span>
        </Link>

        <div className="sidebar">
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" role="menu" data-accordion="false">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <li className="nav-item" key={item.href}>
                    <Link href={item.href} className={`nav-link ${active ? "active" : ""}`}>
                      <i className={`nav-icon ${item.icon}`} />
                      <p>{item.label}</p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>

      <div className="content-wrapper pb-5 pb-md-0">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-12">
                <h1>{pageTitle}</h1>
                {pageSubtitle ? <p className="text-muted mb-0">{pageSubtitle}</p> : null}
              </div>
            </div>
          </div>
        </section>

        <section className="content">
          <div className="container-fluid">{children}</div>
        </section>
      </div>

      <footer className="main-footer d-none d-md-block">
        <strong>X Suite.</strong> Admin workspace.
      </footer>

      <MobileBottomNav />
      </div>
    </div>
  );
}
