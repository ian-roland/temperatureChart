import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";
import "./App.css";
import sourceData from "./data/sourceData.json"

function App() {
  return (
    <>
      <div id="temperatureChart">
        <Bar
          data={{
            labels: sourceData.map((data) => data.label),
            datasets: [
              {
                label: "Count",
                data: sourceData.map((data)=> data.value),
              },
            ],
          }}
        />
      </div>
    </>
  );
}

export default App;
