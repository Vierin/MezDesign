'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { Header } from '@/components/Header';
import { useHeroOrb } from '@/hooks/useHeroOrb';
import { useHeroScatter } from '@/hooks/useHeroScatter';

const folders = [
	{ label: 'Ai', className: 'is-ai', strength: '1.35' },
	{ label: 'Web design', className: 'is-web', strength: '1.3' },
	{ label: 'Social media', className: 'is-social', strength: '1.4' },
];

const shots = [
	{ src: '/hero-2.jpg', className: 'is-desk', sizes: '220px', strength: '0.9' },
	{ src: '/hero-1.jpg', className: 'is-walk', sizes: '280px', strength: '1', priority: true },
	{ src: '/hero-3.jpg', className: 'is-tablet', sizes: '240px', strength: '0.95' },
	{ src: '/hero-4.jpg', className: 'is-phone', sizes: '140px', strength: '1.15' },
	{ src: '/avatar.png', className: 'is-avatar', sizes: '150px', strength: '1.25' },
];

export function Hero() {
	const heroRef = useRef<HTMLElement>(null);
	const collageRef = useRef<HTMLDivElement>(null);
	const orbRef = useHeroOrb(heroRef);
	useHeroScatter(collageRef);

	return (
		<section className="hero" ref={heroRef}>
			<div ref={orbRef} className="hero-orb" aria-hidden="true" />

			<Header />

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
							<div className="hero-scatter" data-scatter={folder.strength}>
								<Image src="/folder.png" alt="" width={116} height={97} />
								<span>{folder.label}</span>
							</div>
						</div>
					))}

					{shots.map((shot) => (
						<div key={shot.className} className={`hero-shot ${shot.className}`}>
							<div className="hero-scatter" data-scatter={shot.strength}>
								<Image
									src={shot.src}
									alt=""
									fill
									sizes={shot.sizes}
									priority={shot.priority}
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
