import Dashboard from "@/components/dashboard/dashboard";
import HomePageLernende from "@/components/profil/HomePageLernende";

export default function Home() {
  return (
      <>
        <div className="page-container">
            <HomePageLernende></HomePageLernende>
            <Dashboard></Dashboard>
        </div>
      </>
  );
}
