'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const AUTO_MS = 5000;

const testimonials = [
	{
		id: 'maciej',
		paragraphs: [
			'Pani Daria dała się poznać jako odpowiedzialna, zaangażowana i pełna werwy do pracy osoba. Świetnie i szybko dogadała się z zespołem, co w przypadku pracy w agencji jest kluczowe. Uczestniczyła w wielu projektach, wnosząc do nich wiele merytorycznie.',
			'Jest osobą odpowiedzialna, szybko i sprawnie wykonującą powierzone zadania. Do tego otwarta na ludzi, zawsze uśmiechnięta i zaangażowana w życie organizacji. Każda firma, która zdecyduje się aby Ją zatrudnić zyska silne wsparcie i mimo Jej młodego wieku, rzetelnego i ułożonego pracownika.',
			'Z pełnym przekonaniem rekomenduję Darię i trzymam kciuki!',
		],
		name: 'Maciej Bielaczyk',
		role: 'Chief Executive Officer at “About Ad sp. z o.o.”',
		avatar: '/photo-1.png',
	},
	{
		id: 'piotr',
		paragraphs: [
			'Praca z Darią to przede wszystkim poczucie, że projekt jest w dobrych rękach. Potrafi samodzielnie przełożyć brief na przemyślaną koncepcję, a przy tym zawsze szuka rozwiązań, które mają sens nie tylko wizualnie, ale również z perspektywy biznesu.',
			'Cenię w niej inicjatywę, odpowiedzialność i otwartość na feedback. Nie boi się zadawać pytań, proponować własnych pomysłów i wychodzić poza utarte schematy, dzięki czemu wnosi do projektów świeże, kreatywne spojrzenie.',
		],
		name: 'Piotr Felczak',
		role: 'Art Director at “CreativeHarder”',
		avatar: '/photo-2.png',
	},
	{
		id: 'ivan',
		paragraphs: [
			'Najbardziej doceniam u Darii jej zaangażowanie w cały proces. Nie ograniczała się do realizacji briefu, lecz starała się zrozumieć kontekst projektu i proponowała rozwiązania wynikające z analizy. Dzięki temu wiele elementów aplikacji udało się uprościć i lepiej dopasować do potrzeb użytkowników. Jesteśmy bardzo zadowoleni z końcowego efektu, zarówno pod względem użyteczności aplikacji, jak i jej estetyki.',
		],
		name: 'Ivan Vierin',
		role: 'Co-Founder & CEO at “Henzo”',
		avatar: '/photo-3.png',
	},
	{
		id: 'klaudia',
		paragraphs: [
			'Wsółpaca z Darią była dla mnie dużym wsparciem. Bardzo zależało mi na spójnym wizerunku marki. Przygotowywała nie tylko estetyczne materiały, ale też zwracała uwagę na detale i często proponowała własne pomysły. Doceniam jej zaangażowanie, wyczucie estetyki i to, że można było na niej polegać na każdym etapie współpracy.',
		],
		name: 'Klaudia Bielska-Kęsik',
		role: 'Sales Manager at “Adopt​ Parfums Poland”',
		avatar: '/photo-4.png',
	},
];

export function Testimonials({ align = 'left' }: { align?: 'left' | 'right' }) {
	const [active, setActive] = useState(0);
	const [paused, setPaused] = useState(false);

	useEffect(() => {
		if (paused) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const id = window.setInterval(() => {
			setActive((prev) => (prev + 1) % testimonials.length);
		}, AUTO_MS);

		return () => window.clearInterval(id);
	}, [paused, active]);

	return (
		<section
			id="opinie"
			className={`testimonials-section${align === 'right' ? ' is-right' : ''}`}
		>
			<div className="container">
				<div
					className="testimonials-slider"
					onMouseEnter={() => setPaused(true)}
					onMouseLeave={() => setPaused(false)}
					onFocusCapture={() => setPaused(true)}
					onBlurCapture={(event) => {
						if (
							!event.currentTarget.contains(event.relatedTarget as Node | null)
						) {
							setPaused(false);
						}
					}}
				>
					<div className="testimonials-dots" role="tablist" aria-label="Opinie">
						{testimonials.map((item, index) => (
							<button
								key={item.id}
								type="button"
								role="tab"
								aria-selected={index === active}
								aria-controls={`testimonial-${item.id}`}
								aria-label={`Opinia ${index + 1}`}
								className={`testimonials-dot${index === active ? ' is-active' : ''}`}
								onClick={() => setActive(index)}
							/>
						))}
					</div>

					<div className="testimonials-stage">
						{testimonials.map((item, index) => (
							<article
								key={item.id}
								id={`testimonial-${item.id}`}
								role="tabpanel"
								aria-hidden={index !== active}
								className={`testimonials-slide${index === active ? ' is-active' : ''}`}
							>
								<blockquote className="testimonials-quote">
									{item.paragraphs.map((paragraph) => (
										<p key={paragraph.slice(0, 32)}>{paragraph}</p>
									))}
								</blockquote>

								<footer className="testimonials-author">
									<Image
										src={item.avatar}
										alt={item.name}
										width={56}
										height={56}
										className="testimonials-avatar"
									/>
									<div>
										<p className="testimonials-name">{item.name}</p>
										<p className="testimonials-role">{item.role}</p>
									</div>
								</footer>
							</article>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
