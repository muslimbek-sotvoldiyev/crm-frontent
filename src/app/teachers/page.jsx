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
import { MoreHorizontal, Plus, Search, Users, DollarSign, Calculator } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data with calculated salaries
const subjectPercentages = {
  "Ingliz tili": 15,
  Matematika: 12,
  Fizika: 10,
  Kimyo: 10,
  Biologiya: 10,
  IELTS: 18,
  Tarix: 8,
  Geografiya: 8,
  Adabiyot: 8,
  "Rus tili": 12,
}

const coursePrices = {
  "Ingliz tili": 450000,
  Matematika: 400000,
  Fizika: 350000,
  Kimyo: 350000,
  Biologiya: 350000,
  IELTS: 600000,
  Tarix: 300000,
  Geografiya: 300000,
  Adabiyot: 300000,
  "Rus tili": 400000,
}

const initialTeachers = [
  {
    id: "TCH001",
    name: "Aziza Karimova",
    phone: "+998 90 111 22 33",
    email: "aziza@englishcenter.uz",
    groups: 2,
    students: 25,
    status: "active",
    joinDate: "01.01.2023",
    experience: "5 yil",
    education: "TATU, Ingliz tili",
    hoursPerWeek: 18,
    salaryType: "percentage",
    percentage: 15,
    subject: "Ingliz tili",
    expectedSalary: 1687500, // 25 * 450000 * 15% = 1,687,500
  },
  {
    id: "TCH002",
    name: "Bobur Aliyev",
    phone: "+998 91 222 33 44",
    email: "bobur@englishcenter.uz",
    groups: 2,
    students: 22,
    status: "active",
    joinDate: "15.01.2023",
    experience: "3 yil",
    education: "UzSWLU, Matematika",
    hoursPerWeek: 18,
    salaryType: "percentage",
    percentage: 12,
    subject: "Matematika",
    expectedSalary: 1056000, // 22 * 400000 * 12% = 1,056,000
  },
  {
    id: "TCH003",
    name: "Dilnoza Rahimova",
    phone: "+998 93 333 44 55",
    email: "dilnoza@englishcenter.uz",
    groups: 1,
    students: 8,
    status: "active",
    joinDate: "01.02.2023",
    experience: "2 yil",
    education: "TATU, Ingliz tili",
    hoursPerWeek: 9,
    salaryType: "percentage",
    percentage: 15,
    subject: "Ingliz tili",
    expectedSalary: 540000, // 8 * 450000 * 15% = 540,000
  },
  {
    id: "TCH004",
    name: "Eldor Toshmatov",
    phone: "+998 94 444 55 66",
    email: "eldor@englishcenter.uz",
    groups: 1,
    students: 9,
    status: "active",
    joinDate: "15.02.2023",
    experience: "4 yil",
    education: "UzSWLU, Fizika",
    hoursPerWeek: 9,
    salaryType: "fixed",
    percentage: 0,
    subject: "Fizika",
    expectedSalary: 900000, // Fixed salary
  },
  {
    id: "TCH005",
    name: "Feruza Kamalova",
    phone: "+998 95 555 66 77",
    email: "feruza@englishcenter.uz",
    groups: 1,
    students: 6,
    status: "active",
    joinDate: "01.03.2023",
    experience: "6 yil",
    education: "TATU, Kimyo",
    hoursPerWeek: 9,
    salaryType: "percentage",
    percentage: 10,
    subject: "Kimyo",
    expectedSalary: 210000, // 6 * 350000 * 10% = 210,000
  },
  {
    id: "TCH006",
    name: "Gulnora Saidova",
    phone: "+998 97 666 77 88",
    email: "gulnora@englishcenter.uz",
    groups: 1,
    students: 7,
    status: "active",
    joinDate: "15.03.2023",
    experience: "3 yil",
    education: "UzSWLU, IELTS",
    hoursPerWeek: 9,
    salaryType: "percentage",
    percentage: 18,
    subject: "IELTS",
    expectedSalary: 756000, // 7 * 600000 * 18% = 756,000
  },
]

