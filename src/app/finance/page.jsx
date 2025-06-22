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
import { CalendarIcon, Search, DollarSign, TrendingUp, TrendingDown, Plus, CreditCard } from "lucide-react"
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
import { FinanceChart } from "@/components/finance-chart"

// Sample data
const teacherSalaries = [
  {
    id: "TCH001",
    name: "Aziza Karimova",
    subject: "Ingliz tili",
    groups: 2,
    students: 25,
    hoursPerWeek: 18,
    salaryType: "percentage",
    percentage: 15,
    expectedSalary: 1687500,
    paidAmount: 1687500,
    remainingAmount: 0,
    status: "paid",
    lastPayment: "15.03.2023",
  },
  {
    id: "TCH002",
    name: "Bobur Aliyev",
    subject: "Matematika",
    groups: 2,
    students: 22,
    hoursPerWeek: 18,
    salaryType: "percentage",
    percentage: 12,
    expectedSalary: 1188000,
    paidAmount: 800000,
    remainingAmount: 388000,
    status: "partial",
    lastPayment: "10.03.2023",
  },
  {
    id: "TCH003",
    name: "Dilnoza Rahimova",
    subject: "Ingliz tili",
    groups: 1,
    students: 8,
    hoursPerWeek: 9,
    salaryType: "percentage",
    percentage: 15,
    expectedSalary: 540000,
    paidAmount: 0,
    remainingAmount: 540000,
    status: "pending",
    lastPayment: null,
  },
  {
    id: "TCH004",
    name: "Eldor Toshmatov",
    subject: "Matematika",
    groups: 1,
    students: 9,
    hoursPerWeek: 9,
    salaryType: "fixed",
    percentage: 0,
    expectedSalary: 900000,
    paidAmount: 900000,
    remainingAmount: 0,
    status: "paid",
    lastPayment: "12.03.2023",
  },
]

const expenses = [
  { id: 1, category: "Ijara", amount: 5000000, date: "01.03.2023", description: "Bino ijarasi", status: "paid" },
  { id: 2, category: "Kommunal", amount: 800000, date: "05.03.2023", description: "Elektr, suv, gaz", status: "paid" },
  { id: 3, category: "Internet", amount: 300000, date: "10.03.2023", description: "Internet xizmati", status: "paid" },
  {
    id: 4,
    category: "Tozalash",
    amount: 400000,
    date: "15.03.2023",
    description: "Tozalash xizmatlari",
    status: "paid",
  },
  {
    id: 5,
    category: "Xavfsizlik",
    amount: 600000,
    date: "20.03.2023",
    description: "Xavfsizlik xizmati",
    status: "pending",
  },
  { id: 6, category: "Reklama", amount: 1200000, date: "25.03.2023", description: "Online reklama", status: "paid" },
  {
    id: 7,
    category: "Jihozlar",
    amount: 2500000,
    date: "28.03.2023",
    description: "Yangi kompyuterlar",
    status: "pending",
  },
  {
    id: 8,
    category: "Kirtasiya",
    amount: 150000,
    date: "30.03.2023",
    description: "Daftar, qalam va boshqalar",
    status: "paid",
  },
]

const salaryPayments = [
  {
    id: 1,
    teacherId: "TCH001",
    teacherName: "Aziza Karimova",
    amount: 1687500,
    date: "15.03.2023",
    method: "Naqd",
    note: "To'liq maosh",
  },
  {
    id: 2,
    teacherId: "TCH002",
    teacherName: "Bobur Aliyev",
    amount: 800000,
    date: "10.03.2023",
    method: "Karta",
    note: "Qisman to'lov",
  },
  {
    id: 3,
    teacherId: "TCH004",
    teacherName: "Eldor Toshmatov",
    amount: 900000,
    date: "12.03.2023",
    method: "Bank",
    note: "To'liq maosh",
  },
]

