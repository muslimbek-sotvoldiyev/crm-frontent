"use client"

import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"
import { studentMovementData } from "./monthly-attendance-chart"


export function StudentMovementChart({ selectedGroup }) {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    const data = studentMovementData[selectedGroup] || studentMovementData["GRP001"]

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun"],
        datasets: [
          {
            label: "Qo'shilgan o'quvchilar",
            data: data.joined,
            backgroundColor: "rgba(16, 185, 129, 0.7)",
            borderColor: "rgb(16, 185, 129)",
            borderWidth: 1,
          },
          {
            label: "Chiqib ketgan o'quvchilar",
            data: data.left,
            backgroundColor: "rgba(239, 68, 68, 0.7)",
            borderColor: "rgb(239, 68, 68)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              precision: 0,
            },
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [selectedGroup])

  return (
    <div className="h-full w-full">
      <canvas ref={chartRef}></canvas>
    </div>
  )
}

