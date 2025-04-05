'use client';
import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { Box, Card, CardContent, Typography } from '@mui/material';

type GradeData = {
	subject: string;
	grade: string;
	timestamp: string;
};

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
				const res = await fetch(`http://127.0.0.1:8000/subject/grades/${userId}`);
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

		const numericGrades = grades.map((d) => ({
			...d,
			grade: isNaN(parseFloat(d.grade)) ? 0 : parseFloat(d.grade),
			timestamp: parseDate(d.timestamp),
		}));

		const validGrades = numericGrades.filter(
			(d) => !isNaN(d.grade) && !isNaN(d.timestamp.getTime())
		);

		const subjects = Array.from(new Set(validGrades.map((d) => d.subject)));

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
				type: 'time',
				boundaryGap: false,
				axisLabel: {
					formatter: (value: any) => {
						const date = new Date(value);
						const month = date.toLocaleString('default', { month: 'short' }); // "Jan", "Feb", etc.
						const year = date.getFullYear().toString().slice(-2); // Last two digits of the year
						return `${month}/${year}`;
					},
				},
			},
			yAxis: {
				type: 'value',
				min: 0,
				max: 6,
			},
			series: chartData,
		};

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
			<Card sx={{ width: '100%', borderTop: '1px solid black',
				borderLeft: '1px solid black',
				borderBottom: '5px solid black',
				borderRight: '5px solid black' }}>
				<CardContent>
					<Typography variant="h6" gutterBottom>
						Notenspiegel
					</Typography>

					<Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
