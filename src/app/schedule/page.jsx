"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DoorOpen, Plus, UserCircle } from "lucide-react"

// Sample data
const days = ["Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"]
const timeSlots = ["09:00-10:30", "11:00-12:30", "14:00-15:30", "16:00-17:30"]

const scheduleData = [
  {
    id: "SCH001",
    day: "Dushanba",
    time: "09:00-10:30",
    group: "Elementary A1",
    teacher: "Aziza Karimova",
    room: "Xona 1",
  },
  {
    id: "SCH002",
    day: "Dushanba",
    time: "11:00-12:30",
    group: "Elementary A2",
    teacher: "Bobur Aliyev",
    room: "Xona 2",
  },
  {
    id: "SCH003",
    day: "Dushanba",
    time: "14:00-15:30",
    group: "Advanced C1",
    teacher: "Feruza Kamalova",
    room: "Xona 2",
  },
  {
    id: "SCH004",
    day: "Chorshanba",
    time: "09:00-10:30",
    group: "Elementary A1",
    teacher: "Aziza Karimova",
    room: "Xona 1",
  },
  {
    id: "SCH005",
    day: "Chorshanba",
    time: "11:00-12:30",
    group: "Elementary A2",
    teacher: "Bobur Aliyev",
    room: "Xona 2",
  },
  {
    id: "SCH006",
    day: "Chorshanba",
    time: "14:00-15:30",
    group: "Advanced C1",
    teacher: "Feruza Kamalova",
    room: "Xona 2",
  },
  { id: "SCH007", day: "Juma", time: "09:00-10:30", group: "Elementary A1", teacher: "Aziza Karimova", room: "Xona 1" },
  { id: "SCH008", day: "Juma", time: "11:00-12:30", group: "Elementary A2", teacher: "Bobur Aliyev", room: "Xona 2" },
  { id: "SCH009", day: "Juma", time: "14:00-15:30", group: "Advanced C1", teacher: "Feruza Kamalova", room: "Xona 2" },
  {
    id: "SCH010",
    day: "Seshanba",
    time: "09:00-10:30",
    group: "Intermediate B1",
    teacher: "Dilnoza Rahimova",
    room: "Xona 3",
  },
  {
    id: "SCH011",
    day: "Seshanba",
    time: "11:00-12:30",
    group: "Intermediate B2",
    teacher: "Eldor Toshmatov",
    room: "Xona 1",
  },
  {
    id: "SCH012",
    day: "Seshanba",
    time: "14:00-15:30",
    group: "IELTS Preparation",
    teacher: "Gulnora Saidova",
    room: "Xona 3",
  },
  {
    id: "SCH013",
    day: "Payshanba",
    time: "09:00-10:30",
    group: "Intermediate B1",
    teacher: "Dilnoza Rahimova",
    room: "Xona 3",
  },
  {
    id: "SCH014",
    day: "Payshanba",
    time: "11:00-12:30",
    group: "Intermediate B2",
    teacher: "Eldor Toshmatov",
    room: "Xona 1",
  },
  {
    id: "SCH015",
    day: "Payshanba",
    time: "14:00-15:30",
    group: "IELTS Preparation",
    teacher: "Gulnora Saidova",
    room: "Xona 3",
  },
  {
    id: "SCH016",
    day: "Shanba",
    time: "09:00-10:30",
    group: "Intermediate B1",
    teacher: "Dilnoza Rahimova",
    room: "Xona 3",
  },
  {
    id: "SCH017",
    day: "Shanba",
    time: "11:00-12:30",
    group: "Intermediate B2",
    teacher: "Eldor Toshmatov",
    room: "Xona 1",
  },
  {
    id: "SCH018",
    day: "Shanba",
    time: "14:00-15:30",
    group: "IELTS Preparation",
    teacher: "Gulnora Saidova",
    room: "Xona 3",
  },
]

const teacherSchedule = {
  "Aziza Karimova": [
    { id: "SCH001", day: "Dushanba", time: "09:00-10:30", group: "Elementary A1", room: "Xona 1" },
    { id: "SCH004", day: "Chorshanba", time: "09:00-10:30", group: "Elementary A1", room: "Xona 1" },
    { id: "SCH007", day: "Juma", time: "09:00-10:30", group: "Elementary A1", room: "Xona 1" },
  ],
  "Bobur Aliyev": [
    { id: "SCH002", day: "Dushanba", time: "11:00-12:30", group: "Elementary A2", room: "Xona 2" },
    { id: "SCH005", day: "Chorshanba", time: "11:00-12:30", group: "Elementary A2", room: "Xona 2" },
    { id: "SCH008", day: "Juma", time: "11:00-12:30", group: "Elementary A2", room: "Xona 2" },
  ],
  "Dilnoza Rahimova": [
    { id: "SCH010", day: "Seshanba", time: "09:00-10:30", group: "Intermediate B1", room: "Xona 3" },
    { id: "SCH013", day: "Payshanba", time: "09:00-10:30", group: "Intermediate B1", room: "Xona 3" },
    { id: "SCH016", day: "Shanba", time: "09:00-10:30", group: "Intermediate B1", room: "Xona 3" },
  ],
  "Eldor Toshmatov": [
    { id: "SCH011", day: "Seshanba", time: "11:00-12:30", group: "Intermediate B2", room: "Xona 1" },
    { id: "SCH014", day: "Payshanba", time: "11:00-12:30", group: "Intermediate B2", room: "Xona 1" },
    { id: "SCH017", day: "Shanba", time: "11:00-12:30", group: "Intermediate B2", room: "Xona 1" },
  ],
  "Feruza Kamalova": [
    { id: "SCH003", day: "Dushanba", time: "14:00-15:30", group: "Advanced C1", room: "Xona 2" },
    { id: "SCH006", day: "Chorshanba", time: "14:00-15:30", group: "Advanced C1", room: "Xona 2" },
    { id: "SCH009", day: "Juma", time: "14:00-15:30", group: "Advanced C1", room: "Xona 2" },
  ],
  "Gulnora Saidova": [
    { id: "SCH012", day: "Seshanba", time: "14:00-15:30", group: "IELTS Preparation", room: "Xona 3" },
    { id: "SCH015", day: "Payshanba", time: "14:00-15:30", group: "IELTS Preparation", room: "Xona 3" },
    { id: "SCH018", day: "Shanba", time: "14:00-15:30", group: "IELTS Preparation", room: "Xona 3" },
  ],
}

