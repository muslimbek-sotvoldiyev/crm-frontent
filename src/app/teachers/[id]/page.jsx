"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Calendar, Mail, Phone, Users, Clock, DollarSign, BookOpen } from "lucide-react"
import Link from "next/link"

// Sample teacher data
const teachersData = {
  TCH001: {
    id: "TCH001",
    name: "Aziza Karimova",
    phone: "+998 90 111 22 33",
    email: "aziza@englishcenter.uz",
    subject: "Ingliz tili",
    groups: 2,
    students: 25,
    status: "active",
    joinDate: "01.01.2023",
    experience: "5 yil",
    education: "TATU, Ingliz tili",
    hoursPerWeek: 18,
    salaryPerHour: 25000,
    totalSalary: 1800000,
    salaryType: "percentage", // percentage yoki fixed
    percentage: 15, // har bir o'quvchidan 15%
    address: "Toshkent, Chilonzor tumani, 5-mavze",
    birthDate: "12.08.1990",
    schedule: [
      { day: "Dushanba", time: "09:00-10:30", group: "Elementary A1", room: "Xona 1" },
      { day: "Dushanba", time: "11:00-12:30", group: "Elementary A1", room: "Xona 1" },
      { day: "Chorshanba", time: "09:00-10:30", group: "Elementary A2", room: "Xona 2" },
      { day: "Chorshanba", time: "11:00-12:30", group: "Elementary A2", room: "Xona 2" },
      { day: "Juma", time: "09:00-10:30", group: "Elementary A1", room: "Xona 1" },
      { day: "Juma", time: "11:00-12:30", group: "Elementary A2", room: "Xona 2" },
    ],
    groups_detail: [
      {
        id: "GRP001",
        name: "Elementary A1",
        subject: "Ingliz tili",
        students: 12,
        level: "Elementary",
        schedule: "Dush/Chor/Juma 09:00-10:30",
        room: "Xona 1",
        monthlyFee: 450000,
      },
      {
        id: "GRP002",
        name: "Elementary A2",
        subject: "Ingliz tili",
        students: 13,
        level: "Elementary",
        schedule: "Dush/Chor/Juma 11:00-12:30",
        room: "Xona 2",
        monthlyFee: 450000,
      },
    ],
    students_list: [
      { id: "STD001", name: "Alisher Zokirov", group: "Elementary A1", attendance: 95, payment: "paid" },
      { id: "STD005", name: "Bobur Alimov", group: "Elementary A1", attendance: 100, payment: "paid" },
      { id: "STD007", name: "Sardor Kamolov", group: "Elementary A1", attendance: 95, payment: "paid" },
      { id: "STD010", name: "Gulnora Karimova", group: "Elementary A1", attendance: 90, payment: "debt" },
      { id: "STD015", name: "Aziza Toshmatova", group: "Elementary A1", attendance: 85, payment: "paid" },
      { id: "STD020", name: "Javohir Rahimov", group: "Elementary A1", attendance: 80, payment: "paid" },
      { id: "STD002", name: "Malika Karimova", group: "Elementary A2", attendance: 90, payment: "paid" },
      { id: "STD008", name: "Dilnoza Saidova", group: "Elementary A2", attendance: 90, payment: "paid" },
      { id: "STD014", name: "Farrukh Alimov", group: "Elementary A2", attendance: 85, payment: "debt" },
      { id: "STD022", name: "Zarina Toshmatova", group: "Elementary A2", attendance: 95, payment: "paid" },
    ],
    salary_history: [
      { month: "2023-03", hours: 72, amount: 1800000, bonus: 0, total: 1800000 },
      { month: "2023-02", hours: 68, amount: 1700000, bonus: 50000, total: 1750000 },
      { month: "2023-01", hours: 70, amount: 1750000, bonus: 0, total: 1750000 },
    ],
  },
  TCH002: {
    id: "TCH002",
    name: "Bobur Aliyev",
    phone: "+998 91 222 33 44",
    email: "bobur@englishcenter.uz",
    subject: "Matematika",
    groups: 2,
    students: 22,
    status: "active",
    joinDate: "15.01.2023",
    experience: "3 yil",
    education: "UzSWLU, Matematika",
    hoursPerWeek: 18,
    salaryPerHour: 25000,
    totalSalary: 1650000,
    salaryType: "percentage",
    percentage: 12,
    address: "Toshkent, Yunusobod tumani, 8-mavze",
    birthDate: "25.03.1992",
    schedule: [
      { day: "Seshanba", time: "09:00-10:30", group: "Matematika 7-sinf", room: "Xona 3" },
      { day: "Seshanba", time: "11:00-12:30", group: "Matematika 8-sinf", room: "Xona 3" },
      { day: "Payshanba", time: "09:00-10:30", group: "Matematika 7-sinf", room: "Xona 3" },
      { day: "Payshanba", time: "11:00-12:30", group: "Matematika 8-sinf", room: "Xona 3" },
      { day: "Shanba", time: "09:00-10:30", group: "Matematika 7-sinf", room: "Xona 3" },
      { day: "Shanba", time: "11:00-12:30", group: "Matematika 8-sinf", room: "Xona 3" },
    ],
    groups_detail: [
      {
        id: "GRP007",
        name: "Matematika 7-sinf",
        subject: "Matematika",
        students: 11,
        level: "7-sinf",
        schedule: "Sesh/Pay/Shan 09:00-10:30",
        room: "Xona 3",
        monthlyFee: 400000,
      },
      {
        id: "GRP008",
        name: "Matematika 8-sinf",
        subject: "Matematika",
        students: 11,
        level: "8-sinf",
        schedule: "Sesh/Pay/Shan 11:00-12:30",
        room: "Xona 3",
        monthlyFee: 450000,
      },
    ],
    students_list: [
      { id: "STD051", name: "Anvar Karimov", group: "Matematika 7-sinf", attendance: 88, payment: "paid" },
      { id: "STD052", name: "Bekzod Alimov", group: "Matematika 7-sinf", attendance: 92, payment: "paid" },
      { id: "STD053", name: "Dildora Saidova", group: "Matematika 8-sinf", attendance: 95, payment: "debt" },
      { id: "STD054", name: "Eldor Rahimov", group: "Matematika 8-sinf", attendance: 90, payment: "paid" },
    ],
    salary_history: [
      { month: "2023-03", hours: 72, amount: 1650000, bonus: 0, total: 1650000 },
      { month: "2023-02", hours: 68, amount: 1530000, bonus: 30000, total: 1560000 },
      { month: "2023-01", hours: 70, amount: 1600000, bonus: 0, total: 1600000 },
    ],
  },
}

