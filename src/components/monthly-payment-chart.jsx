"use client"

import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"
import { monthlyPaymentData } from "./monthly-attendance-chart"

export function MonthlyPaymentChart({ selectedGroup }) {
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

    const data = monthlyPaymentData[selectedGroup] || monthlyPaymentData["GRP001"]

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun"],
        datasets: [
          {
            label: "To'langan (so'm)",
            data: data.paid,
            backgroundColor: "rgba(16, 185, 129, 0.7)",
            borderColor: "rgb(16, 185, 129)",
            borderWidth: 1,
          },
          {
            label: "To'lanmagan (so'm)",
            data: data.unpaid,
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
            callbacks: {
              label: (context) => {
                let label = context.dataset.label || ""
                if (label) {
                  label += ": "
                }
                if (context.parsed.y !== null) {
                  label += new Intl.NumberFormat("uz-UZ").format(context.parsed.y) + " so'm"
                }
                return label
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) =>
                new Intl.NumberFormat("uz-UZ", {
                  notation: "compact",
                  compactDisplay: "short",
                }).format(value),
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