export default function SchedulePage() {
  const [schedule, setSchedule] = useState(scheduleData)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState("Aziza Karimova")
  const [newSchedule, setNewSchedule] = useState({
    day: "",
    time: "",
    group: "",
    teacher: "",
    room: "",
  })

  const handleAddSchedule = () => {
    const id = `SCH${String(schedule.length + 1).padStart(3, "0")}`

    setSchedule([
      ...schedule,
      {
        id,
        day: newSchedule.day,
        time: newSchedule.time,
        group: newSchedule.group,
        teacher: newSchedule.teacher,
        room: newSchedule.room,
      },
    ])

    setNewSchedule({
      day: "",
      time: "",
      group: "",
      teacher: "",
      room: "",
    })

    setIsAddDialogOpen(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dars jadvali</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Yangi dars
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Yangi dars qo'shish</DialogTitle>
              <DialogDescription>Dars ma'lumotlarini kiriting</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="group">Guruh</Label>
                <Select onValueChange={(value) => setNewSchedule({ ...newSchedule, group: value })}>
                  <SelectTrigger id="group">
                    <SelectValue placeholder="Guruhni tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Elementary A1">Elementary A1</SelectItem>
                    <SelectItem value="Elementary A2">Elementary A2</SelectItem>
                    <SelectItem value="Intermediate B1">Intermediate B1</SelectItem>
                    <SelectItem value="Intermediate B2">Intermediate B2</SelectItem>
                    <SelectItem value="Advanced C1">Advanced C1</SelectItem>
                    <SelectItem value="IELTS Preparation">IELTS Preparation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="teacher">O'qituvchi</Label>
                <Select onValueChange={(value) => setNewSchedule({ ...newSchedule, teacher: value })}>
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
                <Select onValueChange={(value) => setNewSchedule({ ...newSchedule, room: value })}>
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
              <div className="grid gap-2">
                <Label htmlFor="day">Kun</Label>
                <Select onValueChange={(value) => setNewSchedule({ ...newSchedule, day: value })}>
                  <SelectTrigger id="day">
                    <SelectValue placeholder="Kunni tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map((day) => (
                      <SelectItem key={day} value={day}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="time">Vaqt</Label>
                <Select onValueChange={(value) => setNewSchedule({ ...newSchedule, time: value })}>
                  <SelectTrigger id="time">
                    <SelectValue placeholder="Vaqtni tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((timeSlot) => (
                      <SelectItem key={timeSlot} value={timeSlot}>
                        {timeSlot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Bekor qilish
              </Button>
              <Button onClick={handleAddSchedule}>Qo'shish</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Umumiy jadval</TabsTrigger>
          <TabsTrigger value="teacher">O'qituvchi jadvali</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Umumiy dars jadvali</CardTitle>
              <CardDescription>Barcha guruhlar uchun dars jadvali</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vaqt</TableHead>
                      {days.map((day) => (
                        <TableHead key={day}>{day}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {timeSlots.map((timeSlot) => (
                      <TableRow key={timeSlot}>
                        <TableCell className="font-medium">{timeSlot}</TableCell>
                        {days.map((day) => {
                          const scheduleItems = schedule.filter((item) => item.day === day && item.time === timeSlot)
                          return (
                            <TableCell key={`${day}-${timeSlot}`}>
                              {scheduleItems.length > 0 ? (
                                <div className="space-y-2">
                                  {scheduleItems.map((item) => (
                                    <div key={item.id} className="space-y-1">
                                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                        {item.group}
                                      </Badge>
                                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <UserCircle className="h-3 w-3" />
                                        {item.teacher}
                                      </div>
                                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <DoorOpen className="h-3 w-3" />
                                        {item.room}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                  Bo'sh
                                </Badge>
                              )}
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="teacher">
          <Card>
            <CardHeader>
              <CardTitle>O'qituvchi jadvali</CardTitle>
              <CardDescription>O'qituvchi uchun dars jadvali</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-4 space-x-2">
                <Label htmlFor="teacher-select">O'qituvchini tanlang:</Label>
                <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
                  <SelectTrigger id="teacher-select" className="w-[200px]">
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
              <div className="rounded-md border">
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
                    {teacherSchedule[selectedTeacher].map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.day}</TableCell>
                        <TableCell>{item.time}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {item.group}
                          </Badge>
                        </TableCell>
                        <TableCell>{item.room}</TableCell>
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

