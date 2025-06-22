"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Calendar, Mail, Phone, UserCircle } from "lucide-react"
import Link from "next/link"

// Sample student data
const studentsData = {
  STD001: {
    id: "STD001",
    name: "Alisher Zokirov",
    phone: "+998 90 123 45 67",
    email: "alisher@example.com",
    group: "Intermediate B1",
    status: "active",
    joinDate: "12.03.2023",
    paymentStatus: "paid",
    attendance: 95,
    address: "Toshkent, Chilonzor tumani, 7-mavze",
    birthDate: "15.05.2000",
    payments: [
      { id: "PAY001", date: "01.03.2023", amount: 450000, status: "paid" },
      { id: "PAY002", date: "01.04.2023", amount: 450000, status: "paid" },
      { id: "PAY003", date: "01.05.2023", amount: 450000, status: "paid" },
    ],
    attendance_records: [
      { date: "01.03.2023", status: "present", comment: "" },
      { date: "03.03.2023", status: "present", comment: "" },
      { date: "06.03.2023", status: "present", comment: "" },
      { date: "08.03.2023", status: "absent", comment: "Kasal" },
      { date: "10.03.2023", status: "present", comment: "" },
      { date: "13.03.2023", status: "present", comment: "" },
      { date: "15.03.2023", status: "present", comment: "" },
      { date: "17.03.2023", status: "present", comment: "" },
      { date: "20.03.2023", status: "present", comment: "" },
      { date: "22.03.2023", status: "present", comment: "" },
      { date: "24.03.2023", status: "present", comment: "" },
      { date: "27.03.2023", status: "present", comment: "" },
      { date: "29.03.2023", status: "present", comment: "" },
      { date: "31.03.2023", status: "present", comment: "" },
    ],
  },
  STD004: {
    id: "STD004",
    name: "Nilufar Rahimova",
    phone: "+998 94 456 78 90",
    email: "nilufar@example.com",
    group: "Intermediate B2",
    status: "active",
    joinDate: "20.03.2023",
    paymentStatus: "debt",
    attendance: 80,
    address: "Toshkent, Yunusobod tumani, 12-mavze",
    birthDate: "22.09.1998",
    payments: [
      { id: "PAY101", date: "20.03.2023", amount: 450000, status: "paid" },
      { id: "PAY102", date: "20.04.2023", amount: 450000, status: "paid" },
      { id: "PAY103", date: "20.05.2023", amount: 450000, status: "unpaid" },
    ],
    attendance_records: [
      { date: "21.03.2023", status: "present", comment: "" },
      { date: "23.03.2023", status: "present", comment: "" },
      { date: "25.03.2023", status: "absent", comment: "Oilaviy sabablarga ko'ra" },
      { date: "28.03.2023", status: "present", comment: "" },
      { date: "30.03.2023", status: "present", comment: "" },
      { date: "01.04.2023", status: "present", comment: "" },
      { date: "04.04.2023", status: "absent", comment: "Kasal" },
      { date: "06.04.2023", status: "present", comment: "" },
      { date: "08.04.2023", status: "present", comment: "" },
      { date: "11.04.2023", status: "present", comment: "" },
      { date: "13.04.2023", status: "absent", comment: "Kech qoldi" },
      { date: "15.04.2023", status: "present", comment: "" },
      { date: "18.04.2023", status: "present", comment: "" },
      { date: "20.04.2023", status: "present", comment: "" },
    ],
  },
  STD006: {
    id: "STD006",
    name: "Zarina Umarova",
    phone: "+998 97 678 90 12",
    email: "zarina@example.com",
    group: "Intermediate B1",
    status: "inactive",
    joinDate: "25.03.2023",
    paymentStatus: "debt",
    attendance: 65,
    address: "Toshkent, Mirzo Ulug'bek tumani, 5-mavze",
    birthDate: "10.12.1999",
    payments: [
      { id: "PAY201", date: "25.03.2023", amount: 450000, status: "paid" },
      { id: "PAY202", date: "25.04.2023", amount: 450000, status: "unpaid" },
      { id: "PAY203", date: "25.05.2023", amount: 450000, status: "unpaid" },
    ],
    attendance_records: [
      { date: "26.03.2023", status: "present", comment: "" },
      { date: "28.03.2023", status: "absent", comment: "Kasal" },
      { date: "30.03.2023", status: "present", comment: "" },
      { date: "02.04.2023", status: "present", comment: "" },
      { date: "04.04.2023", status: "absent", comment: "Oilaviy sabablarga ko'ra" },
      { date: "06.04.2023", status: "absent", comment: "Kasal" },
      { date: "09.04.2023", status: "present", comment: "" },
      { date: "11.04.2023", status: "present", comment: "" },
      { date: "13.04.2023", status: "absent", comment: "" },
      { date: "16.04.2023", status: "present", comment: "" },
      { date: "18.04.2023", status: "absent", comment: "Kech qoldi" },
      { date: "20.04.2023", status: "present", comment: "" },
      { date: "23.04.2023", status: "absent", comment: "" },
      { date: "25.04.2023", status: "present", comment: "" },
    ],
  },
}

