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
import { MoreHorizontal, Plus, Search } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data
const initialRooms = [
  {
    id: "ROOM001",
    name: "Xona 1",
    capacity: 15,
    status: "active",
    description: "Katta xona, proyektor bilan jihozlangan",
  },
  {
    id: "ROOM002",
    name: "Xona 2",
    capacity: 12,
    status: "active",
    description: "O'rta hajmdagi xona, interaktiv doska bilan jihozlangan",
  },
  {
    id: "ROOM003",
    name: "Xona 3",
    capacity: 10,
    status: "active",
    description: "Kichik xona, kompyuterlar bilan jihozlangan",
  },
]

// Sample schedule data
const roomSchedule = {
  ROOM001: [
    { day: "Dushanba", time: "09:00-10:30", group: "Elementary A1", teacher: "Aziza Karimova" },
    { day: "Dushanba", time: "11:00-12:30", group: "", teacher: "" },
    { day: "Dushanba", time: "14:00-15:30", group: "", teacher: "" },
    { day: "Dushanba", time: "16:00-17:30", group: "", teacher: "" },
    { day: "Chorshanba", time: "09:00-10:30", group: "Elementary A1", teacher: "Aziza Karimova" },
    { day: "Chorshanba", time: "11:00-12:30", group: "", teacher: "" },
    { day: "Chorshanba", time: "14:00-15:30", group: "", teacher: "" },
    { day: "Chorshanba", time: "16:00-17:30", group: "", teacher: "" },
    { day: "Juma", time: "09:00-10:30", group: "Elementary A1", teacher: "Aziza Karimova" },
    { day: "Juma", time: "11:00-12:30", group: "", teacher: "" },
    { day: "Juma", time: "14:00-15:30", group: "", teacher: "" },
    { day: "Juma", time: "16:00-17:30", group: "", teacher: "" },
    { day: "Seshanba", time: "09:00-10:30", group: "", teacher: "" },
    { day: "Seshanba", time: "11:00-12:30", group: "Intermediate B2", teacher: "Eldor Toshmatov" },
    { day: "Seshanba", time: "14:00-15:30", group: "", teacher: "" },
    { day: "Seshanba", time: "16:00-17:30", group: "", teacher: "" },
    { day: "Payshanba", time: "09:00-10:30", group: "", teacher: "" },
    { day: "Payshanba", time: "11:00-12:30", group: "Intermediate B2", teacher: "Eldor Toshmatov" },
    { day: "Payshanba", time: "14:00-15:30", group: "", teacher: "" },
    { day: "Payshanba", time: "16:00-17:30", group: "", teacher: "" },
    { day: "Shanba", time: "09:00-10:30", group: "", teacher: "" },
    { day: "Shanba", time: "11:00-12:30", group: "Intermediate B2", teacher: "Eldor Toshmatov" },
    { day: "Shanba", time: "14:00-15:30", group: "", teacher: "" },
    { day: "Shanba", time: "16:00-17:30", group: "", teacher: "" },
  ],
  ROOM002: [
    { day: "Dushanba", time: "09:00-10:30", group: "", teacher: "" },
    { day: "Dushanba", time: "11:00-12:30", group: "Elementary A2", teacher: "Bobur Aliyev" },
    { day: "Dushanba", time: "14:00-15:30", group: "Advanced C1", teacher: "Feruza Kamalova" },
    { day: "Dushanba", time: "16:00-17:30", group: "", teacher: "" },
    { day: "Chorshanba", time: "09:00-10:30", group: "", teacher: "" },
    { day: "Chorshanba", time: "11:00-12:30", group: "Elementary A2", teacher: "Bobur Aliyev" },
    { day: "Chorshanba", time: "14:00-15:30", group: "Advanced C1", teacher: "Feruza Kamalova" },
    { day: "Chorshanba", time: "16:00-17:30", group: "", teacher: "" },
    { day: "Juma", time: "09:00-10:30", group: "", teacher: "" },
    { day: "Juma", time: "11:00-12:30", group: "Elementary A2", teacher: "Bobur Aliyev" },
    { day: "Juma", time: "14:00-15:30", group: "Advanced C1", teacher: "Feruza Kamalova" },
    { day: "Juma", time: "16:00-17:30", group: "", teacher: "" },
    { day: "Seshanba", time: "09:00-10:30", group: "", teacher: "" },
    { day: "Seshanba", time: "11:00-12:30", group: "", teacher: "" },
    { day: "Seshanba", time: "14:00-15:30", group: "", teacher: "" },
    { day: "Seshanba", time: "16:00-17:30", group: "", teacher: "" },
    { day: "Payshanba", time: "09:00-10:30", group: "", teacher: "" },
    { day: "Payshanba", time: "11:00-12:30", group: "", teacher: "" },
    { day: "Payshanba", time: "14:00-15:30", group: "", teacher: "" },
    { day: "Payshanba", time: "16:00-17:30", group: "", teacher: "" },
    { day: "Shanba", time: "09:00-10:30", group: "", teacher: "" },
    { day: "Shanba", time: "11:00-12:30", group: "", teacher: "" },
    { day: "Shanba", time: "14:00-15:30", group: "", teacher: "" },
    { day: "Shanba", time: "16:00-17:30", group: "", teacher: "" },
  ],
  ROOM003: [
    { day: "Dushanba", time: "09:00-10:30", group: "", teacher: "" },
    { day: "Dushanba", time: "11:00-12:30", group: "", teacher: "" },
    { day: "Dushanba", time: "14:00-15:30", group: "", teacher: "" },
    { day: "Dushanba", time: "16:00-17:30", group: "", teacher: "" },
    { day: "Chorshanba", time: "09:00-10:30", group: "", teacher: "" },
    { day: "Chorshanba", time: "11:00-12:30", group: "", teacher: "" },
    { day: "Chorshanba", time: "14:00-15:30", group: "", teacher: "" },
    { day: "Chorshanba", time: "16:00-17:30", group: "", teacher: "" },
    { day: "Juma", time: "09:00-10:30", group: "", teacher: "" },
    { day: "Juma", time: "11:00-12:30", group: "", teacher: "" },
    { day: "Juma", time: "14:00-15:30", group: "", teacher: "" },
    { day: "Juma", time: "16:00-17:30", group: "", teacher: "" },
    { day: "Seshanba", time: "09:00-10:30", group: "Intermediate B1", teacher: "Dilnoza Rahimova" },
    { day: "Seshanba", time: "11:00-12:30", group: "", teacher: "" },
    { day: "Seshanba", time: "14:00-15:30", group: "IELTS Preparation", teacher: "Gulnora Saidova" },
    { day: "Seshanba", time: "16:00-17:30", group: "", teacher: "" },
    { day: "Payshanba", time: "09:00-10:30", group: "Intermediate B1", teacher: "Dilnoza Rahimova" },
    { day: "Payshanba", time: "11:00-12:30", group: "", teacher: "" },
    { day: "Payshanba", time: "14:00-15:30", group: "IELTS Preparation", teacher: "Gulnora Saidova" },
    { day: "Payshanba", time: "16:00-17:30", group: "", teacher: "" },
    { day: "Shanba", time: "09:00-10:30", group: "Intermediate B1", teacher: "Dilnoza Rahimova" },
    { day: "Shanba", time: "11:00-12:30", group: "", teacher: "" },
    { day: "Shanba", time: "14:00-15:30", group: "IELTS Preparation", teacher: "Gulnora Saidova" },
    { day: "Shanba", time: "16:00-17:30", group: "", teacher: "" },
  ],
}

