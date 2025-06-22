"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

export function FinanceChart({ data = [] }) {
  // Default data agar data prop bo'sh yoki undefined bo'lsa
  const defaultData = [
    {
      month: "2024-01",
      income: 22800000,
      teacherSalaries: 7950000,
      expenses: 10200000,
      profit: 4650000,
    },
    {
      month: "2024-02",
      income: 23200000,
      teacherSalaries: 8100000,
      expenses: 10500000,
      profit: 4600000,
    },
    {
      month: "2024-03",
      income: 24500000,
      teacherSalaries: 8525000,
      expenses: 10800000,
      profit: 5175000,
    },
    {
      month: "2024-04",
      income: 25200000,
      teacherSalaries: 8800000,
      expenses: 11200000,
      profit: 5200000,
    },
    {
      month: "2024-05",
      income: 26100000,
      teacherSalaries: 9200000,
      expenses: 11500000,
      profit: 5400000,
    },
    {
      month: "2024-06",
      income: 27000000,
      teacherSalaries: 9500000,
      expenses: 12000000,
      profit: 5500000,
    },
  ]

  const chartData = (data.length > 0 ? data : defaultData).map((item) => ({
    month: item.month,
    Daromad: item.income / 1000000, // Million so'mda
    Xarajat: (item.teacherSalaries + item.expenses) / 1000000,
    Foyda: item.profit / 1000000,
  }))

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip
          formatter={(value) => [`${value.toFixed(1)} mln so'm`, ""]}
          labelFormatter={(label) => `Oy: ${label}`}
        />
        <Legend />
        <Bar dataKey="Daromad" fill="#10b981" />
        <Bar dataKey="Xarajat" fill="#ef4444" />
        <Bar dataKey="Foyda" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  )
}
