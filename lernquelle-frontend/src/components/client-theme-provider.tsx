'use client';

import { Silkscreen } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme';

const silkscreen = Silkscreen({
	weight: ['400'],
	subsets: ['latin'],
	display: 'swap',
});

export default function ClientThemeProvider({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider theme={theme}>
			<div className={silkscreen.className}>{children}</div>
		</ThemeProvider>
	);
}
