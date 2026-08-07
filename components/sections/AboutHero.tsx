import Image from 'next/image';

export function AboutHero() {
	return (
		<section className="about-hero">
			<div className="container">
				<div className="about-hero-copy">
					<h1>Cześć, jestem Daria!</h1>
					<p className="about-hero-lead">
						<span className="about-hero-chip">Multidyscyplinarna</span>{' '}
						projektantka <br /> z doświadczeniem w marketingu i AI.
					</p>
				</div>

				<div className="about-hero-media">
					<Image
						src="/about-1.jpg"
						alt="Daria — multidisciplinary designer"
						width={1668}
						height={900}
						priority
						sizes="(max-width: 860px) 100vw, min(1480px, 100vw)"
					/>
				</div>
			</div>
		</section>
	);
}
