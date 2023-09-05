import { Chart } from "react-google-charts";
import { countComplaints, complaintCounts } from "@/pages/complaintCounts"
export const data = [

    /*  ["SSO", complaintCounts.SOS],
      ["SEZ", complaintCounts.SEZ],
      ["MAB", complaintCounts.MAB],*/

    ["SSO", countComplaints.SOS],
    ["SEZ", countComplaints.SEZ],
    ["MAB", countComplaints.MAB],




];
export const options = {
    title: "Complaints from various departments",
};


const charts = () => {

    console.log("Count", countComplaints.SOS);

    return (
        <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={"100%"}
            height={"400px"}
        />
    )
}
export default charts