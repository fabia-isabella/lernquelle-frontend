'use client';
import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { Box, Card, CardContent, Typography } from '@mui/material';

type GradeData = {
	subject: string;
	grade: string;
	timestamp: string;
};

// Helper function to parse the custom timestamp format (e.g., "20/05/2026, 00:00:00")
const parseDate = (dateString: string): Date => {
	const [day, month, yearAndTime] = dateString.split('/');
	const [year, time] = yearAndTime.split(', ');
	const [hour, minute, second] = time.split(':');
	return new Date(+year, +month - 1, +day, +hour, +minute, +second);
};

export default function GradeChart() {
	const [grades, setGrades] = useState<GradeData[]>([]);
	const [hasMounted, setHasMounted] = useState(false);
	const [chartOptions, setChartOptions] = useState<any>(null);

	useEffect(() => {
		setHasMounted(true);

		const userId = 1; // TODO replace when authorization is in place
		const fetchGrades = async () => {
			try {
				const res = await fetch(`http://127.0.0.1:8000/grades/${userId}`);
				const data = await res.json();
				setGrades(data);
			} catch (err) {
				console.error('Failed to fetch grades:', err);
			}
		};

		fetchGrades();
	}, []);

	useEffect(() => {
		if (!grades.length) return;

		// Convert grades to numeric values and parse timestamp to Date objects
		const numericGrades = grades.map((d) => ({
			...d,
			grade: isNaN(parseFloat(d.grade)) ? 0 : parseFloat(d.grade),
			timestamp: parseDate(d.timestamp),
		}));

		// Filter out invalid data (e.g., if grade or timestamp is not valid)
		const validGrades = numericGrades.filter(
			(d) => !isNaN(d.grade) && !isNaN(d.timestamp.getTime())
		);

		// Group data by subject for separate lines
		const subjects = Array.from(new Set(validGrades.map((d) => d.subject)));

		// Prepare data for ngx-echarts
		const chartData = subjects.map((subject) => {
			const subjectData = validGrades.filter((d) => d.subject === subject);
			return {
				name: subject,
				type: 'line',
				data: subjectData.map((d) => [d.timestamp.getTime(), d.grade]), // [timestamp, grade] pair
			};
		});

		const options = {
			xAxis: {
				type: 'time', // Time scale on x-axis
				boundaryGap: false,
				axisLabel: {
					formatter: (value: any) => {
						const date = new Date(value);
						// Format as "Month/Year" with two-digit year
						const month = date.toLocaleString('default', { month: 'short' }); // "Jan", "Feb", etc.
						const year = date.getFullYear().toString().slice(-2); // Last two digits of the year
						return `${month}/${year}`;
					},
				},
			},
			yAxis: {
				type: 'value', // Value scale on y-axis
				min: 0,
				max: 6, // Assuming grade is between 0 and 100
			},
			series: chartData, // The line data for each subject
		};

		// Set the options for the chart
		setChartOptions(options);
	}, [grades]);

	if (!hasMounted || !chartOptions) return null;

	return (
		<Box
			sx={{
				width: { xs: '95%', sm: '95%', md: '80%', lg: '70%', xl: '60%' },
				mx: 'auto',
				mt: 4,
				boxSizing: 'border-box',
			}}
		>
			<Card sx={{ width: '100%' }}>
				<CardContent>
					<Typography variant="h6" gutterBottom>
						Notenspiegel
					</Typography>

					<Box sx={{ display: 'flex', justifyContent: 'center' }}>
						{/* Use ReactECharts to render the chart */}
						<ReactECharts
							option={chartOptions}
							style={{ width: '100%', height: '400px' }}
						/>
					</Box>
				</CardContent>
			</Card>
		</Box>
	);
}
