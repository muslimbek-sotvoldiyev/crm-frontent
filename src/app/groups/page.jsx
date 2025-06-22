"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
import { MoreHorizontal, Plus, Search, Users } from "lucide-react"
import Link from "next/link"

// Sample data
const initialGroups = [
  {
    id: "GRP001",
    name: "Elementary A1",
    teacher: "Aziza Karimova",
    students: 12,
    startDate: "01.03.2023",
    status: "active",
    room: "Xona 1",
    schedule: "Du-Chor-Juma 09:00-10:30",
  },
  {
    id: "GRP002",
    name: "Elementary A2",
    teacher: "Bobur Aliyev",
    students: 10,
    startDate: "05.03.2023",
    status: "active",
    room: "Xona 2",
    schedule: "Du-Chor-Juma 11:00-12:30",
  },
  {
    id: "GRP003",
    name: "Intermediate B1",
    teacher: "Dilnoza Rahimova",
    students: 8,
    startDate: "10.03.2023",
    status: "active",
    room: "Xona 3",
    schedule: "Se-Pay-Shan 09:00-10:30",
  },
  {
    id: "GRP004",
    name: "Intermediate B2",
    teacher: "Eldor Toshmatov",
    students: 9,
    startDate: "15.03.2023",
    status: "active",
    room: "Xona 1",
    schedule: "Se-Pay-Shan 11:00-12:30",
  },
  {
    id: "GRP005",
    name: "Advanced C1",
    teacher: "Feruza Kamalova",
    students: 6,
    startDate: "20.03.2023",
    status: "active",
    room: "Xona 2",
    schedule: "Du-Chor-Juma 14:00-15:30",
  },
  {
    id: "GRP006",
    name: "IELTS Preparation",
    teacher: "Gulnora Saidova",
    students: 7,
    startDate: "25.03.2023",
    status: "inactive",
    room: "Xona 3",
    schedule: "Se-Pay-Shan 14:00-15:30",
  },
]

