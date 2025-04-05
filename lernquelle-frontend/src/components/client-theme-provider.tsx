'use client';

import { Silkscreen } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme';
import { Nunito } from 'next/font/google';


const silkscreen = Silkscreen({
	weight: ['400'],
	subsets: ['latin'],
	display: 'swap',
});

const nunito = Nunito({
	weight: ['400'],
	subsets: ['latin'],
	display: 'swap',
});


export default function ClientThemeProvider({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider theme={theme}>
			<div className={silkscreen.className}>
				<div className={nunito.className}>
					{children}
				</div>
			</div>
		</ThemeProvider>
	);
}
