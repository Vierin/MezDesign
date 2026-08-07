'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { Header } from '@/components/Header';
import { useHeroOrb } from '@/hooks/useHeroOrb';

const folders = [
	{ label: 'Ai', className: 'is-ai' },
	{ label: 'Web design', className: 'is-web' },
	{ label: 'Social media', className: 'is-social' },
];

export function Hero() {
	const heroRef = useRef<HTMLElement>(null);
	const orbRef = useHeroOrb(heroRef);

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

				<div className="hero-collage" aria-hidden="true">
					{folders.map((folder) => (
						<div
							key={folder.label}
							className={`hero-folder ${folder.className}`}
						>
							<Image src="/folder.png" alt="" width={116} height={97} />
							<span>{folder.label}</span>
						</div>
					))}

					<div className="hero-shot is-desk">
						<Image src="/hero-2.jpg" alt="" fill sizes="220px" />
					</div>

					<div className="hero-shot is-walk">
						<Image src="/hero-1.jpg" alt="" fill sizes="280px" priority />
					</div>

					<div className="hero-shot is-tablet">
						<Image src="/hero-3.jpg" alt="" fill sizes="240px" />
					</div>

					<div className="hero-shot is-phone">
						<Image src="/hero-4.jpg" alt="" fill sizes="140px" />
					</div>

					<div className="hero-shot is-avatar">
						<Image src="/avatar.png" alt="" fill sizes="150px" />
					</div>
				</div>
			</div>
		</section>
	);
}
