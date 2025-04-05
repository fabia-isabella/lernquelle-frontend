'use client';
import { useEffect, useState } from 'react';
import {
	Button,
	Card,
	CardActions,
	CardContent,
	Typography,
	Box,
} from '@mui/material';
import { useRouter } from 'next/navigation';

type Goal = {
	description: string;
	dueDate: string;
	creationDate: string;
	grading: string;
	type: string;
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
					.filter(goal => new Date(goal.dueDate) > now)
					.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

				setGoals(futureGoals);
			} catch (err) {
				console.error('Failed to fetch goals:', err);
			}
		};

		fetchGoals();
	}, []);

	if (!hasMounted) return null;

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
			<Card sx={{ width: '100%' }}>
				<CardContent>
					<Typography variant="h6" gutterBottom>
						Bevorstehende Ziele
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
									Fälligkeitsdatum: {new Date(goal.dueDate).toLocaleDateString()}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									Typ: {goal.type}
								</Typography>
							</Box>
						))
					) : (
						<Typography variant="body2" color="text.secondary">
							Keine zukünftigen Ziele gefunden.
						</Typography>
					)}
				</CardContent>

				<CardActions>
					<Button onClick={() => router.push('/ziele')} variant="outlined">
						Alle Ziele ansehen
					</Button>
				</CardActions>
			</Card>
		</Box>
	);
}
