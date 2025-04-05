import CurrentGoalView from "@/components/dashboard/current-goal-view";
import GradeChart from "@/components/dashboard/grade-diagram";
import App from "@/components/Date/tabDate";

export default function Dashboard() {
	return (
		<>
			<CurrentGoalView></CurrentGoalView>
			<App></App>
			<GradeChart></GradeChart></>
	);
}
