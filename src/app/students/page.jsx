"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MoreHorizontal, Plus, Search } from "lucide-react"
import Link from "next/link"

// Sample data
const initialStudents = [
  {
    id: "STD001",
    name: "Alisher Zokirov",
    phone: "+998 90 123 45 67",
    group: "Intermediate B1",
    status: "active",
    joinDate: "12.03.2023",
    paymentStatus: "paid",
    attendance: 95,
  },
  {
    id: "STD002",
    name: "Malika Karimova",
    phone: "+998 91 234 56 78",
    group: "Elementary A2",
    status: "active",
    joinDate: "15.03.2023",
    paymentStatus: "paid",
    attendance: 90,
  },
  {
    id: "STD003",
    name: "Jasur Toshmatov",
    phone: "+998 93 345 67 89",
    group: "Advanced C1",
    status: "active",
    joinDate: "18.03.2023",
    paymentStatus: "paid",
    attendance: 85,
  },
  {
    id: "STD004",
    name: "Nilufar Rahimova",
    phone: "+998 94 456 78 90",
    group: "Intermediate B2",
    status: "active",
    joinDate: "20.03.2023",
    paymentStatus: "debt",
    attendance: 80,
  },
  {
    id: "STD005",
    name: "Bobur Alimov",
    phone: "+998 95 567 89 01",
    group: "Elementary A1",
    status: "active",
    joinDate: "22.03.2023",
    paymentStatus: "paid",
    attendance: 100,
  },
  {
    id: "STD006",
    name: "Zarina Umarova",
    phone: "+998 97 678 90 12",
    group: "Intermediate B1",
    status: "inactive",
    joinDate: "25.03.2023",
    paymentStatus: "debt",
    attendance: 65,
  },
  {
    id: "STD007",
    name: "Sardor Kamolov",
    phone: "+998 99 789 01 23",
    group: "Elementary A2",
    status: "active",
    joinDate: "28.03.2023",
    paymentStatus: "paid",
    attendance: 95,
  },
  {
    id: "STD008",
    name: "Dilnoza Saidova",
    phone: "+998 90 890 12 34",
    group: "Advanced C1",
    status: "active",
    joinDate: "01.04.2023",
    paymentStatus: "paid",
    attendance: 90,
  },
]

export default function StudentsPage() {
  const [students, setStudents] = useState(initialStudents)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newStudent, setNewStudent] = useState({
    name: "",
    phone: "",
    group: "",
  })

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.phone.includes(searchTerm) ||
      student.group.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddStudent = () => {
    const id = `STD${String(students.length + 1).padStart(3, "0")}`
    const today = new Date()
    const formattedDate = `${String(today.getDate()).padStart(2, "0")}.${String(today.getMonth() + 1).padStart(
      2,
      "0",
    )}.${today.getFullYear()}`

    setStudents([
      ...students,
      {
        id,
        name: newStudent.name,
        phone: newStudent.phone,
        group: newStudent.group,
        status: "active",
        joinDate: formattedDate,
        paymentStatus: "paid",
        attendance: 100,
      },
    ])

    setNewStudent({
      name: "",
      phone: "",
      group: "",
    })

    setIsAddDialogOpen(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">O'quvchilar</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Yangi o'quvchi
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Yangi o'quvchi qo'shish</DialogTitle>
              <DialogDescription>O'quvchi ma'lumotlarini kiriting</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Ism Familiya</Label>
                <Input
                  id="name"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  placeholder="Ism Familiya"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Telefon raqam</Label>
                <Input
                  id="phone"
                  value={newStudent.phone}
                  onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                  placeholder="+998 90 123 45 67"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="group">Guruh</Label>
                <Select onValueChange={(value) => setNewStudent({ ...newStudent, group: value })}>
                  <SelectTrigger id="group">
                    <SelectValue placeholder="Guruhni tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Elementary A1">Elementary A1</SelectItem>
                    <SelectItem value="Elementary A2">Elementary A2</SelectItem>
                    <SelectItem value="Intermediate B1">Intermediate B1</SelectItem>
                    <SelectItem value="Intermediate B2">Intermediate B2</SelectItem>
                    <SelectItem value="Advanced C1">Advanced C1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Bekor qilish
              </Button>
              <Button onClick={handleAddStudent}>Qo'shish</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>O'quvchilar ro'yxati</CardTitle>
          <CardDescription>Barcha o'quvchilar ro'yxati va ularning ma'lumotlari</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Qidirish..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Ism Familiya</TableHead>
                  <TableHead>Telefon</TableHead>
                  <TableHead>Guruh</TableHead>
                  <TableHead>To'lov</TableHead>
                  <TableHead>Davomat</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amallar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
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
                    <TableCell>{student.phone}</TableCell>
                    <TableCell>{student.group}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          student.paymentStatus === "paid"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-red-50 text-red-700 border-red-200"
                        }
                      >
                        {student.paymentStatus === "paid" ? "To'langan" : "Qarzdor"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          student.attendance >= 90
                            ? "bg-green-50 text-green-700 border-green-200"
                            : student.attendance >= 75
                              ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                              : "bg-red-50 text-red-700 border-red-200"
                        }
                      >
                        {student.attendance}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          student.status === "active"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-red-50 text-red-700 border-red-200"
                        }
                      >
                        {student.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Amallar</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/students/${student.id}`}>Batafsil ko'rish</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>Tahrirlash</DropdownMenuItem>
                          <DropdownMenuItem>Guruhni o'zgartirish</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">O'chirish</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

