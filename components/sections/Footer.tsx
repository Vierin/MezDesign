export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <p className="brand">MZ Studio</p>
          <p>Projektowanie graficzne i identyfikacja wizualna dla freelancerow oraz marek w Polsce.</p>
        </div>
        <div>
          <p className="footer-title">Kontakt</p>
          <p>kontakt@twojastudio.pl</p>
          <p>+48 500 000 000</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} MZ Studio. Wszelkie prawa zastrzezone.</p>
      </div>
    </footer>
  );
}
