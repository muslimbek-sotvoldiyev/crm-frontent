"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MessageSquare } from "lucide-react"
import Link from "next/link"

const debtStudents = [
  {
    id: "STD006",
    name: "Zarina Umarova",
    group: "Intermediate B1",
    debtAmount: 450000,
    debtDays: 15,
    lastPayment: "15.02.2023",
  },
  {
    id: "STD012",
    name: "Rustam Kamolov",
    group: "Elementary A2",
    debtAmount: 350000,
    debtDays: 10,
    lastPayment: "20.02.2023",
  },
  {
    id: "STD018",
    name: "Dilshod Rahimov",
    group: "Advanced C1",
    debtAmount: 550000,
    debtDays: 20,
    lastPayment: "10.02.2023",
  },
  {
    id: "STD024",
    name: "Kamola Saidova",
    group: "Intermediate B2",
    debtAmount: 250000,
    debtDays: 5,
    lastPayment: "25.02.2023",
  },
  {
    id: "STD030",
    name: "Jahongir Alimov",
    group: "Elementary A1",
    debtAmount: 450000,
    debtDays: 12,
    lastPayment: "18.02.2023",
  },
  {
    id: "STD036",
    name: "Nodira Karimova",
    group: "Intermediate B1",
    debtAmount: 350000,
    debtDays: 8,
    lastPayment: "22.02.2023",
  },
  {
    id: "STD042",
    name: "Akbar Toshmatov",
    group: "Advanced C1",
    debtAmount: 550000,
    debtDays: 25,
    lastPayment: "05.02.2023",
  },
]

export function DebtStudents() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Ism Familiya</TableHead>
          <TableHead>Guruh</TableHead>
          <TableHead>Qarz miqdori</TableHead>
          <TableHead>Qarz muddati</TableHead>
          <TableHead>Oxirgi to'lov</TableHead>
          <TableHead className="text-right">Amallar</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {debtStudents.map((student) => (
          <TableRow key={student.id}>
            <TableCell className="font-medium">{student.id}</TableCell>
            <TableCell>
              <Link href={`/students/${student.id}`} className="flex items-center gap-2 hover:underline">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{student.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                {student.name}
              </Link>
            </TableCell>
            <TableCell>{student.group}</TableCell>
            <TableCell>{student.debtAmount.toLocaleString()} so'm</TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className={
                  student.debtDays > 15
                    ? "bg-red-50 text-red-700 border-red-200"
                    : student.debtDays > 7
                      ? "bg-orange-50 text-orange-700 border-orange-200"
                      : "bg-yellow-50 text-yellow-700 border-yellow-200"
                }
              >
                {student.debtDays} kun
              </Badge>
            </TableCell>
            <TableCell>{student.lastPayment}</TableCell>
            <TableCell className="text-right">
              <Button variant="outline" size="sm">
                <MessageSquare className="mr-2 h-4 w-4" />
                Xabar yuborish
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