export default function GroupsPage() {
  const [groups, setGroups] = useState(initialGroups)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newGroup, setNewGroup] = useState({
    name: "",
    teacher: "",
    room: "",
    schedule: "",
  })

  const filteredGroups = groups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.room.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddGroup = () => {
    const id = `GRP${String(groups.length + 1).padStart(3, "0")}`
    const today = new Date()
    const formattedDate = `${String(today.getDate()).padStart(2, "0")}.${String(today.getMonth() + 1).padStart(
      2,
      "0",
    )}.${today.getFullYear()}`

    setGroups([
      ...groups,
      {
        id,
        name: newGroup.name,
        teacher: newGroup.teacher,
        students: 0,
        startDate: formattedDate,
        status: "active",
        room: newGroup.room,
        schedule: newGroup.schedule,
      },
    ])

    setNewGroup({
      name: "",
      teacher: "",
      room: "",
      schedule: "",
    })

    setIsAddDialogOpen(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Guruhlar</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Yangi guruh
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Yangi guruh qo'shish</DialogTitle>
              <DialogDescription>Guruh ma'lumotlarini kiriting</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Guruh nomi</Label>
                <Input
                  id="name"
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                  placeholder="Guruh nomi"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="teacher">O'qituvchi</Label>
                <Select onValueChange={(value) => setNewGroup({ ...newGroup, teacher: value })}>
                  <SelectTrigger id="teacher">
                    <SelectValue placeholder="O'qituvchini tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Aziza Karimova">Aziza Karimova</SelectItem>
                    <SelectItem value="Bobur Aliyev">Bobur Aliyev</SelectItem>
                    <SelectItem value="Dilnoza Rahimova">Dilnoza Rahimova</SelectItem>
                    <SelectItem value="Eldor Toshmatov">Eldor Toshmatov</SelectItem>
                    <SelectItem value="Feruza Kamalova">Feruza Kamalova</SelectItem>
                    <SelectItem value="Gulnora Saidova">Gulnora Saidova</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="room">Xona</Label>
                <Select onValueChange={(value) => setNewGroup({ ...newGroup, room: value })}>
                  <SelectTrigger id="room">
                    <SelectValue placeholder="Xonani tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Xona 1">Xona 1</SelectItem>
                    <SelectItem value="Xona 2">Xona 2</SelectItem>
                    <SelectItem value="Xona 3">Xona 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Yangi dars jadvali qismi */}
              <div className="grid gap-2">
                <Label>Dars jadvali</Label>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-sm">Haftada necha kun</Label>
                      <Select onValueChange={(value) => setNewGroup({ ...newGroup, daysPerWeek: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Kunlar soni" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2">2 kun</SelectItem>
                          <SelectItem value="3">3 kun</SelectItem>
                          <SelectItem value="4">4 kun</SelectItem>
                          <SelectItem value="5">5 kun</SelectItem>
                          <SelectItem value="6">6 kun</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm">Har bir dars davomiyligi</Label>
                      <Select onValueChange={(value) => setNewGroup({ ...newGroup, lessonDuration: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Davomiylik" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="60">1 soat</SelectItem>
                          <SelectItem value="90">1.5 soat</SelectItem>
                          <SelectItem value="120">2 soat</SelectItem>
                          <SelectItem value="150">2.5 soat</SelectItem>
                          <SelectItem value="180">3 soat</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label className="text-sm">Dars kunlari</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {["Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba", "Yakshanba"].map((day) => (
                        <div key={day} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={day}
                            className="rounded border-gray-300"
                            onChange={(e) => {
                              const days = newGroup.selectedDays || []
                              if (e.target.checked) {
                                setNewGroup({ ...newGroup, selectedDays: [...days, day] })
                              } else {
                                setNewGroup({ ...newGroup, selectedDays: days.filter((d) => d !== day) })
                              }
                            }}
                          />
                          <Label htmlFor={day} className="text-sm">
                            {day}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-sm">Boshlanish vaqti</Label>
                      <Select onValueChange={(value) => setNewGroup({ ...newGroup, startTime: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Vaqt" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="08:00">08:00</SelectItem>
                          <SelectItem value="09:00">09:00</SelectItem>
                          <SelectItem value="10:00">10:00</SelectItem>
                          <SelectItem value="11:00">11:00</SelectItem>
                          <SelectItem value="12:00">12:00</SelectItem>
                          <SelectItem value="13:00">13:00</SelectItem>
                          <SelectItem value="14:00">14:00</SelectItem>
                          <SelectItem value="15:00">15:00</SelectItem>
                          <SelectItem value="16:00">16:00</SelectItem>
                          <SelectItem value="17:00">17:00</SelectItem>
                          <SelectItem value="18:00">18:00</SelectItem>
                          <SelectItem value="19:00">19:00</SelectItem>
                          <SelectItem value="20:00">20:00</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm">Tugash vaqti</Label>
                      <Input
                        readOnly
                        value={
                          newGroup.startTime && newGroup.lessonDuration
                            ? `${String(Math.floor((Number.parseInt(newGroup.startTime.split(":")[0]) * 60 + Number.parseInt(newGroup.startTime.split(":")[1]) + Number.parseInt(newGroup.lessonDuration)) / 60)).padStart(2, "0")}:${String((Number.parseInt(newGroup.startTime.split(":")[0]) * 60 + Number.parseInt(newGroup.startTime.split(":")[1]) + Number.parseInt(newGroup.lessonDuration)) % 60).padStart(2, "0")}`
                            : ""
                        }
                        placeholder="Avtomatik hisoblanadi"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="level">Kurs darajasi</Label>
                <Select onValueChange={(value) => setNewGroup({ ...newGroup, level: value })}>
                  <SelectTrigger id="level">
                    <SelectValue placeholder="Darajani tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Elementary">Elementary</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                    <SelectItem value="IELTS">IELTS</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="price">Oylik to'lov (so'm)</Label>
                <Input
                  id="price"
                  type="number"
                  value={newGroup.price}
                  onChange={(e) => setNewGroup({ ...newGroup, price: e.target.value })}
                  placeholder="450000"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="maxStudents">Maksimal o'quvchilar soni</Label>
                <Input
                  id="maxStudents"
                  type="number"
                  value={newGroup.maxStudents}
                  onChange={(e) => setNewGroup({ ...newGroup, maxStudents: e.target.value })}
                  placeholder="15"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Bekor qilish
              </Button>
              <Button onClick={handleAddGroup}>Qo'shish</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Guruhlar ro'yxati</CardTitle>
          <CardDescription>Barcha guruhlar ro'yxati va ularning ma'lumotlari</CardDescription>
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
                  <TableHead>Guruh nomi</TableHead>
                  <TableHead>O'qituvchi</TableHead>
                  <TableHead>O'quvchilar</TableHead>
                  <TableHead>Xona</TableHead>
                  <TableHead>Dars jadvali</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amallar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGroups.map((group) => (
                  <TableRow key={group.id}>
                    <TableCell className="font-medium">{group.id}</TableCell>
                    <TableCell>
                      <Link href={`/groups/${group.id}`} className="hover:underline">
                        {group.name}
                      </Link>
                    </TableCell>
                    <TableCell>{group.teacher}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        {group.students}
                      </div>
                    </TableCell>
                    <TableCell>{group.room}</TableCell>
                    <TableCell>{group.schedule}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          group.status === "active"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-red-50 text-red-700 border-red-200"
                        }
                      >
                        {group.status}
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
                            <Link href={`/groups/${group.id}`}>Batafsil ko'rish</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>O'quvchilarni ko'rish</DropdownMenuItem>
                          <DropdownMenuItem>Tahrirlash</DropdownMenuItem>
                          <DropdownMenuItem>O'quvchi qo'shish</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">To'xtatish</DropdownMenuItem>
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