export default function RoomsPage() {
  const [rooms, setRooms] = useState(initialRooms)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newRoom, setNewRoom] = useState({
    name: "",
    capacity: "",
    description: "",
  })
  const [selectedRoom, setSelectedRoom] = useState("ROOM001")

  const filteredRooms = rooms.filter(
    (room) =>
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddRoom = () => {
    const id = `ROOM${String(rooms.length + 1).padStart(3, "0")}`

    setRooms([
      ...rooms,
      {
        id,
        name: newRoom.name,
        capacity: Number.parseInt(newRoom.capacity),
        status: "active",
        description: newRoom.description,
      },
    ])

    setNewRoom({
      name: "",
      capacity: "",
      description: "",
    })

    setIsAddDialogOpen(false)
  }

  const days = ["Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"]
  const timeSlots = ["09:00-10:30", "11:00-12:30", "14:00-15:30", "16:00-17:30"]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Xonalar</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Yangi xona
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Yangi xona qo'shish</DialogTitle>
              <DialogDescription>Xona ma'lumotlarini kiriting</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Xona nomi</Label>
                <Input
                  id="name"
                  value={newRoom.name}
                  onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                  placeholder="Xona nomi"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="capacity">Sig'imi</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={newRoom.capacity}
                  onChange={(e) => setNewRoom({ ...newRoom, capacity: e.target.value })}
                  placeholder="O'quvchilar soni"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Tavsif</Label>
                <Input
                  id="description"
                  value={newRoom.description}
                  onChange={(e) => setNewRoom({ ...newRoom, description: e.target.value })}
                  placeholder="Xona tavsifi"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Bekor qilish
              </Button>
              <Button onClick={handleAddRoom}>Qo'shish</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Xonalar ro'yxati</TabsTrigger>
          <TabsTrigger value="schedule">Xonalar jadvali</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Xonalar ro'yxati</CardTitle>
              <CardDescription>Barcha xonalar ro'yxati va ularning ma'lumotlari</CardDescription>
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
                      <TableHead>Xona nomi</TableHead>
                      <TableHead>Sig'imi</TableHead>
                      <TableHead>Tavsif</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Amallar</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRooms.map((room) => (
                      <TableRow key={room.id}>
                        <TableCell className="font-medium">{room.id}</TableCell>
                        <TableCell>{room.name}</TableCell>
                        <TableCell>{room.capacity} o'quvchi</TableCell>
                        <TableCell>{room.description}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              room.status === "active"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : "bg-red-50 text-red-700 border-red-200"
                            }
                          >
                            {room.status}
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
                              <DropdownMenuItem onClick={() => setSelectedRoom(room.id)}>
                                Jadval ko'rish
                              </DropdownMenuItem>
                              <DropdownMenuItem>Tahrirlash</DropdownMenuItem>
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
        </TabsContent>
        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Xona jadvali</CardTitle>
              <CardDescription>Xonaning band va bo'sh vaqtlari</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-4 space-x-2">
                <Label htmlFor="room-select">Xonani tanlang:</Label>
                <select
                  id="room-select"
                  className="p-2 border rounded-md"
                  value={selectedRoom}
                  onChange={(e) => setSelectedRoom(e.target.value)}
                >
                  {rooms.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.name}
                    </option>
                  ))}
                </select>
              </div>
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
                          const scheduleItem = roomSchedule[selectedRoom].find(
                            (item) => item.day === day && item.time === timeSlot,
                          )
                          return (
                            <TableCell key={`${day}-${timeSlot}`}>
                              {scheduleItem && scheduleItem.group ? (
                                <div className="space-y-1">
                                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                    {scheduleItem.group}
                                  </Badge>
                                  <div className="text-xs text-muted-foreground">{scheduleItem.teacher}</div>
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
      </Tabs>
    </div>
  )
}
