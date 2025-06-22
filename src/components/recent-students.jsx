"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"

const students = [
  {
    id: "STD001",
    name: "Alisher Zokirov",
    group: "Intermediate B1",
    status: "active",
    joinDate: "12.03.2023",
  },
  {
    id: "STD002",
    name: "Malika Karimova",
    group: "Elementary A2",
    status: "active",
    joinDate: "15.03.2023",
  },
  {
    id: "STD003",
    name: "Jasur Toshmatov",
    group: "Advanced C1",
    status: "active",
    joinDate: "18.03.2023",
  },
  {
    id: "STD004",
    name: "Nilufar Rahimova",
    group: "Intermediate B2",
    status: "active",
    joinDate: "20.03.2023",
  },
  {
    id: "STD005",
    name: "Bobur Alimov",
    group: "Elementary A1",
    status: "active",
    joinDate: "22.03.2023",
  },
]

export function RecentStudents() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Ism Familiya</TableHead>
          <TableHead>Guruh</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Qo'shilgan sana</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student) => (
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
            <TableCell>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                {student.status}
              </Badge>
            </TableCell>
            <TableCell>{student.joinDate}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
