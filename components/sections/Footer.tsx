export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container grid footer-inner">
        <div className="footer-left">
          <h2 className="footer-headline">
            <span className="is-muted">Porozmawiajmy</span> o twoim projekcie!
            <br />
            Znajdę <span className="is-muted">najlepsze i najszybsze</span> rozwiązanie.
          </h2>

          <div className="footer-brand">
            <p className="footer-name">Daria Mezeankina</p>
            <p className="footer-year">
              <span className="footer-mark" aria-hidden="true">
                ● →
              </span>{" "}
              <span className="is-muted">{year}</span>
            </p>
          </div>
        </div>

        <div className="footer-right">
          <div className="footer-status">
            <p className="footer-status-line">
              <span className="footer-mark" aria-hidden="true">
                ● →
              </span>{" "}
              Gotowa na wyzwania
            </p>
            <p className="footer-status-sub is-muted">Zlecenia &amp; część etatu</p>
          </div>

          <a className="footer-email" href="mailto:dmezeankina@gmail.com">
            dmezeankina@gmail.com
          </a>

          <nav className="footer-socials" aria-label="Social media">
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href="https://www.behance.net" target="_blank" rel="noreferrer">
              Behance
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
              Instagram
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
