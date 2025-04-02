"use client"

import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"

export function OverviewChart() {
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

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun"],
        datasets: [
          {
            label: "O'quvchilar soni",
            data: [180, 195, 210, 222, 235, 245],
            backgroundColor: "#0ea5e9",
            borderRadius: 4,
            barThickness: 20,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              drawBorder: false,
            },
          },
          x: {
            grid: {
              display: false,
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
  }, [])

  return (
    <div className="h-[350px] w-full">
      <canvas ref={chartRef}></canvas>
    </div>
  )
}

