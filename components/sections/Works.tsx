import Image from 'next/image';

const works = {
	featured: {
		id: 'henzo',
		title: (
			<>
				End-to-End Product Design
				<br />
				for a Fitness Marketplace
			</>
		),
		tags: 'Instagram / Facebook',
		image: '/work-1.jpg',
		alt: 'Henzo — fitness marketplace',
	},
	pair: [
		{
			id: 'chicco',
			title: 'Projektowanie kampanii wspierających sprzedaż produktów Chicco.',
			tags: 'Social media / Meta Ads / Google Ads',
			image: '/work-2.jpg',
			alt: 'Chicco — kampania sprzedażowa',
		},
		{
			id: 'oknoplus',
			title: 'Projektowanie komunikacji wizualnej dla marki OknoPlus.',
			tags: 'Instagram / Facebook',
			image: '/work-3.jpg',
			alt: 'OknoPlus — komunikacja wizualna',
		},
	],
	wide: {
		id: 'campaign',
		title: 'Projektowanie kampanii wspierających sprzedaż produktów Chicco.',
		tags: 'Social media / Meta Ads / Google Ads',
	},
};

export function Works() {
	return (
		<section id="portfolio" className="works-section">
			<div className="container">
				<article className="works-featured">
					<div className="works-media">
						<Image
							src={works.featured.image}
							alt={works.featured.alt}
							width={1668}
							height={1128}
							sizes="(max-width: 860px) 100vw, 65vw"
							priority
						/>
					</div>
					<div className="works-copy">
						<h3>{works.featured.title}</h3>
						<p>{works.featured.tags}</p>
					</div>
				</article>

				<div className="works-pair">
					{works.pair.map((item) => (
						<article className="works-card" key={item.id}>
							<div className="works-media">
								<Image
									src={item.image}
									alt={item.alt}
									width={1224}
									height={812}
									sizes="(max-width: 860px) 100vw, 45vw"
								/>
							</div>
							<div className="works-copy">
								<h3>{item.title}</h3>
								<p>{item.tags}</p>
							</div>
						</article>
					))}
				</div>

				<article className="works-wide">
					<div
						className="works-media works-media--placeholder"
						aria-hidden="true"
					/>
					<div className="works-copy">
						<h3>{works.wide.title}</h3>
						<p>{works.wide.tags}</p>
					</div>
				</article>
			</div>
		</section>
	);
}
