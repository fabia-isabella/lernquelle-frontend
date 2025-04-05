import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	typography: {
		fontFamily: "Silkscreen, sans-serif",
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					backgroundColor: "#d91522",
					color: "white",
					fontSize: "16px",
					textTransform: "uppercase",
					border: "4px solid black",
					padding: "12px 24px",
					position: "relative",
					imageRendering: "pixelated",
					"&:hover": {
						backgroundColor: "#b3121c",
						transform: "translate(2px, 2px)",
					},
				},
			},
		},
		MuiCardContent: {
			styleOverrides: {
				root: {
					padding: "0",
					margin: "16px"
				}
			}

		}
	},
});

export default theme;
