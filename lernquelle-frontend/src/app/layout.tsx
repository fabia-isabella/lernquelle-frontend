import './globals.css';
import ClientThemeProvider from "@/components/client-theme-provider";
import NavigationMenu from "@/components/nav-bar/navigation-menu";

export const metadata = {
    title: 'Lernquelle',
    description: 'App für die Kommunikation zwischen Ausbildenden und Lernenden der Stiftung Quellenhof',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <NavigationMenu></NavigationMenu>
        <ClientThemeProvider>{children}</ClientThemeProvider>
        </body>
        </html>
    );
}
