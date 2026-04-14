export function Footer() {
	return (
		<footer className="footer">
			<div className="container footer-grid">
				<div>
					<p className="brand">Mez Design</p>
					<p>
						Projektowanie graficzne i identyfikacja wizualna dla Polskich marek.
					</p>
				</div>
				<div>
					<p className="footer-title">Kontakt</p>
					<p>dmezeankina@gmail.com</p>
				</div>
			</div>
			<div className="container footer-bottom">
				<p>
					© {new Date().getFullYear()} Mez Design. Wszelkie prawa zastrzezone.
				</p>
			</div>
		</footer>
	);
}