const monthlyIncome = 24500000 // Total student payments
const totalExpectedSalaries = teacherSalaries.reduce((sum, teacher) => sum + teacher.expectedSalary, 0)
const totalPaidSalaries = teacherSalaries.reduce((sum, teacher) => sum + teacher.paidAmount, 0)
const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
const totalPaidExpenses = expenses.filter((e) => e.status === "paid").reduce((sum, expense) => sum + expense.amount, 0)
const netProfit = monthlyIncome - totalPaidSalaries - totalPaidExpenses

export default function FinancePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMonth, setSelectedMonth] = useState(new Date())
  const [activeTab, setActiveTab] = useState("overview")
  const [isPaySalaryDialogOpen, setIsPaySalaryDialogOpen] = useState(false)
  const [isAddExpenseDialogOpen, setIsAddExpenseDialogOpen] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState(null)
  const [paymentAmount, setPaymentAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("Naqd")
  const [paymentNote, setPaymentNote] = useState("")
  const [newExpense, setNewExpense] = useState({
    category: "",
    amount: "",
    description: "",
    date: new Date(),
  })

  const handlePaySalary = () => {
    console.log("Paying salary:", {
      teacherId: selectedTeacher?.id,
      amount: paymentAmount,
      method: paymentMethod,
      note: paymentNote,
    })
    setIsPaySalaryDialogOpen(false)
    setSelectedTeacher(null)
    setPaymentAmount("")
    setPaymentNote("")
  }

  const handleAddExpense = () => {
    console.log("Adding expense:", newExpense)
    setIsAddExpenseDialogOpen(false)
    setNewExpense({ category: "", amount: "", description: "", date: new Date() })
  }

  const filteredTeachers = teacherSalaries.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredExpenses = expenses.filter(
    (expense) =>
      expense.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Moliya boshqaruvi</h2>
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedMonth ? format(selectedMonth, "MMMM yyyy") : "Oyni tanlang"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={selectedMonth} onSelect={setSelectedMonth} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jami daromad</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{monthlyIncome.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">O'quvchilardan to'lovlar</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maosh to'lovlari</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{totalPaidSalaries.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {totalExpectedSalaries - totalPaidSalaries > 0 &&
                `Qolgan: ${(totalExpectedSalaries - totalPaidSalaries).toLocaleString()}`}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Boshqa xarajatlar</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{totalPaidExpenses.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {totalExpenses - totalPaidExpenses > 0 &&
                `Qolgan: ${(totalExpenses - totalPaidExpenses).toLocaleString()}`}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sof foyda</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${netProfit >= 0 ? "text-green-600" : "text-red-600"}`}>
              {netProfit.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((netProfit / monthlyIncome) * 100)}% foyda marjasi
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Qarzlar</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {(totalExpectedSalaries - totalPaidSalaries + totalExpenses - totalPaidExpenses).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">To'lanmagan summalar</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="overview">Umumiy</TabsTrigger>
          <TabsTrigger value="salaries">Maoshlar</TabsTrigger>
          <TabsTrigger value="expenses">Xarajatlar</TabsTrigger>
          <TabsTrigger value="payments">To'lovlar</TabsTrigger>
          <TabsTrigger value="reports">Hisobotlar</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Moliyaviy ko'rsatkichlar</CardTitle>
                <CardDescription>Oxirgi 6 oy davomida moliyaviy ko'rsatkichlar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <FinanceChart
                    data={[
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
                    ]}
                  />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Xarajatlar taqsimoti</CardTitle>
                <CardDescription>Oylik xarajatlarning kategoriyalar bo'yicha taqsimoti</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>O'qituvchi maoshlari</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${(totalPaidSalaries / (totalPaidSalaries + totalPaidExpenses)) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{totalPaidSalaries.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Boshqa xarajatlar</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-red-600 h-2 rounded-full"
                          style={{
                            width: `${(totalPaidExpenses / (totalPaidSalaries + totalPaidExpenses)) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{totalPaidExpenses.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Sof foyda</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{
                            width: `${Math.max(0, netProfit / monthlyIncome) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-green-600">{netProfit.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="salaries">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <CardTitle>O'qituvchi maoshlari</CardTitle>
                  <CardDescription>O'qituvchilarning oylik maosh ma'lumotlari va to'lovlar</CardDescription>
                </div>
                <div className="relative w-full sm:w-[300px]">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="O'qituvchi qidirish..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>O'qituvchi</TableHead>
                      <TableHead>Fan</TableHead>
                      <TableHead>O'quvchilar</TableHead>
                      <TableHead>Maosh turi</TableHead>
                      <TableHead>Kutilgan maosh</TableHead>
                      <TableHead>To'langan</TableHead>
                      <TableHead>Qolgan</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Amallar</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTeachers.map((teacher) => (
                      <TableRow key={teacher.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{teacher.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{teacher.name}</div>
                              <div className="text-xs text-muted-foreground">{teacher.id}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{teacher.subject}</TableCell>
                        <TableCell>{teacher.students}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {teacher.salaryType === "percentage" ? `${teacher.percentage}% foiz` : "Qat'iy maosh"}
                          </Badge>
                        </TableCell>
                        <TableCell>{teacher.expectedSalary.toLocaleString()}</TableCell>
                        <TableCell className="text-green-600 font-medium">
                          {teacher.paidAmount.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-red-600 font-medium">
                          {teacher.remainingAmount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              teacher.status === "paid"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : teacher.status === "partial"
                                  ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                  : "bg-red-50 text-red-700 border-red-200"
                            }
                          >
                            {teacher.status === "paid"
                              ? "To'langan"
                              : teacher.status === "partial"
                                ? "Qisman"
                                : "Kutilmoqda"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedTeacher(teacher)
                              setPaymentAmount(teacher.remainingAmount.toString())
                              setIsPaySalaryDialogOpen(true)
                            }}
                            disabled={teacher.remainingAmount === 0}
                          >
                            <CreditCard className="mr-2 h-4 w-4" />
                            To'lov
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Salary Payment Dialog */}
          <Dialog open={isPaySalaryDialogOpen} onOpenChange={setIsPaySalaryDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Maosh to'lash</DialogTitle>
                <DialogDescription>{selectedTeacher?.name} uchun maosh to'lovi</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>O'qituvchi</Label>
                  <div className="p-2 bg-muted rounded">{selectedTeacher?.name}</div>
                </div>
                <div className="grid gap-2">
                  <Label>Qolgan summa</Label>
                  <div className="p-2 bg-muted rounded">{selectedTeacher?.remainingAmount.toLocaleString()} so'm</div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="paymentAmount">To'lov summasi (so'm)</Label>
                  <Input
                    id="paymentAmount"
                    type="number"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    placeholder="1000000"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="paymentMethod">To'lov usuli</Label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger id="paymentMethod">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Naqd">Naqd pul</SelectItem>
                      <SelectItem value="Karta">Bank kartasi</SelectItem>
                      <SelectItem value="Bank">Bank o'tkazmasi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="paymentNote">Izoh</Label>
                  <Input
                    id="paymentNote"
                    value={paymentNote}
                    onChange={(e) => setPaymentNote(e.target.value)}
                    placeholder="To'lov izohi"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsPaySalaryDialogOpen(false)}>
                  Bekor qilish
                </Button>
                <Button onClick={handlePaySalary}>To'lov qilish</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>

        <TabsContent value="expenses">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <CardTitle>Xarajatlar</CardTitle>
                  <CardDescription>Markaz xarajatlari va kommunal to'lovlar</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative w-full sm:w-[300px]">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Xarajat qidirish..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Dialog open={isAddExpenseDialogOpen} onOpenChange={setIsAddExpenseDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Xarajat qo'shish
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Yangi xarajat qo'shish</DialogTitle>
                        <DialogDescription>Xarajat ma'lumotlarini kiriting</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="category">Kategoriya</Label>
                          <Select
                            value={newExpense.category}
                            onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}
                          >
                            <SelectTrigger id="category">
                              <SelectValue placeholder="Kategoriyani tanlang" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Ijara">Ijara</SelectItem>
                              <SelectItem value="Kommunal">Kommunal</SelectItem>
                              <SelectItem value="Internet">Internet</SelectItem>
                              <SelectItem value="Tozalash">Tozalash</SelectItem>
                              <SelectItem value="Xavfsizlik">Xavfsizlik</SelectItem>
                              <SelectItem value="Reklama">Reklama</SelectItem>
                              <SelectItem value="Jihozlar">Jihozlar</SelectItem>
                              <SelectItem value="Kirtasiya">Kirtasiya</SelectItem>
                              <SelectItem value="Transport">Transport</SelectItem>
                              <SelectItem value="Boshqa">Boshqa</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="amount">Summa (so'm)</Label>
                          <Input
                            id="amount"
                            type="number"
                            value={newExpense.amount}
                            onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                            placeholder="1000000"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="description">Tavsif</Label>
                          <Input
                            id="description"
                            value={newExpense.description}
                            onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                            placeholder="Xarajat tavsifi"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="date">Sana</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-full justify-start text-left font-normal">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {newExpense.date ? format(newExpense.date, "dd.MM.yyyy") : "Sanani tanlang"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={newExpense.date}
                                onSelect={(date) => setNewExpense({ ...newExpense, date })}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddExpenseDialogOpen(false)}>
                          Bekor qilish
                        </Button>
                        <Button onClick={handleAddExpense}>Qo'shish</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Kategoriya</TableHead>
                      <TableHead>Summa</TableHead>
                      <TableHead>Sana</TableHead>
                      <TableHead>Tavsif</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Amallar</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredExpenses.map((expense) => (
                      <TableRow key={expense.id}>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {expense.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{expense.amount.toLocaleString()} so'm</TableCell>
                        <TableCell>{expense.date}</TableCell>
                        <TableCell>{expense.description}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              expense.status === "paid"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : "bg-yellow-50 text-yellow-700 border-yellow-200"
                            }
                          >
                            {expense.status === "paid" ? "To'langan" : "Kutilmoqda"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            Tahrirlash
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

        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>To'lov tarixi</CardTitle>
              <CardDescription>O'qituvchilarga qilingan to'lovlar tarixi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>O'qituvchi</TableHead>
                      <TableHead>Summa</TableHead>
                      <TableHead>Sana</TableHead>
                      <TableHead>To'lov usuli</TableHead>
                      <TableHead>Izoh</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salaryPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.teacherName}</TableCell>
                        <TableCell>{payment.amount.toLocaleString()} so'm</TableCell>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{payment.method}</Badge>
                        </TableCell>
                        <TableCell>{payment.note}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Oylik hisobot</CardTitle>
                <CardDescription>Joriy oy uchun moliyaviy hisobot</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Jami daromad:</span>
                    <span className="font-medium text-green-600">{monthlyIncome.toLocaleString()} so'm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>O'qituvchi maoshlari:</span>
                    <span className="font-medium text-red-600">-{totalPaidSalaries.toLocaleString()} so'm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Boshqa xarajatlar:</span>
                    <span className="font-medium text-red-600">-{totalPaidExpenses.toLocaleString()} so'm</span>
                  </div>
                  <hr />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Sof foyda:</span>
                    <span className={netProfit >= 0 ? "text-green-600" : "text-red-600"}>
                      {netProfit.toLocaleString()} so'm
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Foyda marjasi:</span>
                    <span className="font-medium">{Math.round((netProfit / monthlyIncome) * 100)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Hisobotlarni eksport qilish</CardTitle>
                <CardDescription>Moliyaviy hisobotlarni turli formatlarda yuklab olish</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="w-full">PDF hisobot yuklab olish</Button>
                  <Button variant="outline" className="w-full">
                    Excel hisobot yuklab olish
                  </Button>
                  <Button variant="outline" className="w-full">
                    O'qituvchi maoshlari hisoboti
                  </Button>
                  <Button variant="outline" className="w-full">
                    Xarajatlar hisoboti
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
