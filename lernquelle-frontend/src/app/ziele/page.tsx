'use client';
import { useEffect, useState } from 'react';
import {
	Box,
	Card,
	CardContent,
	Typography,
} from '@mui/material';

type Goal = {
	description: string;
	dueDate: string;
	startDate: string;
	evaluation: string;
};

export default function Page() {
	const [goals, setGoals] = useState<Goal[]>([]);

	useEffect(() => {
		const userId = 1; // TODO: replace with dynamic user ID from auth
		const fetchGoals = async () => {
			try {
				const res = await fetch(`http://127.0.0.1:8000/goals/${userId}`);
				const data: Goal[] = await res.json();
				setGoals(data);
			} catch (err) {
				console.error('Failed to fetch goals:', err);
			}
		};

		fetchGoals();
	}, []);

	return (
		<Box
			sx={{
				width: {
					xs: '90%',
					sm: '80%',
					md: '70%',
					lg: '60%',
					xl: '50%',
				},
				mx: 'auto',
				mt: 4,
				px: 2,
			}}
		>
			<Typography
				variant="h4"
				gutterBottom
				sx={{ fontFamily: 'Silkscreen, sans-serif', mb: 4 }}
			>
				Individuelle Ziele
			</Typography>

			{goals.length > 0 ? (
				goals.map((goal, index) => (
					<Card
						key={index}
						variant="outlined"
						sx={{
							mb: 2,
							p: 2,
							backgroundColor: '#f9f9f9',
							fontFamily: 'Silkscreen, sans-serif',
							border: '2px solid black',
							borderRadius: 0,
						}}
					>
						<CardContent sx={{ p: 0 }}>
							<Typography variant="body1">{goal.description}</Typography>
							<Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
								Fälligkeitsdatum: {new Date(goal.dueDate).toLocaleDateString()}
							</Typography>
						</CardContent>
					</Card>
				))
			) : (
				<Typography variant="body2" color="text.secondary">
					Keine individuelle Ziele gefunden.
				</Typography>
			)}
		</Box>
	);
}
