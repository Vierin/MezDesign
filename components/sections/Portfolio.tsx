'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
	{
		id: '01',
		name: 'Lukox. Project Amplify',
		description:
			'Spójny system wizualny i content social media, ktory pomogl marce szybciej budowac rozpoznawalnosc.',
		tags: ['Social Media Branding', 'Rebranding'],
		year: '2025',
		images: [
			'https://cdn.prod.website-files.com/68910e1fd50820e9f30b6e65/68910fb87566c53c935e665e_Project%20Image%201.avif',
			'https://cdn.prod.website-files.com/68910e1fd50820e9f30b6e65/68910fbdb15c4059ce72e431_Project%20Image%202.avif',
			'https://cdn.prod.website-files.com/68910e1fd50820e9f30b6e65/68910fc5f77b77beff3b7b22_Project%20Image%203.avif',
		],
	},
	{
		id: '02',
		name: 'Blux. Website Design',
		description:
			'Nowoczesny landing page dla marki uslugowej z naciskiem na konwersje i UX.',
		tags: ['Strategy', 'Web Design'],
		year: '2025',
		images: [
			'https://cdn.prod.website-files.com/68910e1fd50820e9f30b6e65/689110d6202a5c67aee5aa60_Project%20Image%204.avif',
			'https://cdn.prod.website-files.com/68910e1fd50820e9f30b6e65/689110ce13ff82405f756ff2_Project%20Image%205.avif',
			'https://cdn.prod.website-files.com/68910e1fd50820e9f30b6e65/689110d26cff5ad70809d28f_Project%20Image%206.avif',
		],
	},
	{
		id: '03',
		name: 'Konx. Branding & Design',
		description:
			'Kompletny branding i materialy kampanijne, ktore uporzadkowaly komunikacje marki online.',
		tags: ['Seo', 'Strategy'],
		year: '2025',
		images: [
			'https://cdn.prod.website-files.com/68910e1fd50820e9f30b6e65/689111393712ea83a0b4e137_Project%20Image%207.avif',
			'https://cdn.prod.website-files.com/68910e1fd50820e9f30b6e65/689111346ff21c86b89e9395_Project%20Image%208.avif',
			'https://cdn.prod.website-files.com/68910e1fd50820e9f30b6e65/68911150d95d74820e0ec955_Project%20Image%209.avif',
		],
	},
];

export function Portfolio() {
	const stackRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		const mm = gsap.matchMedia();
		const ctx = gsap.context(() => {
			mm.add('(min-width: 960px)', () => {
				const cards = gsap.utils.toArray<HTMLElement>(
					'.portfolio-item',
					stackRef.current,
				);
				const sharedEndTrigger = cards[cards.length - 1];

				cards.forEach((card, index) => {
					gsap.set(card, { zIndex: cards.length + index });
				});

				cards.slice(0, -1).forEach((card) => {
					ScrollTrigger.create({
						trigger: card,
						start: 'top top+=86',
						endTrigger: sharedEndTrigger,
						end: 'top top+=86',
						pin: true,
						pinSpacing: false,
						anticipatePin: 1,
						invalidateOnRefresh: true,
					});
				});
			});
		}, stackRef);

		return () => {
			ctx.revert();
			mm.revert();
		};
	}, []);

	return (
		<section id="portfolio" className="portfolio-section">
			<div className="container portfolio-heading">
				<div>
					<p className="eyebrow">Selected Projects</p>
					<h2>
						Portfolio of impactful and
						<br />
						successful campaigns
					</h2>
				</div>
				<p>
					Tworze projekty graficzne i strony, ktore wzmacniaja pozycje marki
					oraz przyspieszaja wzrost rozpoznawalnosci w social media.
				</p>
			</div>

			<div ref={stackRef}>
				{projects.map((project) => (
					<article className="portfolio-item" key={project.id}>
						<div className="container portfolio-item-grid">
							<p className="portfolio-index">{`${project.id}//`}</p>
							<div className="portfolio-copy">
								<h3>{project.name}</h3>
								<p>{project.description}</p>
								<a href="#kontakt">View Project</a>
							</div>
							<div>
								<div className="portfolio-meta">
									<div className="portfolio-tags">
										{project.tags.map((tag) => (
											<span key={`${project.id}-${tag}`}>{tag}</span>
										))}
									</div>
									<span>© {project.year}</span>
								</div>
								<div className="portfolio-images">
									{project.images.map((image, idx) => (
										<Image
											key={`${project.id}-${idx}`}
											src={image}
											alt={`${project.name} podglad ${idx + 1}`}
											width={250}
											height={178}
										/>
									))}
								</div>
							</div>
						</div>
					</article>
				))}
			</div>

			<a className="portfolio-cta" href="#kontakt">
				<span>→</span>
				View All Projects
			</a>
		</section>
	);
}