export default function TeacherDetailPage() {
  const params = useParams()
  const teacherId = params.id

  // Default to TCH001 if the teacher is not found
  const teacher = teachersData[teacherId] || teachersData["TCH001"]

  const [activeTab, setActiveTab] = useState("overview")

  const totalStudents = teacher.students_list.length
  const paidStudents = teacher.students_list.filter((student) => student.payment === "paid").length
  const debtStudents = teacher.students_list.filter((student) => student.payment === "debt").length
  const averageAttendance = Math.round(
    teacher.students_list.reduce((sum, student) => sum + student.attendance, 0) / totalStudents,
  )

  // Calculate salary based on type
  const calculateSalary = () => {
    if (teacher.salaryType === "percentage") {
      const totalMonthlyFees = teacher.groups_detail.reduce((sum, group) => sum + group.students * group.monthlyFee, 0)
      return Math.round((totalMonthlyFees * teacher.percentage) / 100)
    }
    return teacher.totalSalary
  }

  const calculatedSalary = calculateSalary()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/teachers">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Orqaga</span>
          </Link>
        </Button>
        <h2 className="text-3xl font-bold tracking-tight">O'qituvchi ma'lumotlari</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex flex-col items-center space-y-2">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="text-2xl">{teacher.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="space-y-1 text-center">
                <h2 className="text-2xl font-bold">{teacher.name}</h2>
                <p className="text-sm text-muted-foreground">{teacher.id}</p>
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
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{teacher.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{teacher.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <span>{teacher.subject}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Ishga kirgan: {teacher.joinDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Tug'ilgan: {teacher.birthDate}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-5 space-y-6">
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Guruhlar</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{teacher.groups}</div>
                <p className="text-xs text-muted-foreground">Faol guruhlar</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">O'quvchilar</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalStudents}</div>
                <p className="text-xs text-muted-foreground">
                  {paidStudents} to'lagan, {debtStudents} qarzdor
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Haftalik soat</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{teacher.hoursPerWeek}</div>
                <p className="text-xs text-muted-foreground">Dars soatlari</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Oylik maosh</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{calculatedSalary.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  {teacher.salaryType === "percentage" ? `${teacher.percentage}% foiz` : "Qat'iy maosh"}
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="overview">Umumiy</TabsTrigger>
              <TabsTrigger value="groups">Guruhlar</TabsTrigger>
              <TabsTrigger value="students">O'quvchilar</TabsTrigger>
              <TabsTrigger value="schedule">Jadval</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Umumiy ma'lumotlar</CardTitle>
                  <CardDescription>O'qituvchi haqida umumiy ma'lumotlar</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Manzil</h3>
                        <p>{teacher.address}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Fan</h3>
                        <p>{teacher.subject}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Tajriba</h3>
                        <p>{teacher.experience}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Ta'lim</h3>
                        <p>{teacher.education}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Maosh turi</h3>
                        <Badge variant="outline">
                          {teacher.salaryType === "percentage" ? "Foizli maosh" : "Qat'iy maosh"}
                        </Badge>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Maosh miqdori</h3>
                        <p>
                          {teacher.salaryType === "percentage"
                            ? `${teacher.percentage}% (${calculatedSalary.toLocaleString()} so'm)`
                            : `${teacher.totalSalary.toLocaleString()} so'm`}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">O'rtacha davomat</h3>
                        <Badge
                          variant="outline"
                          className={
                            averageAttendance >= 90
                              ? "bg-green-50 text-green-700 border-green-200"
                              : averageAttendance >= 75
                                ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                : "bg-red-50 text-red-700 border-red-200"
                          }
                        >
                          {averageAttendance}%
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="groups" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Guruhlar</CardTitle>
                  <CardDescription>O'qituvchi dars beradigan guruhlar</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Guruh nomi</TableHead>
                        <TableHead>Fan</TableHead>
                        <TableHead>Daraja</TableHead>
                        <TableHead>O'quvchilar</TableHead>
                        <TableHead>Jadval</TableHead>
                        <TableHead>Xona</TableHead>
                        <TableHead>Oylik to'lov</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {teacher.groups_detail.map((group) => (
                        <TableRow key={group.id}>
                          <TableCell className="font-medium">{group.name}</TableCell>
                          <TableCell>{group.subject}</TableCell>
                          <TableCell>{group.level}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              {group.students}
                            </div>
                          </TableCell>
                          <TableCell>{group.schedule}</TableCell>
                          <TableCell>{group.room}</TableCell>
                          <TableCell>{group.monthlyFee.toLocaleString()} so'm</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="students" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>O'quvchilar</CardTitle>
                  <CardDescription>O'qituvchi dars beradigan o'quvchilar</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>O'quvchi</TableHead>
                        <TableHead>Guruh</TableHead>
                        <TableHead>Davomat</TableHead>
                        <TableHead>To'lov holati</TableHead>
                        <TableHead>Amallar</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {teacher.students_list.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>
                            <Link href={`/students/${student.id}`} className="flex items-center gap-2 hover:underline">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>{student.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{student.name}</div>
                                <div className="text-xs text-muted-foreground">{student.id}</div>
                              </div>
                            </Link>
                          </TableCell>
                          <TableCell>{student.group}</TableCell>
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
                                student.payment === "paid"
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : "bg-red-50 text-red-700 border-red-200"
                              }
                            >
                              {student.payment === "paid" ? "To'langan" : "Qarzdor"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/students/${student.id}`}>Batafsil</Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Dars jadvali</CardTitle>
                  <CardDescription>O'qituvchining haftalik dars jadvali</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Kun</TableHead>
                        <TableHead>Vaqt</TableHead>
                        <TableHead>Guruh</TableHead>
                        <TableHead>Xona</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {teacher.schedule.map((schedule, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{schedule.day}</TableCell>
                          <TableCell>{schedule.time}</TableCell>
                          <TableCell>{schedule.group}</TableCell>
                          <TableCell>{schedule.room}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
