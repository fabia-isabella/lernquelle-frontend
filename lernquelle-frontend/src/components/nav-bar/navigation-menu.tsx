'use client';
import { Box, Button, Divider, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import React from 'react';

export default function NavigationMenu() {
	const [open, setOpen] = React.useState(false);

	const toggleDrawer = (newOpen: boolean) => () => {
		setOpen(newOpen);
	};

	const DrawerList = (
		<Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
			<List>
				{['Ziele', 'Noten'].map((text, index) => (
					<ListItem key={text} disablePadding>
						<ListItemButton>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);

	return (
		<div>
			<Button onClick={toggleDrawer(true)} sx={{ position: 'relative', width: '40px', height: '30px', backgroundColor: 'transparent', border: 'none', marginTop: '0.5rem' }}>
				<Box
					sx={{
						position: 'absolute',
						left: '22.22%',
						right: '22.22%',
						top: '22.22%',
						bottom: '66.67%',
						background: '#343341',
						height: '4px',
						borderRadius: '2px',
					}}
				></Box>

				<Box
					sx={{
						position: 'absolute',
						left: '22.22%',
						right: '22.22%',
						top: '44.44%',
						bottom: '44.44%',
						background: '#343341',
						height: '4px',
						borderRadius: '2px',
					}}
				></Box>

				<Box
					sx={{
						position: 'absolute',
						left: '22.22%',
						right: '22.22%',
						top: '66.67%',
						bottom: '22.22%',
						background: '#343341',
						height: '4px',
						borderRadius: '2px',
					}}
				></Box>
			</Button>

			<Drawer open={open} onClose={toggleDrawer(false)}>
				{DrawerList}
			</Drawer>
		</div>
	);
}
