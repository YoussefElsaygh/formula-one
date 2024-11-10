import { Bar } from "react-chartjs-2"; // Import the Bar chart component from react-chartjs-2
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DriverPerformanceChart = ({
  data,
}: {
  data: {
    driver: string;
    time: number | undefined; // Time in milliseconds
    timeDifference: number | undefined; // time difference in seconds
  }[];
}) => {
  const finishedData = data.filter((item) => item.time !== undefined);
  const drivers = finishedData.map((item) => item.driver);
  const timeInSeconds = finishedData.map((item) => item.time! / 1000);
  const timeDifferencesInSeconds = finishedData.map(
    (item) => item.timeDifference
  );

  function convertSecondsToTimeString(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const milliseconds = Math.round((seconds % 1) * 1000);
    // Format time as HH:MM:SS:MMM
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}:${milliseconds.toString().padStart(3, "0")}`;

    return formattedTime;
  }

  const chartData = {
    labels: drivers,
    datasets: [
      {
        label: "Race Time (seconds)",
        data: timeInSeconds,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Drivers Race Time (s)",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return `Time: ${convertSecondsToTimeString(tooltipItem.raw)}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Drivers",
        },
      },
      y: {
        title: {
          display: true,
          text: "Time (seconds)",
        },
        beginAtZero: false,
        min: Math.min(...timeInSeconds) - 10,
      },
    },
  };

  const timeDifferenceChartData = {
    labels: drivers,
    datasets: [
      {
        label: "Time difference behind the first (seconds)",
        data: timeDifferencesInSeconds,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
  const timeDifferenceOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Finish Time difference (s)",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return `${tooltipItem.raw} seconds`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Drivers",
        },
      },
      y: {
        title: {
          display: true,
          text: "Time (seconds)",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <Bar data={chartData} options={options} />
      <br />
      <br />
      <Bar data={timeDifferenceChartData} options={timeDifferenceOptions} />
    </>
  );
};

export default DriverPerformanceChart;
