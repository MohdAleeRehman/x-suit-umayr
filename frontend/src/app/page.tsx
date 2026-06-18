import Link from "next/link";

export default function HomePage() {
  return (
    <main className="container-fluid py-5">
      <section className="row justify-content-center">
        <div className="col-xl-8 col-lg-9">
          <div className="card shadow-sm">
            <div className="card-header border-0">
              <h3 className="card-title mb-0">X Suite Platform</h3>
            </div>
            <div className="card-body py-4">
              <h1 className="h2 mb-3">Real Estate Operations Dashboard</h1>
              <p className="text-muted mb-4" style={{ lineHeight: 1.7 }}>
                Live frontend and backend are connected with single-superadmin access, module records,
                share-ready PDF exports, and responsive mobile navigation.
              </p>
              <Link href="/login" className="btn btn-primary btn-lg">
                Continue To Login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
