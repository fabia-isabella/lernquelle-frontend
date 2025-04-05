'use client';

import { IconButton, Box, Typography } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
import React from 'react';

export default function NavigationMenu() {
	const router = useRouter();
	const pathname = usePathname();

	const handleClick = () => {
		router.push('/');
	};

	const isHome = pathname === '/';

	return (
		<Box
			onClick={handleClick}
			sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', margin: '0.5rem' }}
			aria-label="Zur Übersicht"
		>
			<IconButton sx={{ padding: 0 }}>
				<svg
					width="36"
					height="36"
					viewBox="0 0 36 36"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M16 4H20V8H16V4Z" fill="#F92F3C" />
					<path d="M12 8H16V12H12V8Z" fill="#F92F3C" />
					<path d="M20 8H24V12H20V8Z" fill="#F92F3C" />
					<path d="M8 12H12V16H8V12Z" fill="#F92F3C" />
					<path d="M24 12H28V16H24V12Z" fill="#F92F3C" />
					<path d="M4 16H8V20H4V16Z" fill="#F92F3C" />
					<path d="M28 16H32V20H28V16Z" fill="#F92F3C" />
					<path d="M16 8H20V12H24V16H28V32H24V20H12V32H8V16H12V12H16V8Z" fill="#FFFBD4" />
					<path d="M12 20H24V32H12V20Z" fill="#D38100" />
				</svg>
			</IconButton>
			{!isHome && (
				<Typography sx={{ marginLeft: '0.5rem', fontFamily: 'Silkscreen' }}>
					Zur Übersicht
				</Typography>
			)}
		</Box>
	);
}
