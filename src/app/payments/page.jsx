    "use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, Search, DollarSign, Send } from "lucide-react"
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
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import Link from "next/link"

// Sample data
const groups = [
  { id: "GRP001", name: "Elementary A1", teacher: "Aziza Karimova" },
  { id: "GRP002", name: "Elementary A2", teacher: "Bobur Aliyev" },
  { id: "GRP003", name: "Intermediate B1", teacher: "Dilnoza Rahimova" },
  { id: "GRP004", name: "Intermediate B2", teacher: "Eldor Toshmatov" },
  { id: "GRP005", name: "Advanced C1", teacher: "Feruza Kamalova" },
  { id: "GRP006", name: "IELTS Preparation", teacher: "Gulnora Saidova" },
]

const students = {
  all: [
    { id: "STD001", name: "Alisher Zokirov", group: "Elementary A1", paymentStatus: "paid", lastPayment: "01.03.2023" },
    { id: "STD002", name: "Malika Karimova", group: "Elementary A2", paymentStatus: "paid", lastPayment: "05.03.2023" },
    { id: "STD003", name: "Jasur Toshmatov", group: "Advanced C1", paymentStatus: "paid", lastPayment: "03.03.2023" },
    {
      id: "STD004",
      name: "Nilufar Rahimova",
      group: "Intermediate B2",
      paymentStatus: "debt",
      lastPayment: "10.02.2023",
    },
    { id: "STD005", name: "Bobur Alimov", group: "Elementary A1", paymentStatus: "paid", lastPayment: "02.03.2023" },
    {
      id: "STD006",
      name: "Zarina Umarova",
      group: "Intermediate B1",
      paymentStatus: "debt",
      lastPayment: "15.02.2023",
    },
    { id: "STD007", name: "Sardor Kamolov", group: "Elementary A2", paymentStatus: "paid", lastPayment: "04.03.2023" },
    { id: "STD008", name: "Dilnoza Saidova", group: "Advanced C1", paymentStatus: "paid", lastPayment: "06.03.2023" },
    { id: "STD012", name: "Rustam Kamolov", group: "Elementary A2", paymentStatus: "debt", lastPayment: "20.02.2023" },
    { id: "STD018", name: "Dilshod Rahimov", group: "Advanced C1", paymentStatus: "debt", lastPayment: "10.02.2023" },
    {
      id: "STD024",
      name: "Kamola Saidova",
      group: "Intermediate B2",
      paymentStatus: "debt",
      lastPayment: "25.02.2023",
    },
    { id: "STD030", name: "Jahongir Alimov", group: "Elementary A1", paymentStatus: "debt", lastPayment: "18.02.2023" },
  ],
  debt: [
    {
      id: "STD004",
      name: "Nilufar Rahimova",
      group: "Intermediate B2",
      paymentStatus: "debt",
      lastPayment: "10.02.2023",
      debtAmount: 450000,
      debtDays: 20,
    },
    {
      id: "STD006",
      name: "Zarina Umarova",
      group: "Intermediate B1",
      paymentStatus: "debt",
      lastPayment: "15.02.2023",
      debtAmount: 450000,
      debtDays: 15,
    },
    {
      id: "STD012",
      name: "Rustam Kamolov",
      group: "Elementary A2",
      paymentStatus: "debt",
      lastPayment: "20.02.2023",
      debtAmount: 350000,
      debtDays: 10,
    },
    {
      id: "STD018",
      name: "Dilshod Rahimov",
      group: "Advanced C1",
      paymentStatus: "debt",
      lastPayment: "10.02.2023",
      debtAmount: 550000,
      debtDays: 20,
    },
    {
      id: "STD024",
      name: "Kamola Saidova",
      group: "Intermediate B2",
      paymentStatus: "debt",
      lastPayment: "25.02.2023",
      debtAmount: 250000,
      debtDays: 5,
    },
    {
      id: "STD030",
      name: "Jahongir Alimov",
      group: "Elementary A1",
      paymentStatus: "debt",
      lastPayment: "18.02.2023",
      debtAmount: 450000,
      debtDays: 12,
    },
  ],
}

