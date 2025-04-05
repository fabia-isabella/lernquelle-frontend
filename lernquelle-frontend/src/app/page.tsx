import styles from "./page.module.css";
import Dashboard from "@/components/dashboard/dashboard";
import NavigationMenu from "@/components/nav-bar/navigation-menu";

export default function Home() {
  return (
      <><NavigationMenu></NavigationMenu>
        <div className="page-container"><Dashboard></Dashboard></div>
      </>
  );
}
