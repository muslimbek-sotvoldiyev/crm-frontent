"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Calendar, Phone, UserCircle, Search, Filter, Download } from "lucide-react"
import Link from "next/link"

// Sample student data - ID lar bilan mos kelishi uchun tuzatildi
const studentsData = {
  1: {
    id: 1,
    name: "Akmal Karimov",
    phone: "+998 90 123 45 67",
    groups: [{ groupId: "eng-a1", groupName: "Elementary A1", subject: "Ingliz tili", fee: 450000 }],
    status: "Faol",
    joinDate: "15.01.2024",
    birthDate: "15.03.2005",
    address: "Toshkent, Chilonzor tumani, 7-mavze",
    totalFee: 450000,
    paidAmount: 450000,
    debt: 0,
    attendance: 95,
    discountDuration: 1,
    discountStartDate: "2024-01-15",
    // Guruh bo'yicha to'lovlar
    groupPayments: {
      "eng-a1": {
        totalFee: 450000,
        paidAmount: 450000,
        debt: 0,
        payments: [
          {
            id: "PAY001",
            date: "15.01.2024",
            amount: 450000,
            method: "Naqd",
            status: "paid",
            description: "Elementary A1 - Yanvar oyi uchun to'lov",
            groupId: "eng-a1",
            groupName: "Elementary A1",
          },
          {
            id: "PAY002",
            date: "15.02.2024",
            amount: 450000,
            method: "Plastik karta",
            status: "paid",
            description: "Elementary A1 - Fevral oyi uchun to'lov",
            groupId: "eng-a1",
            groupName: "Elementary A1",
          },
          {
            id: "PAY003",
            date: "15.03.2024",
            amount: 450000,
            method: "Bank o'tkazmasi",
            status: "paid",
            description: "Elementary A1 - Mart oyi uchun to'lov",
            groupId: "eng-a1",
            groupName: "Elementary A1",
          },
        ],
      },
    },
    attendance_records: [
      { date: "2024-01-15", status: "present", comment: "", lesson: "Grammar basics", groupId: "eng-a1" },
      { date: "2024-01-17", status: "present", comment: "", lesson: "Vocabulary building", groupId: "eng-a1" },
      { date: "2024-01-19", status: "present", comment: "", lesson: "Speaking practice", groupId: "eng-a1" },
      { date: "2024-01-22", status: "absent", comment: "Kasal", lesson: "Reading comprehension", groupId: "eng-a1" },
      { date: "2024-01-24", status: "present", comment: "", lesson: "Writing skills", groupId: "eng-a1" },
      { date: "2024-01-26", status: "present", comment: "", lesson: "Listening practice", groupId: "eng-a1" },
      { date: "2024-01-29", status: "present", comment: "", lesson: "Grammar review", groupId: "eng-a1" },
      { date: "2024-01-31", status: "present", comment: "", lesson: "Test preparation", groupId: "eng-a1" },
      { date: "2024-02-02", status: "present", comment: "", lesson: "New vocabulary", groupId: "eng-a1" },
      { date: "2024-02-05", status: "present", comment: "", lesson: "Conversation practice", groupId: "eng-a1" },
      { date: "2024-02-07", status: "present", comment: "", lesson: "Grammar exercises", groupId: "eng-a1" },
      { date: "2024-02-09", status: "present", comment: "", lesson: "Reading skills", groupId: "eng-a1" },
      { date: "2024-02-12", status: "present", comment: "", lesson: "Writing practice", groupId: "eng-a1" },
      { date: "2024-02-14", status: "present", comment: "", lesson: "Speaking fluency", groupId: "eng-a1" },
      { date: "2024-02-16", status: "present", comment: "", lesson: "Listening comprehension", groupId: "eng-a1" },
      { date: "2024-02-19", status: "present", comment: "", lesson: "Review session", groupId: "eng-a1" },
      { date: "2024-02-21", status: "present", comment: "", lesson: "Mock test", groupId: "eng-a1" },
      { date: "2024-02-23", status: "present", comment: "", lesson: "Error correction", groupId: "eng-a1" },
      { date: "2024-02-26", status: "present", comment: "", lesson: "Advanced grammar", groupId: "eng-a1" },
      { date: "2024-02-28", status: "present", comment: "", lesson: "Final review", groupId: "eng-a1" },
    ],
  },
  2: {
    id: 2,
    name: "Malika Saidova",
    phone: "+998 91 234 56 78",
    groups: [
      { groupId: "eng-b1", groupName: "Intermediate B1", subject: "Ingliz tili", fee: 450000 },
      { groupId: "ielts", groupName: "IELTS Preparation", subject: "IELTS", fee: 600000 },
    ],
    status: "Faol",
    joinDate: "10.01.2024",
    birthDate: "22.07.2004",
    address: "Toshkent, Yunusobod tumani, 12-mavze",
    totalFee: 945000, // 10% chegirma bilan
    paidAmount: 1395000, // 3 oy to'lov
    debt: 0,
    attendance: 88,
    discountDuration: 2,
    discountStartDate: "2024-01-10",
    // Guruh bo'yicha to'lovlar
    groupPayments: {
      "eng-b1": {
        totalFee: 405000, // 450000 - 10% chegirma
        paidAmount: 855000, // 3 oy to'lov (2 oy chegirma bilan, 1 oy to'liq)
        debt: 0,
        payments: [
          {
            id: "PAY101",
            date: "10.01.2024",
            amount: 405000,
            method: "Bank o'tkazmasi",
            status: "paid",
            description: "Intermediate B1 - Yanvar to'lovi (10% chegirma)",
            groupId: "eng-b1",
            groupName: "Intermediate B1",
          },
          {
            id: "PAY102",
            date: "10.02.2024",
            amount: 405000,
            method: "Plastik karta",
            status: "paid",
            description: "Intermediate B1 - Fevral to'lovi (10% chegirma)",
            groupId: "eng-b1",
            groupName: "Intermediate B1",
          },
          {
            id: "PAY103",
            date: "10.03.2024",
            amount: 450000,
            method: "Naqd",
            status: "paid",
            description: "Intermediate B1 - Mart to'lovi (chegirma tugagan)",
            groupId: "eng-b1",
            groupName: "Intermediate B1",
          },
        ],
      },
      ielts: {
        totalFee: 540000, // 600000 - 10% chegirma
        paidAmount: 1140000, // 3 oy to'lov (2 oy chegirma bilan, 1 oy to'liq)
        debt: 0,
        payments: [
          {
            id: "PAY201",
            date: "10.01.2024",
            amount: 540000,
            method: "Bank o'tkazmasi",
            status: "paid",
            description: "IELTS Preparation - Yanvar to'lovi (10% chegirma)",
            groupId: "ielts",
            groupName: "IELTS Preparation",
          },
          {
            id: "PAY202",
            date: "10.02.2024",
            amount: 540000,
            method: "Plastik karta",
            status: "paid",
            description: "IELTS Preparation - Fevral to'lovi (10% chegirma)",
            groupId: "ielts",
            groupName: "IELTS Preparation",
          },
          {
            id: "PAY203",
            date: "10.03.2024",
            amount: 600000,
            method: "Naqd",
            status: "paid",
            description: "IELTS Preparation - Mart to'lovi (chegirma tugagan)",
            groupId: "ielts",
            groupName: "IELTS Preparation",
          },
        ],
      },
    },
    attendance_records: [
      { date: "2024-01-10", status: "present", comment: "", lesson: "Intermediate grammar", groupId: "eng-b1" },
      { date: "2024-01-10", status: "present", comment: "", lesson: "IELTS Writing Task 1", groupId: "ielts" },
      { date: "2024-01-12", status: "present", comment: "", lesson: "Complex sentences", groupId: "eng-b1" },
      { date: "2024-01-12", status: "present", comment: "", lesson: "IELTS Reading strategies", groupId: "ielts" },
      {
        date: "2024-01-15",
        status: "absent",
        comment: "Oilaviy sabablarga ko'ra",
        lesson: "Speaking practice",
        groupId: "eng-b1",
      },
      { date: "2024-01-15", status: "present", comment: "", lesson: "IELTS Listening", groupId: "ielts" },
      { date: "2024-01-17", status: "present", comment: "", lesson: "Advanced vocabulary", groupId: "eng-b1" },
      { date: "2024-01-17", status: "present", comment: "", lesson: "IELTS Writing Task 2", groupId: "ielts" },
      { date: "2024-01-19", status: "present", comment: "", lesson: "Grammar review", groupId: "eng-b1" },
      { date: "2024-01-19", status: "absent", comment: "Kasal", lesson: "IELTS Speaking practice", groupId: "ielts" },
    ],
  },
  3: {
    id: 3,
    name: "Sardor Rahimov",
    phone: "+998 93 345 67 89",
    groups: [{ groupId: "math-8", groupName: "Matematika 8-sinf", subject: "Matematika", fee: 400000 }],
    status: "Faol",
    joinDate: "20.01.2024",
    birthDate: "08.11.2006",
    address: "Toshkent, Mirzo Ulug'bek tumani, 5-mavze",
    totalFee: 400000,
    paidAmount: 800000, // 2 oy to'lov
    debt: 0,
    attendance: 92,
    discountDuration: 1,
    discountStartDate: "2024-01-20",
    groupPayments: {
      "math-8": {
        totalFee: 400000,
        paidAmount: 800000,
        debt: 0,
        payments: [
          {
            id: "PAY301",
            date: "20.01.2024",
            amount: 400000,
            method: "Naqd",
            status: "paid",
            description: "Matematika 8-sinf - Yanvar oyi uchun to'lov",
            groupId: "math-8",
            groupName: "Matematika 8-sinf",
          },
          {
            id: "PAY302",
            date: "20.02.2024",
            amount: 400000,
            method: "Plastik karta",
            status: "paid",
            description: "Matematika 8-sinf - Fevral oyi uchun to'lov",
            groupId: "math-8",
            groupName: "Matematika 8-sinf",
          },
        ],
      },
    },
    attendance_records: [
      { date: "2024-01-20", status: "present", comment: "", lesson: "Algebraik ifodalar", groupId: "math-8" },
      { date: "2024-01-22", status: "present", comment: "", lesson: "Tenglamalar", groupId: "math-8" },
      { date: "2024-01-24", status: "present", comment: "", lesson: "Geometriya asoslari", groupId: "math-8" },
      { date: "2024-01-26", status: "present", comment: "", lesson: "Funksiyalar", groupId: "math-8" },
      { date: "2024-01-29", status: "present", comment: "", lesson: "Kvadrat tenglamalar", groupId: "math-8" },
    ],
  },
  4: {
    id: 4,
    name: "Nilufar Tosheva",
    phone: "+998 94 456 78 90",
    groups: [{ groupId: "ielts", groupName: "IELTS Preparation", subject: "IELTS", fee: 600000 }],
    status: "Faol",
    joinDate: "05.01.2024",
    birthDate: "12.05.2003",
    address: "Toshkent, Shayxontohur tumani, 3-mavze",
    totalFee: 600000,
    paidAmount: 1710000, // 3 oy to'lov (1 oy chegirma bilan)
    debt: 90000,
    attendance: 85,
    discountDuration: 1,
    discountStartDate: "2024-01-05",
    groupPayments: {
      ielts: {
        totalFee: 600000,
        paidAmount: 1710000,
        debt: 90000,
        payments: [
          {
            id: "PAY401",
            date: "05.01.2024",
            amount: 600000,
            method: "Bank o'tkazmasi",
            status: "paid",
            description: "IELTS Preparation - Yanvar oyi uchun to'lov (chegirma yo'q)",
            groupId: "ielts",
            groupName: "IELTS Preparation",
          },
          {
            id: "PAY402",
            date: "05.02.2024",
            amount: 600000,
            method: "Plastik karta",
            status: "paid",
            description: "IELTS Preparation - Fevral oyi uchun to'lov",
            groupId: "ielts",
            groupName: "IELTS Preparation",
          },
          {
            id: "PAY403",
            date: "05.03.2024",
            amount: 510000,
            method: "Naqd",
            status: "paid",
            description: "IELTS Preparation - Mart oyi uchun qisman to'lov",
            groupId: "ielts",
            groupName: "IELTS Preparation",
          },
          {
            id: "PAY404",
            date: "05.04.2024",
            amount: 0,
            method: "Kutilmoqda",
            status: "unpaid",
            description: "IELTS Preparation - Aprel oyi uchun qarz (90,000 so'm)",
            groupId: "ielts",
            groupName: "IELTS Preparation",
          },
        ],
      },
    },
    attendance_records: [
      { date: "2024-01-05", status: "present", comment: "", lesson: "IELTS Overview", groupId: "ielts" },
      { date: "2024-01-08", status: "present", comment: "", lesson: "Reading strategies", groupId: "ielts" },
      { date: "2024-01-10", status: "absent", comment: "Kasal", lesson: "Writing Task 1", groupId: "ielts" },
      { date: "2024-01-12", status: "present", comment: "", lesson: "Listening practice", groupId: "ielts" },
      { date: "2024-01-15", status: "present", comment: "", lesson: "Speaking Part 1", groupId: "ielts" },
    ],
  },
  5: {
    id: 5,
    name: "Jasur Alimov",
    phone: "+998 95 567 89 01",
    groups: [
      { groupId: "physics-9", groupName: "Fizika 9-sinf", subject: "Fizika", fee: 350000 },
      { groupId: "math-8", groupName: "Matematika 8-sinf", subject: "Matematika", fee: 400000 },
    ],
    status: "Faol",
    joinDate: "12.01.2024",
    birthDate: "30.09.2005",
    address: "Toshkent, Sergeli tumani, 8-mavze",
    totalFee: 675000, // 10% chegirma bilan
    paidAmount: 1350000, // 2 oy to'lov
    debt: 75000,
    attendance: 78,
    discountDuration: 1,
    discountStartDate: "2024-01-12",
    groupPayments: {
      "physics-9": {
        totalFee: 315000, // 350000 - 10% chegirma
        paidAmount: 665000, // 2 oy to'lov (1 oy chegirma bilan, 1 oy to'liq)
        debt: 35000,
        payments: [
          {
            id: "PAY501",
            date: "12.01.2024",
            amount: 315000,
            method: "Naqd",
            status: "paid",
            description: "Fizika 9-sinf - Yanvar to'lovi (10% chegirma)",
            groupId: "physics-9",
            groupName: "Fizika 9-sinf",
          },
          {
            id: "PAY502",
            date: "12.02.2024",
            amount: 350000,
            method: "Plastik karta",
            status: "paid",
            description: "Fizika 9-sinf - Fevral to'lovi (chegirma tugagan)",
            groupId: "physics-9",
            groupName: "Fizika 9-sinf",
          },
          {
            id: "PAY503",
            date: "12.03.2024",
            amount: 0,
            method: "Kutilmoqda",
            status: "unpaid",
            description: "Fizika 9-sinf - Mart oyi uchun qarz (35,000 so'm)",
            groupId: "physics-9",
            groupName: "Fizika 9-sinf",
          },
        ],
      },
      "math-8": {
        totalFee: 360000, // 400000 - 10% chegirma
        paidAmount: 760000, // 2 oy to'lov (1 oy chegirma bilan, 1 oy to'liq)
        debt: 40000,
        payments: [
          {
            id: "PAY601",
            date: "12.01.2024",
            amount: 360000,
            method: "Naqd",
            status: "paid",
            description: "Matematika 8-sinf - Yanvar to'lovi (10% chegirma)",
            groupId: "math-8",
            groupName: "Matematika 8-sinf",
          },
          {
            id: "PAY602",
            date: "12.02.2024",
            amount: 400000,
            method: "Plastik karta",
            status: "paid",
            description: "Matematika 8-sinf - Fevral to'lovi (chegirma tugagan)",
            groupId: "math-8",
            groupName: "Matematika 8-sinf",
          },
          {
            id: "PAY603",
            date: "12.03.2024",
            amount: 0,
            method: "Kutilmoqda",
            status: "unpaid",
            description: "Matematika 8-sinf - Mart oyi uchun qarz (40,000 so'm)",
            groupId: "math-8",
            groupName: "Matematika 8-sinf",
          },
        ],
      },
    },
    attendance_records: [
      { date: "2024-01-12", status: "present", comment: "", lesson: "Mexanika asoslari", groupId: "physics-9" },
      { date: "2024-01-12", status: "present", comment: "", lesson: "Algebraik ifodalar", groupId: "math-8" },
      {
        date: "2024-01-15",
        status: "absent",
        comment: "Kech qoldi",
        lesson: "Harakat qonunlari",
        groupId: "physics-9",
      },
      { date: "2024-01-15", status: "present", comment: "", lesson: "Tenglamalar", groupId: "math-8" },
      { date: "2024-01-17", status: "present", comment: "", lesson: "Kuch va energiya", groupId: "physics-9" },
      { date: "2024-01-17", status: "absent", comment: "Kasal", lesson: "Geometriya", groupId: "math-8" },
    ],
  },
}