const paymentHistory = [
  {
    id: "PAY001",
    studentId: "STD001",
    studentName: "Alisher Zokirov",
    group: "Elementary A1",
    amount: 450000,
    date: "01.03.2023",
    method: "Naqd",
    comment: "",
  },
  {
    id: "PAY002",
    studentId: "STD002",
    studentName: "Malika Karimova",
    group: "Elementary A2",
    amount: 450000,
    date: "05.03.2023",
    method: "Karta",
    comment: "",
  },
  {
    id: "PAY003",
    studentId: "STD003",
    studentName: "Jasur Toshmatov",
    group: "Advanced C1",
    amount: 550000,
    date: "03.03.2023",
    method: "Naqd",
    comment: "",
  },
  {
    id: "PAY004",
    studentId: "STD005",
    studentName: "Bobur Alimov",
    group: "Elementary A1",
    amount: 450000,
    date: "02.03.2023",
    method: "Karta",
    comment: "",
  },
  {
    id: "PAY005",
    studentId: "STD007",
    studentName: "Sardor Kamolov",
    group: "Elementary A2",
    amount: 450000,
    date: "04.03.2023",
    method: "Naqd",
    comment: "",
  },
  {
    id: "PAY006",
    studentId: "STD008",
    studentName: "Dilnoza Saidova",
    group: "Advanced C1",
    amount: 550000,
    date: "06.03.2023",
    method: "Karta",
    comment: "",
  },
  {
    id: "PAY007",
    studentId: "STD001",
    studentName: "Alisher Zokirov",
    group: "Elementary A1",
    amount: 450000,
    date: "01.02.2023",
    method: "Naqd",
    comment: "",
  },
  {
    id: "PAY008",
    studentId: "STD002",
    studentName: "Malika Karimova",
    group: "Elementary A2",
    amount: 450000,
    date: "05.02.2023",
    method: "Karta",
    comment: "",
  },
  {
    id: "PAY009",
    studentId: "STD003",
    studentName: "Jasur Toshmatov",
    group: "Advanced C1",
    amount: 550000,
    date: "03.02.2023",
    method: "Naqd",
    comment: "",
  },
  {
    id: "PAY010",
    studentId: "STD005",
    studentName: "Bobur Alimov",
    group: "Elementary A1",
    amount: 450000,
    date: "02.02.2023",
    method: "Karta",
    comment: "",
  },
]

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGroup, setSelectedGroup] = useState("all")
  const [isAddPaymentDialogOpen, setIsAddPaymentDialogOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [activeTab, setActiveTab] = useState("all")
  const [selectedStudent, setSelectedStudent] = useState("")
  const [paymentAmount, setPaymentAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("Naqd")
  const [paymentComment, setPaymentComment] = useState("")
  const [isReminderDialogOpen, setIsReminderDialogOpen] = useState(false)
  const [reminderMessage, setReminderMessage] = useState("")

  const filteredStudents =
    selectedGroup === "all"
      ? students.all.filter(
          (student) =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.group.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      : students.all.filter(
          (student) =>
            student.group === groups.find((g) => g.id === selectedGroup)?.name &&
            (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              student.id.toLowerCase().includes(searchTerm.toLowerCase())),
        )

  const filteredPaymentHistory =
    selectedGroup === "all"
      ? paymentHistory.filter(
          (payment) =>
            payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.group.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      : paymentHistory.filter(
          (payment) =>
            payment.group === groups.find((g) => g.id === selectedGroup)?.name &&
            (payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
              payment.studentId.toLowerCase().includes(searchTerm.toLowerCase())),
        )

  const handleAddPayment = () => {
    // In a real application, this would save the payment data
    console.log("Payment added for student:", selectedStudent)
    console.log("Payment date:", format(selectedDate, "dd.MM.yyyy"))
    console.log("Payment amount:", paymentAmount)
    console.log("Payment method:", paymentMethod)
    console.log("Payment comment:", paymentComment)

    setIsAddPaymentDialogOpen(false)
    setSelectedStudent("")
    setPaymentAmount("")
    setPaymentMethod("Naqd")
    setPaymentComment("")
  }

  const handleSendReminder = () => {
    // In a real application, this would send a reminder via Telegram bot
    console.log("Reminder sent to students with debt")
    console.log("Reminder message:", reminderMessage)

    setIsReminderDialogOpen(false)
    setReminderMessage("")
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-3xl font-bold tracking-tight">To'lovlar</h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <Dialog open={isAddPaymentDialogOpen} onOpenChange={setIsAddPaymentDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <DollarSign className="mr-2 h-4 w-4" />
                To'lov qo'shish
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>To'lov qo'shish</DialogTitle>
                <DialogDescription>O'quvchi to'lovini tizimga kiritish</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="student">O'quvchi</Label>
                  <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                    <SelectTrigger id="student">
                      <SelectValue placeholder="O'quvchini tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      {students.all.map((student) => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.name} - {student.group}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="date">To'lov sanasi</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "dd.MM.yyyy") : "Sanani tanlang"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="amount">To'lov miqdori (so'm)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    placeholder="450000"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="method">To'lov usuli</Label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger id="method">
                      <SelectValue placeholder="To'lov usulini tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Naqd">Naqd</SelectItem>
                      <SelectItem value="Karta">Karta</SelectItem>
                      <SelectItem value="Bank o'tkazmasi">Bank o'tkazmasi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="comment">Izoh</Label>
                  <Input
                    id="comment"
                    value={paymentComment}
                    onChange={(e) => setPaymentComment(e.target.value)}
                    placeholder="Ixtiyoriy izoh"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddPaymentDialogOpen(false)}>
                  Bekor qilish
                </Button>
                <Button onClick={handleAddPayment}>Saqlash</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isReminderDialogOpen} onOpenChange={setIsReminderDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Send className="mr-2 h-4 w-4" />
                Eslatma yuborish
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>To'lov eslatmasini yuborish</DialogTitle>
                <DialogDescription>Qarzdor o'quvchilarga to'lov eslatmasini yuborish</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="message">Xabar matni</Label>
                  <Input
                    id="message"
                    value={reminderMessage}
                    onChange={(e) => setReminderMessage(e.target.value)}
                    placeholder="Hurmatli o'quvchi, to'lovni amalga oshirishni unutmang!"
                  />
                </div>
                <div className="bg-muted p-3 rounded-md">
                  <p className="text-sm font-medium">Eslatma yuboriladi:</p>
                  <p className="text-sm text-muted-foreground">Jami {students.debt.length} ta qarzdor o'quvchi</p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsReminderDialogOpen(false)}>
                  Bekor qilish
                </Button>
                <Button onClick={handleSendReminder}>Yuborish</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
        <div className="relative w-full sm:w-[300px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Qidirish..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={selectedGroup} onValueChange={setSelectedGroup}>
          <SelectTrigger className="w-full sm:w-[250px]">
            <SelectValue placeholder="Guruhni tanlang" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Barcha guruhlar</SelectItem>
            {groups.map((group) => (
              <SelectItem key={group.id} value={group.id}>
                {group.name} - {group.teacher}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="all">Barcha o'quvchilar</TabsTrigger>
          <TabsTrigger value="debt">Qarzdorlar</TabsTrigger>
          <TabsTrigger value="history">To'lovlar tarixi</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>O'quvchilar to'lov holati</CardTitle>
              <CardDescription>Barcha o'quvchilarning to'lov holati</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>O'quvchi</TableHead>
                      <TableHead>Guruh</TableHead>
                      <TableHead>To'lov holati</TableHead>
                      <TableHead>Oxirgi to'lov</TableHead>
                      <TableHead>Amallar</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{student.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{student.name}</div>
                            </div>
                          </div>
                        </TableCell>
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
                        <TableCell>{student.lastPayment}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/students/${student.id}`}>Batafsil</Link>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedStudent(student.id)
                                setIsAddPaymentDialogOpen(true)
                              }}
                            >
                              To'lov
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="debt">
          <Card>
            <CardHeader>
              <CardTitle>Qarzdor o'quvchilar</CardTitle>
              <CardDescription>To'lov muddati o'tgan o'quvchilar ro'yxati</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>O'quvchi</TableHead>
                      <TableHead>Guruh</TableHead>
                      <TableHead>Qarz miqdori</TableHead>
                      <TableHead>Qarz muddati</TableHead>
                      <TableHead>Oxirgi to'lov</TableHead>
                      <TableHead>Amallar</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.debt
                      .filter(
                        (student) =>
                          selectedGroup === "all" || student.group === groups.find((g) => g.id === selectedGroup)?.name,
                      )
                      .filter(
                        (student) =>
                          student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.group.toLowerCase().includes(searchTerm.toLowerCase()),
                      )
                      .map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">{student.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>{student.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{student.name}</div>
                              </div>
                            </div>
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
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedStudent(student.id)
                                  setIsAddPaymentDialogOpen(true)
                                }}
                              >
                                To'lov
                              </Button>
                              <Button variant="outline" size="sm">
                                <Send className="h-4 w-4" />
                                <span className="sr-only">Xabar yuborish</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>To'lovlar tarixi</CardTitle>
              <CardDescription>Barcha to'lovlar tarixi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>O'quvchi</TableHead>
                      <TableHead>Guruh</TableHead>
                      <TableHead>Miqdor</TableHead>
                      <TableHead>Sana</TableHead>
                      <TableHead>To'lov usuli</TableHead>
                      <TableHead>Amallar</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPaymentHistory.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{payment.studentName.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{payment.studentName}</div>
                              <div className="text-xs text-muted-foreground">{payment.studentId}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{payment.group}</TableCell>
                        <TableCell>{payment.amount.toLocaleString()} so'm</TableCell>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {payment.method}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            Chek
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

