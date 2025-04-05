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
									Fälligkeitsdatum: {goal.due_date}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									Typ: {goal.goal_type}
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
