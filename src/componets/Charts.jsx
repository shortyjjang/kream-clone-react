import { useState } from "react"
import { Line } from "react-chartjs-2"


export default function SalesCharts({charts}) {
    console.log(charts)
    const [currentChart, setCurrentChart] = useState(charts[0])
  return (
    <div>11111
        {charts && <div className="flex gap-2">
            {charts.map((type => (<button key={type.span} onClick={() => setCurrentChart(type)}>
                {type.span}
            </button>)))}
        </div>}
        {currentChart && <Line options={{
            responsive: true,
            plugins: {
                legend: {
                    display:false
                },
                title: {
                    display: false,
                },
                labels: {
                    display: false,
                }
            }
        }} data={{
            labels :currentChart.data.map(chart => chart.time),
            datasets: [
              {
                label: 'sales',
                data: currentChart.data.map((chart) => chart.value),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
              },
            ],
          }} />}
    </div>
  )
}
