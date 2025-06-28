"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter, MoreHorizontal, Eye, Edit, Pause, Play } from "lucide-react"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

export default function StudentsPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [editingStudent, setEditingStudent] = useState(null)

  const [newStudent, setNewStudent] = useState({
    name: "",
    phone: "",
    birthDate: "",
    address: "",
    groups: [],
    discountDuration: 1, // 1 yoki 2 oy
  })

  // Mavjud guruhlar
  const availableGroups = [
    { id: "eng-a1", name: "Elementary A1", subject: "Ingliz tili", fee: 450000 },
    { id: "eng-a2", name: "Elementary A2", subject: "Ingliz tili", fee: 450000 },
    { id: "eng-b1", name: "Intermediate B1", subject: "Ingliz tili", fee: 450000 },
    { id: "ielts", name: "IELTS Preparation", subject: "IELTS", fee: 600000 },
    { id: "math-7", name: "Matematika 7-sinf", subject: "Matematika", fee: 400000 },
    { id: "math-8", name: "Matematika 8-sinf", subject: "Matematika", fee: 400000 },
    { id: "physics-9", name: "Fizika 9-sinf", subject: "Fizika", fee: 350000 },
    { id: "chemistry-10", name: "Kimyo 10-sinf", subject: "Kimyo", fee: 350000 },
  ]

  // Mock data - o'quvchilar ro'yxati
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Akmal Karimov",
      phone: "+998 90 123 45 67",
      groups: [{ groupId: "eng-a1", groupName: "Elementary A1", subject: "Ingliz tili", fee: 450000 }],
      birthDate: "2005-03-15",
      address: "Toshkent, Chilonzor tumani",
      joinDate: "2024-01-15",
      status: "Faol",
      totalFee: 450000,
      paidAmount: 450000,
      debt: 0,
      attendance: 95,
      lastAttendance: "2024-01-30",
      discountDuration: 1,
      discountStartDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Malika Saidova",
      phone: "+998 91 234 56 78",
      groups: [
        { groupId: "eng-b1", groupName: "Intermediate B1", subject: "Ingliz tili", fee: 450000 },
        { groupId: "ielts", groupName: "IELTS Preparation", subject: "IELTS", fee: 600000 },
      ],
      birthDate: "2004-07-22",
      address: "Toshkent, Yunusobod tumani",
      joinDate: "2024-01-10",
      status: "Faol",
      totalFee: 945000, // 2 ta guruh uchun 10% chegirma
      paidAmount: 945000,
      debt: 0,
      attendance: 88,
      lastAttendance: "2024-01-29",
      discountDuration: 2,
      discountStartDate: "2024-01-10",
    },
    {
      id: 3,
      name: "Sardor Rahimov",
      phone: "+998 93 345 67 89",
      groups: [{ groupId: "math-8", groupName: "Matematika 8-sinf", subject: "Matematika", fee: 400000 }],
      birthDate: "2006-11-08",
      address: "Toshkent, Mirzo Ulug'bek tumani",
      joinDate: "2024-01-20",
      status: "Faol",
      totalFee: 400000,
      paidAmount: 400000,
      debt: 0,
      attendance: 92,
      lastAttendance: "2024-01-30",
      discountDuration: 1,
      discountStartDate: "2024-01-20",
    },
    {
      id: 4,
      name: "Nilufar Tosheva",
      phone: "+998 94 456 78 90",
      groups: [{ groupId: "ielts", groupName: "IELTS Preparation", subject: "IELTS", fee: 600000 }],
      birthDate: "2003-05-12",
      address: "Toshkent, Shayxontohur tumani",
      joinDate: "2024-01-05",
      status: "Faol",
      totalFee: 600000,
      paidAmount: 510000,
      debt: 90000,
      attendance: 85,
      lastAttendance: "2024-01-28",
      discountDuration: 1,
      discountStartDate: "2024-01-05",
    },
    {
      id: 5,
      name: "Jasur Alimov",
      phone: "+998 95 567 89 01",
      groups: [
        { groupId: "physics-9", groupName: "Fizika 9-sinf", subject: "Fizika", fee: 350000 },
        { groupId: "math-8", groupName: "Matematika 8-sinf", subject: "Matematika", fee: 400000 },
      ],
      birthDate: "2005-09-30",
      address: "Toshkent, Sergeli tumani",
      joinDate: "2024-01-12",
      status: "Faol",
      totalFee: 675000, // 2 ta guruh uchun 10% chegirma
      paidAmount: 500000,
      debt: 175000,
      attendance: 78,
      lastAttendance: "2024-01-25",
      discountDuration: 1,
      discountStartDate: "2024-01-12",
    },
    {
      id: 6,
      name: "Zarina Nazarova",
      phone: "+998 97 678 90 12",
      groups: [{ groupId: "eng-a2", groupName: "Elementary A2", subject: "Ingliz tili", fee: 450000 }],
      birthDate: "2006-01-18",
      address: "Toshkent, Olmazor tumani",
      joinDate: "2024-01-08",
      status: "Muzlatilgan",
      totalFee: 450000,
      paidAmount: 22500,
      debt: 427500,
      attendance: 0,
      lastAttendance: "2024-01-10",
      discountDuration: 1,
      discountStartDate: "2024-01-08",
    },
    {
      id: 7,
      name: "Bobur Yusupov",
      phone: "+998 98 789 01 23",
      groups: [{ groupId: "eng-a1", groupName: "Elementary A1", subject: "Ingliz tili", fee: 450000 }],
      birthDate: "2005-12-03",
      address: "Toshkent, Bektemir tumani",
      joinDate: "2024-01-25",
      status: "Faol",
      totalFee: 450000,
      paidAmount: 450000,
      debt: 0,
      attendance: 45,
      lastAttendance: "2024-01-20",
      discountDuration: 1,
      discountStartDate: "2024-01-25",
    },
  ])

  // Chegirma hisoblash funksiyasi
  const calculateDiscount = (groupsCount) => {
    if (groupsCount >= 3) return 20 // 3+ guruh uchun 20%
    if (groupsCount === 2) return 10 // 2 guruh uchun 10%
    return 0 // 1 guruh uchun chegirma yo'q
  }

  // Chegirma amal qilish muddatini tekshirish
  const isDiscountActive = (student) => {
    const startDate = new Date(student.discountStartDate)
    const currentDate = new Date()
    const monthsDiff =
      (currentDate.getFullYear() - startDate.getFullYear()) * 12 + (currentDate.getMonth() - startDate.getMonth())
    return monthsDiff < student.discountDuration
  }

  // Jami to'lov hisoblash
  const calculateTotalFee = (groups, discountDuration = 1, discountStartDate = new Date().toISOString()) => {
    const totalWithoutDiscount = groups.reduce((sum, group) => sum + group.fee, 0)
    const discount = calculateDiscount(groups.length)

    // Chegirma muddatini tekshirish
    const startDate = new Date(discountStartDate)
    const currentDate = new Date()
    const monthsDiff =
      (currentDate.getFullYear() - startDate.getFullYear()) * 12 + (currentDate.getMonth() - startDate.getMonth())

    if (monthsDiff < discountDuration && discount > 0) {
      return totalWithoutDiscount * (1 - discount / 100)
    }

    return totalWithoutDiscount
  }

  // Filtrlash
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.phone.includes(searchTerm) ||
      student.groups.some(
        (group) =>
          group.groupName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          group.subject.toLowerCase().includes(searchTerm.toLowerCase()),
      )

    let matchesFilter = true
    switch (filterStatus) {
      case "active":
        matchesFilter = student.status === "Faol"
        break
      case "frozen":
        matchesFilter = student.status === "Muzlatilgan"
        break
      case "debtors":
        matchesFilter = student.debt > 0
        break
      case "low-attendance":
        matchesFilter = student.attendance < 70
        break
      case "absent":
        const daysSinceLastAttendance = Math.floor(
          (new Date() - new Date(student.lastAttendance)) / (1000 * 60 * 60 * 24),
        )
        matchesFilter = daysSinceLastAttendance > 7
        break
      default:
        matchesFilter = true
    }

    return matchesSearch && matchesFilter
  })

  // Statistika
  const stats = [
    {
      title: "Jami o'quvchilar",
      value: students.length,
      description: "Barcha o'quvchilar soni",
    },
    {
      title: "Faol o'quvchilar",
      value: students.filter((s) => s.status === "Faol").length,
      description: "Hozirda o'qiyotgan o'quvchilar",
    },
    {
      title: "Qarzdorlar",
      value: students.filter((s) => s.debt > 0).length,
      description: "Qarzli o'quvchilar soni",
    },
    {
      title: "Davomat zo'rlari",
      value: students.filter((s) => s.attendance < 70).length,
      description: "70% dan past davomat",
    },
  ]

  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.phone || newStudent.groups.length === 0) {
      alert("Majburiy maydonlarni to'ldiring!")
      return
    }

    const currentDate = new Date().toISOString().split("T")[0]
    const totalFee = calculateTotalFee(newStudent.groups, newStudent.discountDuration, currentDate)
    const studentToAdd = {
      id: Date.now(),
      ...newStudent,
      joinDate: currentDate,
      status: "Faol",
      totalFee,
      paidAmount: 0,
      debt: totalFee,
      attendance: 100,
      lastAttendance: currentDate,
      discountStartDate: currentDate,
    }

    setStudents([...students, studentToAdd])
    setIsAddDialogOpen(false)
    setNewStudent({ name: "", phone: "", birthDate: "", address: "", groups: [], discountDuration: 1 })
  }

  const handleEditStudent = () => {
    if (!editingStudent.name || !editingStudent.phone || editingStudent.groups.length === 0) {
      alert("Majburiy maydonlarni to'ldiring!")
      return
    }

    const totalFee = calculateTotalFee(
      editingStudent.groups,
      editingStudent.discountDuration,
      editingStudent.discountStartDate,
    )
    const updatedStudent = {
      ...editingStudent,
      totalFee,
      debt: Math.max(0, totalFee - editingStudent.paidAmount),
    }

    setStudents(students.map((s) => (s.id === editingStudent.id ? updatedStudent : s)))
    setIsEditDialogOpen(false)
    setEditingStudent(null)
  }

  const toggleStudentStatus = (studentId) => {
    setStudents(
      students.map((student) =>
        student.id === studentId ? { ...student, status: student.status === "Faol" ? "Muzlatilgan" : "Faol" } : student,
      ),
    )
  }

  const handleGroupToggle = (groupId, isEdit = false) => {
    const group = availableGroups.find((g) => g.id === groupId)
    const currentStudent = isEdit ? editingStudent : newStudent
    const setCurrentStudent = isEdit ? setEditingStudent : setNewStudent

    const isSelected = currentStudent.groups.some((g) => g.groupId === groupId)

    if (isSelected) {
      setCurrentStudent({
        ...currentStudent,
        groups: currentStudent.groups.filter((g) => g.groupId !== groupId),
      })
    } else {
      setCurrentStudent({
        ...currentStudent,
        groups: [
          ...currentStudent.groups,
          {
            groupId: group.id,
            groupName: group.name,
            subject: group.subject,
            fee: group.fee,
          },
        ],
      })
    }
  }

  const openEditDialog = (student) => {
    setEditingStudent({ ...student })
    setIsEditDialogOpen(true)
  }

  return (
    <div className="container py-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">O'quvchilar</h1>
          <p className="text-muted-foreground">O'quvchilarni boshqarish va kuzatish</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Yangi o'quvchi
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Yangi o'quvchi qo'shish</DialogTitle>
              <DialogDescription>O'quvchi ma'lumotlarini kiriting</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="studentName">Ism Familiya *</Label>
                  <Input
                    id="studentName"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                    placeholder="Ism Familiya"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="studentPhone">Telefon raqam *</Label>
                  <Input
                    id="studentPhone"
                    value={newStudent.phone}
                    onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                    placeholder="+998 90 123 45 67"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="studentBirthDate">Tug'ilgan sana</Label>
                  <Input
                    id="studentBirthDate"
                    type="date"
                    value={newStudent.birthDate}
                    onChange={(e) => setNewStudent({ ...newStudent, birthDate: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="discountDuration">Chegirma muddati</Label>
                  <Select
                    value={newStudent.discountDuration.toString()}
                    onValueChange={(value) =>
                      setNewStudent({ ...newStudent, discountDuration: Number.parseInt(value) })
                    }
                  >
                    <SelectTrigger id="discountDuration">
                      <SelectValue placeholder="Muddatni tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 oy</SelectItem>
                      <SelectItem value="2">2 oy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="studentAddress">Manzil</Label>
                <Input
                  id="studentAddress"
                  value={newStudent.address}
                  onChange={(e) => setNewStudent({ ...newStudent, address: e.target.value })}
                  placeholder="Toshkent, Chilonzor tumani"
                />
              </div>

              {/* Guruhlar tanlash */}
              <div className="grid gap-2">
                <Label>Guruhlar *</Label>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border rounded-md p-3">
                  {availableGroups.map((group) => (
                    <div key={group.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`group-${group.id}`}
                        checked={newStudent.groups.some((g) => g.groupId === group.id)}
                        onCheckedChange={() => handleGroupToggle(group.id)}
                      />
                      <Label htmlFor={`group-${group.id}`} className="text-sm">
                        <div>{group.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {group.subject} - {group.fee.toLocaleString()} so'm
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chegirma va jami summa */}
              {newStudent.groups.length > 0 && (
                <div className="bg-muted p-4 rounded-lg">
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="font-medium">Guruhlar:</div>
                      <div className="text-muted-foreground">{newStudent.groups.length} ta</div>
                    </div>
                    <div>
                      <div className="font-medium">Chegirma:</div>
                      <div className="text-green-600">{calculateDiscount(newStudent.groups.length)}%</div>
                    </div>
                    <div>
                      <div className="font-medium">Muddat:</div>
                      <div className="text-blue-600">{newStudent.discountDuration} oy</div>
                    </div>
                    <div>
                      <div className="font-medium">Jami to'lov:</div>
                      <div className="text-lg font-bold">
                        {calculateTotalFee(newStudent.groups, newStudent.discountDuration).toLocaleString()} so'm
                      </div>
                    </div>
                  </div>
                </div>
              )}
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

      {/* Tahrirlash dialogi */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>O'quvchini tahrirlash</DialogTitle>
            <DialogDescription>O'quvchi ma'lumotlarini o'zgartiring</DialogDescription>
          </DialogHeader>
          {editingStudent && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="editStudentName">Ism Familiya *</Label>
                  <Input
                    id="editStudentName"
                    value={editingStudent.name}
                    onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                    placeholder="Ism Familiya"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="editStudentPhone">Telefon raqam *</Label>
                  <Input
                    id="editStudentPhone"
                    value={editingStudent.phone}
                    onChange={(e) => setEditingStudent({ ...editingStudent, phone: e.target.value })}
                    placeholder="+998 90 123 45 67"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="editStudentBirthDate">Tug'ilgan sana</Label>
                  <Input
                    id="editStudentBirthDate"
                    type="date"
                    value={editingStudent.birthDate}
                    onChange={(e) => setEditingStudent({ ...editingStudent, birthDate: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="editDiscountDuration">Chegirma muddati</Label>
                  <Select
                    value={editingStudent.discountDuration?.toString() || "1"}
                    onValueChange={(value) =>
                      setEditingStudent({ ...editingStudent, discountDuration: Number.parseInt(value) })
                    }
                  >
                    <SelectTrigger id="editDiscountDuration">
                      <SelectValue placeholder="Muddatni tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 oy</SelectItem>
                      <SelectItem value="2">2 oy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="editStudentAddress">Manzil</Label>
                <Input
                  id="editStudentAddress"
                  value={editingStudent.address}
                  onChange={(e) => setEditingStudent({ ...editingStudent, address: e.target.value })}
                  placeholder="Toshkent, Chilonzor tumani"
                />
              </div>

              {/* Guruhlar tanlash */}
              <div className="grid gap-2">
                <Label>Guruhlar *</Label>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border rounded-md p-3">
                  {availableGroups.map((group) => (
                    <div key={group.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`edit-group-${group.id}`}
                        checked={editingStudent.groups.some((g) => g.groupId === group.id)}
                        onCheckedChange={() => handleGroupToggle(group.id, true)}
                      />
                      <Label htmlFor={`edit-group-${group.id}`} className="text-sm">
                        <div>{group.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {group.subject} - {group.fee.toLocaleString()} so'm
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chegirma va jami summa */}
              {editingStudent.groups.length > 0 && (
                <div className="bg-muted p-4 rounded-lg">
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="font-medium">Guruhlar:</div>
                      <div className="text-muted-foreground">{editingStudent.groups.length} ta</div>
                    </div>
                    <div>
                      <div className="font-medium">Chegirma:</div>
                      <div className="text-green-600">{calculateDiscount(editingStudent.groups.length)}%</div>
                    </div>
                    <div>
                      <div className="font-medium">Muddat:</div>
                      <div className="text-blue-600">{editingStudent.discountDuration} oy</div>
                    </div>
                    <div>
                      <div className="font-medium">Yangi jami:</div>
                      <div className="text-lg font-bold">
                        {calculateTotalFee(
                          editingStudent.groups,
                          editingStudent.discountDuration,
                          editingStudent.discountStartDate,
                        ).toLocaleString()}{" "}
                        so'm
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    Chegirma holati: {isDiscountActive(editingStudent) ? "Faol" : "Tugagan"}
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Bekor qilish
            </Button>
            <Button onClick={handleEditStudent}>Saqlash</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Statistika */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Qidirish va filtrlash */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="O'quvchi, guruh yoki fan bo'yicha qidirish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filtr" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Barchasi</SelectItem>
            <SelectItem value="active">Faol o'quvchilar</SelectItem>
            <SelectItem value="frozen">Muzlatilganlar</SelectItem>
            <SelectItem value="debtors">Qarzdorlar</SelectItem>
            <SelectItem value="low-attendance">Davomat zo'rlari</SelectItem>
            <SelectItem value="absent">Kelmayotganlar</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* O'quvchilar jadvali */}
      <Card>
        <CardHeader>
          <CardTitle>O'quvchilar ro'yxati</CardTitle>
          <CardDescription>{filteredStudents.length} ta o'quvchi topildi</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>O'quvchi</TableHead>
                <TableHead>Guruhlar</TableHead>
                <TableHead>Telefon</TableHead>
                <TableHead>To'lov ma'lumoti</TableHead>
                <TableHead>Davomat</TableHead>
                <TableHead>Holat</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                        <AvatarFallback>
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {student.groups.length} ta guruh
                          {student.groups.length > 1 && (
                            <span className="text-green-600 ml-1">
                              (-{calculateDiscount(student.groups.length)}% / {student.discountDuration}oy)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {student.groups.map((group, index) => (
                        <div key={index} className="text-sm">
                          <div className="font-medium">{group.groupName}</div>
                          <div className="text-muted-foreground">{group.subject}</div>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{student.phone}</TableCell>
                  <TableCell>
                    <div>
                      <div className="text-sm">
                        <span className="font-medium">Jami: </span>
                        {student.totalFee.toLocaleString()} so'm
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">To'langan: </span>
                        {student.paidAmount.toLocaleString()} so'm
                      </div>
                      {student.debt > 0 ? (
                        <div className="text-sm text-red-600 font-medium">
                          Qarz: {student.debt.toLocaleString()} so'm
                        </div>
                      ) : (
                        <div className="text-sm text-green-600">To'liq to'langan</div>
                      )}
                      {student.groups.length > 1 && (
                        <div className="text-xs text-muted-foreground">
                          Chegirma: {isDiscountActive(student) ? "Faol" : "Tugagan"}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium">{student.attendance}%</div>
                      <div
                        className={`h-2 w-16 rounded-full ${
                          student.attendance >= 90
                            ? "bg-green-200"
                            : student.attendance >= 70
                              ? "bg-yellow-200"
                              : "bg-red-200"
                        }`}
                      >
                        <div
                          className={`h-full rounded-full ${
                            student.attendance >= 90
                              ? "bg-green-500"
                              : student.attendance >= 70
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                          style={{ width: `${student.attendance}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={student.status === "Faol" ? "default" : "secondary"}>{student.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Amallar</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link href={`/students/${student.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            Ko'rish
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openEditDialog(student)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Tahrirlash
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => toggleStudentStatus(student.id)}>
                          {student.status === "Faol" ? (
                            <>
                              <Pause className="mr-2 h-4 w-4" />
                              Muzlatish
                            </>
                          ) : (
                            <>
                              <Play className="mr-2 h-4 w-4" />
                              Faollashtirish
                            </>
                          )}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
