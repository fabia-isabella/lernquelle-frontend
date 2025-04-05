'use client';
import { useEffect, useState } from 'react';
import * as d3 from 'd3';
import { Box, Card, CardContent, Typography } from '@mui/material';

type GradeData = {
	subject: string;
	grade: number;
};

export default function GradeChart() {
	const [grades, setGrades] = useState<GradeData[]>([]);
	const [hasMounted, setHasMounted] = useState(false);

	useEffect(() => {
		setHasMounted(true);

		const fetchGrades = async () => {
			try {
				const res = await fetch('http://127.0.0.1:8000/student-grades');
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

		const width = 500;
		const height = 300;

		const margin = { top: 20, right: 20, bottom: 30, left: 40 };
		const chartWidth = width - margin.left - margin.right;
		const chartHeight = height - margin.top - margin.bottom;

		const svg = d3.select('#grade-chart')
			.attr('width', width)
			.attr('height', height)
			.style('border', '1px solid black');

		const chart = svg.append('g')
			.attr('transform', `translate(${margin.left}, ${margin.top})`);

		const x = d3.scaleBand()
			.domain(grades.map(d => d.subject))
			.range([0, chartWidth])
			.padding(0.1);

		const y = d3.scaleLinear()
			.domain([0, d3.max(grades, d => d.grade) || 100])
			.nice()
			.range([chartHeight, 0]);

		chart.selectAll('.bar')
			.data(grades)
			.enter()
			.append('rect')
			.attr('class', 'bar')
			.attr('x', d => {
				const xValue = x(d.subject);
				return xValue !== undefined ? xValue : 0;
			})
			.attr('y', d => {
				const yValue = y(d.grade);
				return yValue !== undefined ? yValue : 0;
			})
			.attr('width', x.bandwidth())
			.attr('height', d => chartHeight - y(d.grade))
			.attr('fill', 'steelblue');

		chart.append('g')
			.attr('class', 'x-axis')
			.attr('transform', `translate(0, ${chartHeight})`)
			.call(d3.axisBottom(x));

		chart.append('g')
			.attr('class', 'y-axis')
			.call(d3.axisLeft(y));

	}, [grades]);

	if (!hasMounted) return null;

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
						<svg id="grade-chart"></svg>
					</Box>
				</CardContent>
			</Card>
		</Box>
	);
}