export default function StudentDetailPage() {
  const params = useParams()
  const studentId = Number.parseInt(params.id)
  const student = studentsData[studentId] || studentsData[1]

  const [activeTab, setActiveTab] = useState("overview")
  const [attendanceFilter, setAttendanceFilter] = useState("all")
  const [attendanceSearch, setAttendanceSearch] = useState("")
  const [paymentFilter, setPaymentFilter] = useState("all")
  const [paymentSearch, setPaymentSearch] = useState("")
  const [selectedGroup, setSelectedGroup] = useState("all")

  // Barcha to'lovlarni birlashtirish
  const allPayments = Object.values(student.groupPayments || {}).flatMap((group) => group.payments)

  // Davomat filtrlash
  const filteredAttendance = student.attendance_records.filter((record) => {
    const matchesSearch =
      record.lesson.toLowerCase().includes(attendanceSearch.toLowerCase()) ||
      record.comment.toLowerCase().includes(attendanceSearch.toLowerCase()) ||
      record.date.includes(attendanceSearch)

    let matchesFilter = true
    const recordDate = new Date(record.date)
    const currentDate = new Date()

    switch (attendanceFilter) {
      case "this-month":
        matchesFilter =
          recordDate.getMonth() === currentDate.getMonth() && recordDate.getFullYear() === currentDate.getFullYear()
        break
      case "last-month":
        const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
        matchesFilter =
          recordDate.getMonth() === lastMonth.getMonth() && recordDate.getFullYear() === lastMonth.getFullYear()
        break
      case "this-year":
        matchesFilter = recordDate.getFullYear() === currentDate.getFullYear()
        break
      case "present":
        matchesFilter = record.status === "present"
        break
      case "absent":
        matchesFilter = record.status === "absent"
        break
      default:
        matchesFilter = true
    }

    // Guruh filtri
    if (selectedGroup !== "all") {
      matchesFilter = matchesFilter && record.groupId === selectedGroup
    }

    return matchesSearch && matchesFilter
  })

  // To'lovlar filtrlash
  const filteredPayments = allPayments.filter((payment) => {
    const matchesSearch =
      payment.description.toLowerCase().includes(paymentSearch.toLowerCase()) ||
      payment.method.toLowerCase().includes(paymentSearch.toLowerCase()) ||
      payment.date.includes(paymentSearch) ||
      payment.amount.toString().includes(paymentSearch) ||
      payment.groupName.toLowerCase().includes(paymentSearch.toLowerCase())

    let matchesFilter = true
    const paymentDate = new Date(payment.date.split(".").reverse().join("-"))
    const currentDate = new Date()

    switch (paymentFilter) {
      case "this-month":
        matchesFilter =
          paymentDate.getMonth() === currentDate.getMonth() && paymentDate.getFullYear() === currentDate.getFullYear()
        break
      case "last-month":
        const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
        matchesFilter =
          paymentDate.getMonth() === lastMonth.getMonth() && paymentDate.getFullYear() === lastMonth.getFullYear()
        break
      case "this-year":
        matchesFilter = paymentDate.getFullYear() === currentDate.getFullYear()
        break
      case "paid":
        matchesFilter = payment.status === "paid"
        break
      case "unpaid":
        matchesFilter = payment.status === "unpaid"
        break
      default:
        matchesFilter = true
    }

    // Guruh filtri
    if (selectedGroup !== "all") {
      matchesFilter = matchesFilter && payment.groupId === selectedGroup
    }

    return matchesSearch && matchesFilter
  })

  // Statistika hisoblash
  const presentCount = filteredAttendance.filter((record) => record.status === "present").length
  const totalFilteredClasses = filteredAttendance.length
  const filteredAttendancePercentage =
    totalFilteredClasses > 0 ? Math.round((presentCount / totalFilteredClasses) * 100) : 0

  const totalPaid = filteredPayments.reduce(
    (sum, payment) => (payment.status === "paid" ? sum + payment.amount : sum),
    0,
  )
  const totalUnpaid = filteredPayments.reduce(
    (sum, payment) => (payment.status === "unpaid" ? sum + payment.amount : sum),
    0,
  )

  // Chegirma holati
  const isDiscountActive = () => {
    const startDate = new Date(student.discountStartDate)
    const currentDate = new Date()
    const monthsDiff =
      (currentDate.getFullYear() - startDate.getFullYear()) * 12 + (currentDate.getMonth() - startDate.getMonth())
    return monthsDiff < student.discountDuration
  }

  const calculateDiscount = (groupsCount) => {
    if (groupsCount >= 3) return 20
    if (groupsCount === 2) return 10
    return 0
  }

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
                <p className="text-sm text-muted-foreground">ID: {student.id}</p>
                <Badge
                  variant="outline"
                  className={
                    student.status === "Faol"
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-red-50 text-red-700 border-red-200"
                  }
                >
                  {student.status}
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
                <UserCircle className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="font-medium">{student.groups.length} ta guruh</div>
                  {student.groups.map((group, index) => (
                    <div key={index} className="text-sm text-muted-foreground">
                      {group.groupName} - {group.subject}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Qo'shilgan: {student.joinDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Tug'ilgan: {student.birthDate}</span>
              </div>
              {student.groups.length > 1 && (
                <div className="bg-muted p-3 rounded-lg">
                  <div className="text-sm font-medium text-green-700">
                    Chegirma: {calculateDiscount(student.groups.length)}%
                  </div>
                  <div className="text-xs text-muted-foreground">Muddat: {student.discountDuration} oy</div>
                  <div className="text-xs text-muted-foreground">Holat: {isDiscountActive() ? "Faol" : "Tugagan"}</div>
                </div>
              )}
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
                        <h3 className="text-sm font-medium text-muted-foreground">Guruhlar va to'lovlar</h3>
                        {student.groups.map((group, index) => {
                          const groupPayment = student.groupPayments?.[group.groupId]
                          return (
                            <div key={index} className="mb-4 p-3 border rounded-lg">
                              <div className="font-medium">{group.groupName}</div>
                              <div className="text-sm text-muted-foreground mb-2">{group.subject}</div>
                              {groupPayment && (
                                <div className="space-y-1 text-sm">
                                  <div>
                                    <span className="font-medium">Oylik to'lov: </span>
                                    {group.fee.toLocaleString()} so'm
                                  </div>
                                  <div>
                                    <span className="font-medium">Jami to'langan: </span>
                                    {groupPayment.paidAmount.toLocaleString()} so'm
                                  </div>
                                  {groupPayment.debt > 0 ? (
                                    <div className="text-red-600 font-medium">
                                      Qarz: {groupPayment.debt.toLocaleString()} so'm
                                    </div>
                                  ) : (
                                    <div className="text-green-600">To'liq to'langan</div>
                                  )}
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Umumiy to'lov ma'lumoti</h3>
                        <div className="space-y-1">
                          <div className="text-sm">
                            <span className="font-medium">Jami to'langan: </span>
                            {student.paidAmount.toLocaleString()} so'm
                          </div>
                          {student.debt > 0 ? (
                            <div className="text-sm text-red-600 font-medium">
                              Umumiy qarz: {student.debt.toLocaleString()} so'm
                            </div>
                          ) : (
                            <div className="text-sm text-green-600">Barcha to'lovlar amalga oshirilgan</div>
                          )}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Davomat</h3>
                        <div className="flex items-center gap-2">
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
                          <span className="text-sm text-muted-foreground">
                            ({student.attendance_records.filter((r) => r.status === "present").length}/
                            {student.attendance_records.length} dars)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="attendance" className="space-y-4">
              {/* Davomat filtrlash */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Dars, sana yoki izoh bo'yicha qidirish..."
                    value={attendanceSearch}
                    onChange={(e) => setAttendanceSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Guruh" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Barcha guruhlar</SelectItem>
                    {student.groups.map((group) => (
                      <SelectItem key={group.groupId} value={group.groupId}>
                        {group.groupName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={attendanceFilter} onValueChange={setAttendanceFilter}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filtr" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Barchasi</SelectItem>
                    <SelectItem value="this-month">Shu oy</SelectItem>
                    <SelectItem value="last-month">O'tgan oy</SelectItem>
                    <SelectItem value="this-year">Shu yil</SelectItem>
                    <SelectItem value="present">Kelganlar</SelectItem>
                    <SelectItem value="absent">Kelmaganlar</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Eksport
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Davomat tarixi</CardTitle>
                  <CardDescription>
                    {filteredAttendance.length} ta dars topildi. Davomat: {filteredAttendancePercentage}% (
                    {presentCount}/{totalFilteredClasses})
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Sana</TableHead>
                        <TableHead>Guruh</TableHead>
                        <TableHead>Dars mavzusi</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Izoh</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAttendance.map((record, index) => {
                        const group = student.groups.find((g) => g.groupId === record.groupId)
                        return (
                          <TableRow key={index}>
                            <TableCell>{new Date(record.date).toLocaleDateString("uz-UZ")}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="text-xs">
                                {group?.groupName || record.groupId}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-medium">{record.lesson}</TableCell>
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
                        )
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payments" className="space-y-4">
              {/* To'lovlar filtrlash */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="To'lov, guruh, sana yoki summa bo'yicha qidirish..."
                    value={paymentSearch}
                    onChange={(e) => setPaymentSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Guruh" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Barcha guruhlar</SelectItem>
                    {student.groups.map((group) => (
                      <SelectItem key={group.groupId} value={group.groupId}>
                        {group.groupName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filtr" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Barchasi</SelectItem>
                    <SelectItem value="this-month">Shu oy</SelectItem>
                    <SelectItem value="last-month">O'tgan oy</SelectItem>
                    <SelectItem value="this-year">Shu yil</SelectItem>
                    <SelectItem value="paid">To'langan</SelectItem>
                    <SelectItem value="unpaid">To'lanmagan</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Eksport
                </Button>
              </div>

              {/* Guruh bo'yicha to'lov statistikasi */}
              <div className="grid gap-4 md:grid-cols-2">
                {student.groups.map((group) => {
                  const groupPayment = student.groupPayments?.[group.groupId]
                  if (!groupPayment) return null

                  return (
                    <Card key={group.groupId}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{group.groupName}</CardTitle>
                        <CardDescription>{group.subject}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Oylik to'lov:</span>
                            <span className="font-medium">{group.fee.toLocaleString()} so'm</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Jami to'langan:</span>
                            <span className="font-medium text-green-600">
                              {groupPayment.paidAmount.toLocaleString()} so'm
                            </span>
                          </div>
                          {groupPayment.debt > 0 && (
                            <div className="flex justify-between">
                              <span>Qarz:</span>
                              <span className="font-medium text-red-600">
                                {groupPayment.debt.toLocaleString()} so'm
                              </span>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <span>To'lovlar soni:</span>
                            <span className="font-medium">{groupPayment.payments.length} ta</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>To'lovlar tarixi</CardTitle>
                  <CardDescription>
                    {filteredPayments.length} ta to'lov topildi. Jami to'langan: {totalPaid.toLocaleString()} so'm
                    {totalUnpaid > 0 && `, Qarz: ${totalUnpaid.toLocaleString()} so'm`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Sana</TableHead>
                        <TableHead>Guruh</TableHead>
                        <TableHead>Summa</TableHead>
                        <TableHead>Usul</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Tavsif</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPayments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-mono">{payment.id}</TableCell>
                          <TableCell>{payment.date}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs">
                              {payment.groupName}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">
                            {payment.amount > 0 ? `${payment.amount.toLocaleString()} so'm` : "0 so'm"}
                          </TableCell>
                          <TableCell>{payment.method}</TableCell>
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
                          <TableCell className="max-w-xs truncate">{payment.description}</TableCell>
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
