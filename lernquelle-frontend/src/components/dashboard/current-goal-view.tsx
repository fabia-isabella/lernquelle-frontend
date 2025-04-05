'use client';
import { useEffect, useState } from 'react';
import {
	Card,
	CardContent,
	Typography,
	Box,
} from '@mui/material';
import { useRouter } from 'next/navigation';

type Goal = {
	goal_id: string;
	description: string;
	due_date: string;
	creation_date: string;
	grading: string;
	goal_type: string;
};

export default function CurrentGoalView() {
	const [goals, setGoals] = useState<Goal[]>([]);
	const [hasMounted, setHasMounted] = useState(false);
	const router = useRouter();

	useEffect(() => {
		setHasMounted(true);
		const userId = 1; // TODO: replace with actual logged-in user ID

		const fetchGoals = async () => {
			try {
				const res = await fetch(`http://127.0.0.1:8000/goals/${userId}`);
				const data: Goal[] = await res.json();

				const now = new Date();

				const futureGoals = data
					.filter(goal => {
						const dueDateStr = goal.due_date.split(',')[0];
						const [day, month, year] = dueDateStr.split('/');

						const dueDate = new Date(`${year}-${month}-${day}`);

						return dueDate > now;
					})
					.sort((a, b) => {
						const dueDateA = new Date(`${a.due_date.split(',')[0].split('/')[2]}-${a.due_date.split(',')[0].split('/')[1]}-${a.due_date.split(',')[0].split('/')[0]}`);
						const dueDateB = new Date(`${b.due_date.split(',')[0].split('/')[2]}-${b.due_date.split(',')[0].split('/')[1]}-${b.due_date.split(',')[0].split('/')[0]}`);
						return dueDateA.getTime() - dueDateB.getTime();
					});

				setGoals(futureGoals);
			} catch (err) {
				console.error('Failed to fetch goals:', err);
			}
		};
		fetchGoals();
	}, []);

	if (!hasMounted) return null;

	const handleCardClick = () => {
		router.push(`/ziele`);
	};

	return (
		<Box
			sx={{
				width: {
					xs: '95%',
					sm: '95%',
					md: '80%',
					lg: '70%',
					xl: '60%',
				},
				mx: 'auto',
				mt: 4,
				boxSizing: 'border-box',
			}}
		>
			{goals.map((goal) => (
				<Card
					key={goal.goal_id}
					sx={{
						width: '100%',
						backgroundColor: '#EBEAF7',
						borderTop: '1px solid black',
						borderLeft: '1px solid black',
						borderBottom: '5px solid black',
						borderRight: '5px solid black',
						mb: 2,
						cursor: 'pointer', // Add pointer cursor to show it's clickable
					}}
					onClick={() => handleCardClick()} // Use the goal's ID to navigate to the detail page
				>
					<CardContent>
						<Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
							Individuelle Ziele
							<svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px' }}>
								<path d="M38.6666 12.8889H19.3333V38.6667H38.6666V12.8889ZM25.7777 19.3333H32.2221V25.7778H25.7777V19.3333Z" fill="white"/>
								<path d="M32.2223 19.3333H25.7778V25.7778H32.2223V19.3333Z" fill="#89CDFF"/>
								<path d="M19.3333 12.8889H38.6666V6.44444H32.2221V0H25.7777V6.44444H19.3333V12.8889Z" fill="#F92F3C"/>
								<path d="M19.3334 25.7778H12.8889V45.1111H19.3334V25.7778Z" fill="#F92F3C"/>
								<path d="M45.1112 25.7778H38.6667V45.1111H45.1112V25.7778Z" fill="#F92F3C"/>
								<path d="M32.2223 38.6667H25.7778V45.1111H32.2223V38.6667Z" fill="#FFE800"/>
								<path d="M32.2223 51.5556H25.7778V58H32.2223V51.5556Z" fill="#FFE800"/>
								<path d="M32.2223 45.1111H25.7778V51.5556H32.2223V45.1111Z" fill="#FFC800"/>
							</svg>
						</Typography>

						<Box sx={{ display: 'flex', alignItems: 'center' }}>
							<svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '16px' }}>
								<g filter="url(#filter0_d_55_1632)">
									<path d="M6 0V3H3V6H0V34H3V37H6V40H9V0H6Z" fill="#A259FF"/>
								</g>
								<path d="M6 3V0H9V3V6H6V9H3V31H6V34H9V37V40H6V37H3V34H0V6H3V3H6Z" fill="#1E3445"/>
								<g filter="url(#filter1_d_55_1632)">
									<rect width="22" height="40" transform="translate(9)" fill="#A259FF"/>
									<rect x="9" width="22" height="3" fill="#1E3445"/>
									<rect x="9" y="37" width="22" height="3" fill="#1E3445"/>
								</g>
								<g filter="url(#filter2_d_55_1632)">
									<path d="M34 40V37H37V34H40V6H37V3H34V0H31V40H34Z" fill="#A259FF"/>
								</g>
								<path d="M34 37V40H31V37V34H34V31H37V9H34V6H31V3V0H34V3H37V6H40V34H37V37H34Z" fill="#1E3445"/>
								<defs>
									<filter id="filter0_d_55_1632" x="0" y="0" width="12" height="43" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
										<feFlood flood-opacity="0" result="BackgroundImageFix"/>
										<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
										<feOffset dx="3" dy="3"/>
										<feComposite in2="hardAlpha" operator="out"/>
										<feColorMatrix type="matrix" values="0 0 0 0 0.117647 0 0 0 0 0.203922 0 0 0 0 0.270588 0 0 0 1 0"/>
										<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_55_1632"/>
										<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_55_1632" result="shape"/>
									</filter>
									<filter id="filter1_d_55_1632" x="9" y="0" width="25" height="43" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
										<feFlood flood-opacity="0" result="BackgroundImageFix"/>
										<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
										<feOffset dx="3" dy="3"/>
										<feComposite in2="hardAlpha" operator="out"/>
										<feColorMatrix type="matrix" values="0 0 0 0 0.117647 0 0 0 0 0.203922 0 0 0 0 0.270588 0 0 0 1 0"/>
										<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_55_1632"/>
										<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_55_1632" result="shape"/>
									</filter>
									<filter id="filter2_d_55_1632" x="31" y="0" width="12" height="43" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
										<feFlood flood-opacity="0" result="BackgroundImageFix"/>
										<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
										<feOffset dx="3" dy="3"/>
										<feComposite in2="hardAlpha" operator="out"/>
										<feColorMatrix type="matrix" values="0 0 0 0 0.117647 0 0 0 0 0.203922 0 0 0 0 0.270588 0 0 0 1 0"/>
										<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_55_1632"/>
										<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_55_1632" result="shape"/>
									</filter>
								</defs>
							</svg>

							<Typography variant="body1" sx={{ flexGrow: 1, padding: '0.5rem' }}>
								{goal.description}
							</Typography>
						</Box>
					</CardContent>
				</Card>
			))}

			{goals.length === 0 && (
				<Typography variant="body2" color="text.secondary">
					Keine zukünftigen Ziele gefunden.
				</Typography>
			)}
		</Box>
	);
}