export default function TeachersPage() {
  const [teachers, setTeachers] = useState(initialTeachers)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newTeacher, setNewTeacher] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "Ingliz tili",
    experience: "",
    education: "",
    salaryType: "percentage",
    salaryPerHour: "25000",
    percentage: "15",
    students: "0",
  })

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.phone.includes(searchTerm) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const calculateExpectedSalary = () => {
    if (newTeacher.salaryType === "percentage") {
      const students = Number.parseInt(newTeacher.students) || 0
      const coursePrice = coursePrices[newTeacher.subject] || 0
      const percentage = Number.parseInt(newTeacher.percentage) || 0
      return Math.round((students * coursePrice * percentage) / 100)
    } else {
      return Number.parseInt(newTeacher.salaryPerHour) || 0
    }
  }

  const handleSubjectChange = (subject) => {
    const defaultPercentage = subjectPercentages[subject] || 15
    setNewTeacher({
      ...newTeacher,
      subject,
      percentage: defaultPercentage.toString(),
    })
  }

  const handleAddTeacher = () => {
    const id = `TCH${String(teachers.length + 1).padStart(3, "0")}`
    const today = new Date()
    const formattedDate = `${String(today.getDate()).padStart(2, "0")}.${String(today.getMonth() + 1).padStart(
      2,
      "0",
    )}.${today.getFullYear()}`

    const expectedSalary = calculateExpectedSalary()

    setTeachers([
      ...teachers,
      {
        id,
        name: newTeacher.name,
        phone: newTeacher.phone,
        email: newTeacher.email,
        groups: 0,
        students: Number.parseInt(newTeacher.students) || 0,
        status: "active",
        joinDate: formattedDate,
        experience: newTeacher.experience,
        education: newTeacher.education,
        hoursPerWeek: 0,
        salaryType: newTeacher.salaryType,
        percentage: Number.parseInt(newTeacher.percentage) || 0,
        subject: newTeacher.subject,
        expectedSalary,
      },
    ])

    setNewTeacher({
      name: "",
      phone: "",
      email: "",
      subject: "Ingliz tili",
      experience: "",
      education: "",
      salaryType: "percentage",
      salaryPerHour: "25000",
      percentage: "15",
      students: "0",
    })

    setIsAddDialogOpen(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">O'qituvchilar</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Yangi o'qituvchi
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Yangi o'qituvchi qo'shish</DialogTitle>
              <DialogDescription>O'qituvchi ma'lumotlarini kiriting</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Ism Familiya</Label>
                <Input
                  id="name"
                  value={newTeacher.name}
                  onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                  placeholder="Ism Familiya"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Telefon raqam</Label>
                <Input
                  id="phone"
                  value={newTeacher.phone}
                  onChange={(e) => setNewTeacher({ ...newTeacher, phone: e.target.value })}
                  placeholder="+998 90 123 45 67"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newTeacher.email}
                  onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                  placeholder="email@example.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subject">Fan</Label>
                <Select value={newTeacher.subject} onValueChange={handleSubjectChange}>
                  <SelectTrigger id="subject">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ingliz tili">Ingliz tili (15%)</SelectItem>
                    <SelectItem value="Matematika">Matematika (12%)</SelectItem>
                    <SelectItem value="Fizika">Fizika (10%)</SelectItem>
                    <SelectItem value="Kimyo">Kimyo (10%)</SelectItem>
                    <SelectItem value="Biologiya">Biologiya (10%)</SelectItem>
                    <SelectItem value="IELTS">IELTS (18%)</SelectItem>
                    <SelectItem value="Tarix">Tarix (8%)</SelectItem>
                    <SelectItem value="Geografiya">Geografiya (8%)</SelectItem>
                    <SelectItem value="Adabiyot">Adabiyot (8%)</SelectItem>
                    <SelectItem value="Rus tili">Rus tili (12%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="experience">Tajriba</Label>
                <Input
                  id="experience"
                  value={newTeacher.experience}
                  onChange={(e) => setNewTeacher({ ...newTeacher, experience: e.target.value })}
                  placeholder="3 yil"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="education">Ta'lim</Label>
                <Input
                  id="education"
                  value={newTeacher.education}
                  onChange={(e) => setNewTeacher({ ...newTeacher, education: e.target.value })}
                  placeholder="TATU, Ingliz tili"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="salaryType">Maosh turi</Label>
                <Select
                  value={newTeacher.salaryType}
                  onValueChange={(value) => setNewTeacher({ ...newTeacher, salaryType: value })}
                >
                  <SelectTrigger id="salaryType">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Foizli maosh (tavsiya etiladi)</SelectItem>
                    <SelectItem value="fixed">Qat'iy maosh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {newTeacher.salaryType === "percentage" && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="percentage">Foiz miqdori (%)</Label>
                    <Input
                      id="percentage"
                      type="number"
                      value={newTeacher.percentage}
                      onChange={(e) => setNewTeacher({ ...newTeacher, percentage: e.target.value })}
                      placeholder="15"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="students">O'quvchilar soni</Label>
                    <Input
                      id="students"
                      type="number"
                      value={newTeacher.students}
                      onChange={(e) => setNewTeacher({ ...newTeacher, students: e.target.value })}
                      placeholder="0"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Kutilayotgan maosh</Label>
                    <div className="p-3 bg-muted rounded-md flex items-center gap-2">
                      <Calculator className="h-4 w-4" />
                      <span className="font-medium">{calculateExpectedSalary().toLocaleString()} so'm/oy</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Hisoblash: {newTeacher.students} o'quvchi × {coursePrices[newTeacher.subject]?.toLocaleString()}{" "}
                      so'm × {newTeacher.percentage}%
                    </p>
                  </div>
                </>
              )}
              {newTeacher.salaryType === "fixed" && (
                <div className="grid gap-2">
                  <Label htmlFor="salaryPerHour">Oylik maosh (so'm)</Label>
                  <Input
                    id="salaryPerHour"
                    type="number"
                    value={newTeacher.salaryPerHour}
                    onChange={(e) => setNewTeacher({ ...newTeacher, salaryPerHour: e.target.value })}
                    placeholder="900000"
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Bekor qilish
              </Button>
              <Button onClick={handleAddTeacher}>Qo'shish</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jami o'qituvchilar</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teachers.length}</div>
            <p className="text-xs text-muted-foreground">Faol o'qituvchilar</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jami guruhlar</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teachers.reduce((sum, teacher) => sum + teacher.groups, 0)}</div>
            <p className="text-xs text-muted-foreground">Faol guruhlar</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jami o'quvchilar</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teachers.reduce((sum, teacher) => sum + teacher.students, 0)}</div>
            <p className="text-xs text-muted-foreground">O'qituvchilar nazoratida</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kutilayotgan maoshlar</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teachers.reduce((sum, teacher) => sum + teacher.expectedSalary, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Jami oylik maoshlar</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>O'qituvchilar ro'yxati</CardTitle>
          <CardDescription>Barcha o'qituvchilar ro'yxati va ularning maosh ma'lumotlari</CardDescription>
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
                  <TableHead>Fan</TableHead>
                  <TableHead>O'quvchilar</TableHead>
                  <TableHead>Maosh turi</TableHead>
                  <TableHead>Kutilayotgan maosh</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amallar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell className="font-medium">{teacher.id}</TableCell>
                    <TableCell>
                      <Link href={`/teachers/${teacher.id}`} className="flex items-center gap-2 hover:underline">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{teacher.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{teacher.name}</div>
                          <div className="text-xs text-muted-foreground">{teacher.email}</div>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {teacher.subject}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        {teacher.students}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {teacher.salaryType === "percentage" ? `${teacher.percentage}% foiz` : "Qat'iy maosh"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        {teacher.expectedSalary.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          teacher.status === "active"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-red-50 text-red-700 border-red-200"
                        }
                      >
                        {teacher.status === "active" ? "Faol" : "Faol emas"}
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
                            <Link href={`/teachers/${teacher.id}`}>Batafsil ko'rish</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>Tahrirlash</DropdownMenuItem>
                          <DropdownMenuItem>Guruh tayinlash</DropdownMenuItem>
                          <DropdownMenuItem>Maosh to'lash</DropdownMenuItem>
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
