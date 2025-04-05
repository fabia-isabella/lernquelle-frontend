'use client';
import { useEffect, useState } from 'react';
// @ts-ignore
import {
	Box,
	Card,
	CardContent,
	Typography,
} from '@mui/material';

type Goal = {
	goal_id: string;
	description: string;
	due_date: string;
	creation_date: string;
	grading: string;
	goal_type: string;
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
					<Box
						key={index}
						sx={{
							mb: 2,
							p: 2,
							backgroundColor: '#f9f9f9',
							border: '1px solid #ccc',
							borderRadius: '8px',
						}}
					>
						<Typography variant="body1" gutterBottom>
							{goal.description}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Fälligkeitsdatum: {goal.due_date}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Typ: {goal.goal_type}
						</Typography>
					</Box>
				))
			) : (
				<Typography variant="body2" color="text.secondary">
					Keine Ziele gefunden.
				</Typography>
			)}
		</Box>
	);
}