export default function StudentDetailPage() {
  const params = useParams()
  const studentId = params.id 

  // Default to STD001 if the student is not found
  const student = studentsData[studentId] || studentsData["STD001"]

  const [activeTab, setActiveTab] = useState("overview")

  const presentCount = student.attendance_records.filter((record) => record.status === "present").length
  const totalClasses = student.attendance_records.length
  const attendancePercentage = Math.round((presentCount / totalClasses) * 100)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/students">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Orqaga</span>
          </Link>
        </Button>
        <h2 className="text-3xl font-bold tracking-tight">O'quvchi ma'lumotlari</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex flex-col items-center space-y-2">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="text-2xl">{student.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="space-y-1 text-center">
                <h2 className="text-2xl font-bold">{student.name}</h2>
                <p className="text-sm text-muted-foreground">{student.id}</p>
                <Badge
                  variant="outline"
                  className={
                    student.status === "active"
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-red-50 text-red-700 border-red-200"
                  }
                >
                  {student.status === "active" ? "Faol" : "Faol emas"}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{student.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{student.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <UserCircle className="h-4 w-4 text-muted-foreground" />
                <span>{student.group}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Qo'shilgan sana: {student.joinDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Tug'ilgan sana: {student.birthDate}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-5 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="overview">Umumiy</TabsTrigger>
              <TabsTrigger value="attendance">Davomat</TabsTrigger>
              <TabsTrigger value="payments">To'lovlar</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Umumiy ma'lumotlar</CardTitle>
                  <CardDescription>O'quvchi haqida umumiy ma'lumotlar</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Manzil</h3>
                        <p>{student.address}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Guruh</h3>
                        <p>{student.group}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Qo'shilgan sana</h3>
                        <p>{student.joinDate}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Davomat</h3>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={
                              attendancePercentage >= 90
                                ? "bg-green-50 text-green-700 border-green-200"
                                : attendancePercentage >= 75
                                  ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                  : "bg-red-50 text-red-700 border-red-200"
                            }
                          >
                            {attendancePercentage}%
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            ({presentCount}/{totalClasses} dars)
                          </span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">To'lov holati</h3>
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
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                        <Badge
                          variant="outline"
                          className={
                            student.status === "active"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-red-50 text-red-700 border-red-200"
                          }
                        >
                          {student.status === "active" ? "Faol" : "Faol emas"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="attendance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Davomat tarixi</CardTitle>
                  <CardDescription>O'quvchining dars davomati</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Sana</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Izoh</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {student.attendance_records.map((record, index) => (
                        <TableRow key={index}>
                          <TableCell>{record.date}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                record.status === "present"
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : "bg-red-50 text-red-700 border-red-200"
                              }
                            >
                              {record.status === "present" ? "Kelgan" : "Kelmagan"}
                            </Badge>
                          </TableCell>
                          <TableCell>{record.comment}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="payments" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>To'lovlar tarixi</CardTitle>
                  <CardDescription>O'quvchining to'lovlar tarixi</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Sana</TableHead>
                        <TableHead>Summa</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {student.payments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell>{payment.id}</TableCell>
                          <TableCell>{payment.date}</TableCell>
                          <TableCell>{payment.amount.toLocaleString()} so'm</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                payment.status === "paid"
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : "bg-red-50 text-red-700 border-red-200"
                              }
                            >
                              {payment.status === "paid" ? "To'langan" : "To'lanmagan"}
                            </Badge>
                          </TableCell>
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
