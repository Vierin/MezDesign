import Image from 'next/image';

const leftCards = [
	{
		name: 'Olivia Hart',
		role: 'Manager marki',
		avatar:
			'https://cdn.prod.website-files.com/688d31d885372b14ca5e3d8b/6892110cf1e57709cfa174b8_Profile%201.avif',
		quote:
			'Ich strategiczne podejscie i jakosc projektow wizualnych szybko podniosly rozpoznawalnosc naszej marki.',
	},
	{
		name: 'Ethan Cole',
		role: 'Strateg marki',
		avatar:
			'https://cdn.prod.website-files.com/688d31d885372b14ca5e3d8b/6892110cf1e57709cfa174b8_Profile%201.avif',
		quote:
			'Od koncepcji do wdrozenia wszystko bylo konkretne, szybkie i bardzo dobrze zaplanowane.',
	},
	{
		name: 'Sofia Lane',
		role: 'Wlascicielka studia',
		avatar:
			'https://cdn.prod.website-files.com/688d31d885372b14ca5e3d8b/6892110ca98321d20a239824_Profile%202.avif',
		quote:
			'Wyrazna strategia i system projektowy ulatwily prace naszemu zespolowi i poprawily spojna komunikacje.',
	},
];

const rightCards = [
	{
		name: 'Max Turner',
		role: 'Kierownik komunikacji',
		avatar:
			'https://cdn.prod.website-files.com/688d31d885372b14ca5e3d8b/6892110ca98321d20a239824_Profile%202.avif',
		quote:
			'Wspolpraca przebiegla plynnie, a nowa oprawa wizualna dala nam wieksza wiarygodnosc i lepsze wyniki.',
	},
	{
		name: 'Leo Bennett',
		role: 'Dyrektor kreatywny',
		avatar:
			'https://cdn.prod.website-files.com/688d31d885372b14ca5e3d8b/6892110c97d3296f9216d7a8_Profile%203.avif',
		quote:
			'Dostalismy system wizualny, ktory jest latwy do wdrozenia i dziala swietnie zarowno online, jak i offline.',
	},
	{
		name: 'Noah Reed',
		role: 'Dyrektor ds. marki',
		avatar:
			'https://cdn.prod.website-files.com/688d31d885372b14ca5e3d8b/6892110cf1e57709cfa174b8_Profile%201.avif',
		quote:
			'Tempo pracy, klarowna komunikacja i jakosc wykonania daly nam efekt, ktorego oczekiwalismy.',
	},
];

export function Testimonials() {
	const renderCard = (
		card: { name: string; role: string; avatar: string; quote: string },
		key: string,
	) => (
		<article className="testimonial-card" key={key}>
			<div className="testimonial-meta">
				<Image src={card.avatar} alt={card.name} width={44} height={44} />
				<div>
					<p className="testimonial-name">{card.name}</p>
					<p className="testimonial-role">{card.role}</p>
				</div>
			</div>
			<p className="testimonial-quote">&quot;{card.quote}&quot;</p>
		</article>
	);

	return (
		<section id="opinie" className="section testimonials-section">
			<div className="container">
				<p className="eyebrow">Opinie klientow</p>
				<h2>
					Zaufanie marek z różnych
					<br />
					<span>branż i zespołów</span>
				</h2>

				<div className="testimonials-layout">
					<div className="testimonials-column testimonials-column--left">
						<div className="testimonials-track">
							{leftCards.map((card, index) =>
								renderCard(card, `left-a-${index}`),
							)}
							{leftCards.map((card, index) =>
								renderCard(card, `left-b-${index}`),
							)}
						</div>
					</div>

					<article className="testimonial-featured">
						<Image
							src="https://cdn.prod.website-files.com/688d31d885372b14ca5e3d8b/689213eeb0073b2a0a61c9ee_Ceo%20Image.avif"
							alt="CEO portret"
							width={280}
							height={320}
							className="testimonial-featured-image"
						/>
						<p className="testimonial-featured-quote">
							&quot;Ich kreatywne podejscie i strategia wyniosly nasza marke na
							nowy poziom. Efekt koncowy byl dokladnie tym, czego
							potrzebowalismy.&quot;
						</p>
						<div className="testimonial-featured-stats">
							<div>
								<p className="stat-value">98%</p>
								<p className="stat-label">Zadowolonych klientow</p>
							</div>
							<div>
								<p className="stat-value">08+</p>
								<p className="stat-label">Lat doswiadczenia</p>
							</div>
						</div>
					</article>

					<div className="testimonials-column testimonials-column--right">
						<div className="testimonials-track">
							{rightCards.map((card, index) =>
								renderCard(card, `right-a-${index}`),
							)}
							{rightCards.map((card, index) =>
								renderCard(card, `right-b-${index}`),
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
