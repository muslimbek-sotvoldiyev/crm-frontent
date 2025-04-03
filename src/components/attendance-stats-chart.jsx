"use client"

import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"

export function AttendanceStatsChart({ present, absent }) {
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

    const total = present + absent
    const presentPercentage = Math.round((present / total) * 100)
    const absentPercentage = Math.round((absent / total) * 100)

    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Kelganlar", "Kelmaganlar"],
        datasets: [
          {
            data: [presentPercentage, absentPercentage],
            backgroundColor: ["rgb(16, 185, 129)", "rgb(239, 68, 68)"],
            borderWidth: 0,
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "70%",
        plugins: {
          legend: {
            position: "bottom",
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || ""
                const value = context.raw
                return `${label}: ${value}%`
              },
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
  }, [present, absent])

  return (
    <div className="h-full w-full">
      <canvas ref={chartRef}></canvas>
    </div>
  )
}

