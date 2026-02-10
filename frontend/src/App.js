import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import "./App.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function App() {
  const [data, setData] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [isRateLimited, setIsRateLimited] = React.useState(false);
  const [timer, setTimer] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [particles, setParticles] = React.useState([]);

  const API_URL = "https://api-rate-limiter-e00m.onrender.com/api/request";

  // Generate particles on load
  useEffect(() => {
    const temp = [];
    for (let i = 0; i < 50; i++) {
      temp.push({
        left: Math.random() * window.innerWidth,
        size: Math.random() * 6 + 4, // size 4px-10px
        delay: Math.random() * 10,
        duration: Math.random() * 20 + 10
      });
    }
    setParticles(temp);
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setMessage(response.data.message);
      const transformedData = Object.entries(response.data)
        .filter(([key]) => key !== "message")
        .map(([key, value]) => ({
          label: key,
          value: typeof value === "number" ? value : 0
        }));
      setData(transformedData);
    } catch (error) {
      if (error.response && error.response.status === 429) {
        setIsRateLimited(true);
        setTimer(10);
      } else {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isRateLimited && timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setIsRateLimited(false);
    }
  }, [isRateLimited, timer]);

  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        label: "API Data",
        data: data.map((item) => item.value),
        backgroundColor: data.map(
          () => `rgba(${Math.floor(Math.random() * 200 + 55)}, 192, 192, 0.7)`
        ),
        borderColor: "rgba(255, 255, 255, 0.8)",
        borderWidth: 2,
        borderRadius: 6,
        barThickness: 30
      }
    ]
  };

  const options = {
    responsive: true,
    animation: { duration: 800, easing: "easeOutQuart" },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#2575fc",
        titleColor: "#fff",
        bodyColor: "#fff",
        callbacks: { label: (context) => `${context.dataset.label}: ${context.raw}` }
      },
      title: { display: true, text: "Rate-Limited API Data", color: "#fff", font: { size: 20 } }
    },
    scales: {
      x: { ticks: { color: "#fff" }, grid: { color: "rgba(255,255,255,0.1)" } },
      y: { beginAtZero: true, ticks: { color: "#fff" }, grid: { color: "rgba(255,255,255,0.1)" } }
    }
  };

  return (
    <div className="container">
      {particles.map((p, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`
          }}
        ></div>
      ))}

      <h1>Rate-Limited API Demo</h1>

      <button
        onClick={fetchData}
        disabled={isRateLimited || loading}
        className={isRateLimited ? "button disabled" : "button"}
      >
        {isRateLimited
          ? `Wait ${timer}s`
          : loading
          ? "Loading..."
          : "Fetch Data"}
      </button>

      {isRateLimited && (
        <p className="rate-limit-msg">Too many requests! Try again in {timer}s.</p>
      )}

      {message && <p className="api-msg">{message}</p>}

      {data.length > 0 && (
        <div className="chart-card">
          <Bar data={chartData} options={options} />
        </div>
      )}
    </div>
  );
}

export default App;
