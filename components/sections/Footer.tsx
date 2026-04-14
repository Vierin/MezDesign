"use client";

import { trackEvent } from "@/lib/analytics";

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
					<p>
						<a
							href="mailto:dmezeankina@gmail.com"
							onClick={() => trackEvent("contact_email_click", { location: "footer" })}
						>
							dmezeankina@gmail.com
						</a>
					</p>
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
