type Props = {
  title?: string;
  subtitle?: string;
};

export function AppLoadingScreen({
  title = "Loading workspace...",
  subtitle = "Preparing modules, records, and secure session.",
}: Props) {
  return (
    <main className="container-fluid py-5">
      <section className="row justify-content-center">
        <div className="col-xl-7 col-lg-8">
          <section className="card shadow-sm">
            <div className="card-body py-4">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h1 className="h4 mb-2">{title}</h1>
                  <p className="text-muted mb-0">{subtitle}</p>
                </div>
                <div className="spinner-border text-primary" role="status" aria-label="Loading" />
              </div>

              <div className="progress mt-4" style={{ height: 8 }}>
                <div
                  className="progress-bar progress-bar-striped progress-bar-animated"
                  style={{ width: "65%" }}
                />
              </div>

              <p className="text-muted mt-3 mb-0" style={{ fontSize: 13 }}>
                Please wait while data modules initialize.
              </p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
