"use client"

import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"

// Sample data for monthly attendance
const monthlyAttendanceData = {
  GRP001: {
    labels: ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun"],
    present: [180, 195, 210, 222, 235, 245],
    absent: [20, 15, 18, 12, 15, 10],
  },
  GRP002: {
    labels: ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun"],
    present: [150, 160, 165, 170, 175, 180],
    absent: [15, 20, 15, 10, 15, 10],
  },
  GRP003: {
    labels: ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun"],
    present: [120, 125, 130, 135, 140, 145],
    absent: [10, 15, 10, 15, 10, 5],
  },
}

// Sample data for student movement
export const studentMovementData = {
  GRP001: {
    joined: [5, 3, 6, 4, 5, 3],
    left: [2, 1, 2, 1, 0, 1],
  },
  GRP002: {
    joined: [4, 2, 3, 5, 2, 3],
    left: [1, 2, 1, 0, 1, 0],
  },
  GRP003: {
    joined: [3, 2, 1, 3, 2, 1],
    left: [1, 0, 1, 1, 0, 1],
  },
}

// Sample data for monthly payments
export const monthlyPaymentData = {
  GRP001: {
    paid: [5400000, 5850000, 6300000, 6750000, 7200000, 7650000],
    unpaid: [450000, 0, 450000, 0, 450000, 0],
  },
  GRP002: {
    paid: [4500000, 4950000, 5400000, 5850000, 6300000, 6750000],
    unpaid: [450000, 450000, 0, 450000, 0, 450000],
  },
  GRP003: {
    paid: [3600000, 3600000, 4050000, 4500000, 4950000, 5400000],
    unpaid: [450000, 450000, 0, 0, 450000, 0],
  },
}


export function MonthlyAttendanceChart({ selectedGroup }) {
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

    const data = monthlyAttendanceData[selectedGroup] || monthlyAttendanceData["GRP001"]
    const totalStudents = data.present.map((val, idx) => val + data.absent[idx])
    const percentages = data.present.map((val, idx) => Math.round((val / totalStudents[idx]) * 100))

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.labels,
        datasets: [
          {
            label: "Davomat foizi",
            data: percentages,
            backgroundColor: "rgba(14, 165, 233, 0.2)",
            borderColor: "rgb(14, 165, 233)",
            borderWidth: 2,
            tension: 0.3,
            fill: true,
            pointBackgroundColor: "rgb(14, 165, 233)",
            pointRadius: 4,
          },
          {
            label: "Kelganlar",
            data: data.present,
            backgroundColor: "rgba(16, 185, 129, 0.2)",
            borderColor: "rgb(16, 185, 129)",
            borderWidth: 2,
            tension: 0.3,
            hidden: true,
          },
          {
            label: "Kelmaganlar",
            data: data.absent,
            backgroundColor: "rgba(239, 68, 68, 0.2)",
            borderColor: "rgb(239, 68, 68)",
            borderWidth: 2,
            tension: 0.3,
            hidden: true,
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
              callback: function (value) {
                if (this.chart.legend.legendItems[0].hidden) {
                  return value
                } else {
                  return value + "%"
                }
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
  }, [selectedGroup])

  return (
    <div className="h-full w-full">
      <canvas ref={chartRef}></canvas>
    </div>
  )
}
