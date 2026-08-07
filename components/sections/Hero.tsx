'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useHeroOrb } from '@/hooks/useHeroOrb';
import { useHeroParallax } from '@/hooks/useHeroParallax';
import { useHeroScatter } from '@/hooks/useHeroScatter';

const folders = [
	{ label: 'Ai', className: 'is-ai', scatter: '1.35', parallax: '0.75' },
	{ label: 'Web design', className: 'is-web', scatter: '1.3', parallax: '0.95' },
	{ label: 'Social media', className: 'is-social', scatter: '1.4', parallax: '0.65' },
];

const shots = [
	{
		src: '/hero-2.jpg',
		className: 'is-desk',
		sizes: '220px',
		scatter: '0.9',
		parallax: '0.45',
	},
	{
		src: '/hero-1.jpg',
		className: 'is-walk',
		sizes: '280px',
		scatter: '1',
		parallax: '0.7',
		priority: true,
	},
	{
		src: '/hero-3.jpg',
		className: 'is-tablet',
		sizes: '240px',
		scatter: '0.95',
		parallax: '0.9',
	},
	{
		src: '/hero-4.jpg',
		className: 'is-phone',
		sizes: '140px',
		scatter: '1.15',
		parallax: '1.15',
	},
	{
		src: '/avatar.png',
		className: 'is-avatar',
		sizes: '150px',
		scatter: '1.25',
		parallax: '1.35',
	},
];

export function Hero() {
	const heroRef = useRef<HTMLElement>(null);
	const collageRef = useRef<HTMLDivElement>(null);
	const orbRef = useHeroOrb(heroRef);
	useHeroScatter(collageRef);
	useHeroParallax(collageRef);

	return (
		<section className="hero" ref={heroRef}>
			<div ref={orbRef} className="hero-orb" aria-hidden="true" />

			<div className="hero-topbar-shell" aria-hidden="true" />

			<div className="hero-layout">
				<div className="hero-copy">
					<p className="hero-chip">
						Multidisciplinary Designer
						<Image
							src="/arrow.png"
							alt=""
							width={14}
							height={14}
							aria-hidden="true"
						/>
					</p>
					<h1>
						Dbam o to,
						<strong> jak Twoja marka wygląda i komunikuje się</strong> <br />z
						odbiorcami — online i offline.
					</h1>
				</div>

				<div className="hero-collage" ref={collageRef} aria-hidden="true">
					{folders.map((folder) => (
						<div
							key={folder.label}
							className={`hero-folder ${folder.className}`}
						>
							<div className="hero-parallax" data-parallax={folder.parallax}>
								<div className="hero-scatter" data-scatter={folder.scatter}>
									<Image src="/folder.png" alt="" width={116} height={97} />
									<span>{folder.label}</span>
								</div>
							</div>
						</div>
					))}

					{shots.map((shot) => (
						<div key={shot.className} className={`hero-shot ${shot.className}`}>
							<div className="hero-parallax" data-parallax={shot.parallax}>
								<div className="hero-scatter" data-scatter={shot.scatter}>
									<Image
										src={shot.src}
										alt=""
										fill
										sizes={shot.sizes}
										priority={shot.priority}
									/>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
