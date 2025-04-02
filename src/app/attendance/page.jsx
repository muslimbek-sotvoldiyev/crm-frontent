"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Check, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

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
  GRP001: [
    { id: "STD001", name: "Alisher Zokirov", attendance: 95 },
    { id: "STD005", name: "Bobur Alimov", attendance: 100 },
    { id: "STD007", name: "Sardor Kamolov", attendance: 95 },
    { id: "STD010", name: "Gulnora Karimova", attendance: 90 },
    { id: "STD015", name: "Aziza Toshmatova", attendance: 85 },
    { id: "STD020", name: "Javohir Rahimov", attendance: 80 },
    { id: "STD025", name: "Madina Aliyeva", attendance: 100 },
    { id: "STD030", name: "Jahongir Alimov", attendance: 75 },
    { id: "STD035", name: "Kamola Zokirova", attendance: 90 },
    { id: "STD040", name: "Nodir Toshmatov", attendance: 95 },
    { id: "STD045", name: "Lola Kamalova", attendance: 85 },
    { id: "STD050", name: "Akbar Saidov", attendance: 90 },
  ],
  GRP002: [
    { id: "STD002", name: "Malika Karimova", attendance: 90 },
    { id: "STD008", name: "Dilnoza Saidova", attendance: 90 },
    { id: "STD014", name: "Farrukh Alimov", attendance: 85 },
    { id: "STD022", name: "Zarina Toshmatova", attendance: 95 },
    { id: "STD028", name: "Olim Rahimov", attendance: 80 },
    { id: "STD034", name: "Sabina Kamalova", attendance: 100 },
    { id: "STD042", name: "Akbar Toshmatov", attendance: 85 },
    { id: "STD046", name: "Nilufar Aliyeva", attendance: 90 },
    { id: "STD052", name: "Timur Zokirov", attendance: 95 },
    { id: "STD056", name: "Kamila Rahimova", attendance: 85 },
  ],
  GRP003: [
    { id: "STD003", name: "Jasur Toshmatov", attendance: 85 },
    { id: "STD006", name: "Zarina Umarova", attendance: 65 },
    { id: "STD012", name: "Rustam Kamolov", attendance: 85 },
    { id: "STD018", name: "Dilshod Rahimov", attendance: 75 },
    { id: "STD024", name: "Kamola Saidova", attendance: 95 },
    { id: "STD036", name: "Nodira Karimova", attendance: 80 },
    { id: "STD048", name: "Umid Alimov", attendance: 90 },
    { id: "STD054", name: "Sevara Toshmatova", attendance: 85 },
  ],
}

const attendanceHistory = {
  GRP001: [
    { date: "01.03.2023", present: 12, absent: 0 },
    { date: "03.03.2023", present: 11, absent: 1 },
    { date: "06.03.2023", present: 10, absent: 2 },
    { date: "08.03.2023", present: 12, absent: 0 },
    { date: "10.03.2023", present: 11, absent: 1 },
    { date: "13.03.2023", present: 12, absent: 0 },
    { date: "15.03.2023", present: 10, absent: 2 },
    { date: "17.03.2023", present: 11, absent: 1 },
    { date: "20.03.2023", present: 12, absent: 0 },
    { date: "22.03.2023", present: 11, absent: 1 },
    { date: "24.03.2023", present: 10, absent: 2 },
    { date: "27.03.2023", present: 12, absent: 0 },
    { date: "29.03.2023", present: 11, absent: 1 },
    { date: "31.03.2023", present: 12, absent: 0 },
  ],
  GRP002: [
    { date: "02.03.2023", present: 10, absent: 0 },
    { date: "04.03.2023", present: 9, absent: 1 },
    { date: "07.03.2023", present: 8, absent: 2 },
    { date: "09.03.2023", present: 10, absent: 0 },
    { date: "11.03.2023", present: 9, absent: 1 },
    { date: "14.03.2023", present: 10, absent: 0 },
    { date: "16.03.2023", present: 8, absent: 2 },
    { date: "18.03.2023", present: 9, absent: 1 },
    { date: "21.03.2023", present: 10, absent: 0 },
    { date: "23.03.2023", present: 9, absent: 1 },
    { date: "25.03.2023", present: 8, absent: 2 },
    { date: "28.03.2023", present: 10, absent: 0 },
    { date: "30.03.2023", present: 9, absent: 1 },
  ],
  GRP003: [
    { date: "01.03.2023", present: 8, absent: 0 },
    { date: "03.03.2023", present: 7, absent: 1 },
    { date: "06.03.2023", present: 6, absent: 2 },
    { date: "08.03.2023", present: 8, absent: 0 },
    { date: "10.03.2023", present: 7, absent: 1 },
    { date: "13.03.2023", present: 8, absent: 0 },
    { date: "15.03.2023", present: 6, absent: 2 },
    { date: "17.03.2023", present: 7, absent: 1 },
    { date: "20.03.2023", present: 8, absent: 0 },
    { date: "22.03.2023", present: 7, absent: 1 },
    { date: "24.03.2023", present: 6, absent: 2 },
    { date: "27.03.2023", present: 8, absent: 0 },
    { date: "29.03.2023", present: 7, absent: 1 },
    { date: "31.03.2023", present: 8, absent: 0 },
  ],
}

export default function AttendancePage() {
  const [selectedGroup, setSelectedGroup] = useState("GRP001")
  const [isMarkAttendanceDialogOpen, setIsMarkAttendanceDialogOpen] = useState(false)
  const [attendanceDate, setAttendanceDate] = useState("")
  const [studentAttendance, setStudentAttendance] = useState({})
  const [comments, setComments] = useState({})
  const [activeTab, setActiveTab] = useState("mark")

  const handleMarkAttendance = () => {
    // In a real application, this would save the attendance data
    console.log("Attendance marked for date:", attendanceDate)
    console.log("Student attendance:", studentAttendance)
    console.log("Comments:", comments)

    setIsMarkAttendanceDialogOpen(false)
    setStudentAttendance({})
    setComments({})
    setAttendanceDate("")
  }

  const handleCheckboxChange = (studentId, isPresent) => {
    setStudentAttendance({
      ...studentAttendance,
      [studentId]: isPresent,
    })
  }

  const handleCommentChange = (studentId, comment) => {
    setComments({
      ...comments,
      [studentId]: comment,
    })
  }

  const formatDate = () => {
    const today = new Date()
    return `${String(today.getDate()).padStart(2, "0")}.${String(today.getMonth() + 1).padStart(
      2,
      "0",
    )}.${today.getFullYear()}`
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Davomat</h2>
        <Dialog open={isMarkAttendanceDialogOpen} onOpenChange={setIsMarkAttendanceDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Calendar className="mr-2 h-4 w-4" />
              Davomat belgilash
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Davomat belgilash</DialogTitle>
              <DialogDescription>Guruh uchun bugungi davomat ma'lumotlarini kiriting</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="group">Guruh</Label>
                  <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                    <SelectTrigger id="group">
                      <SelectValue placeholder="Guruhni tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      {groups.map((group) => (
                        <SelectItem key={group.id} value={group.id}>
                          {group.name} - {group.teacher}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="date">Sana</Label>
                  <Input
                    id="date"
                    type="text"
                    placeholder={formatDate()}
                    value={attendanceDate}
                    onChange={(e) => setAttendanceDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>O'quvchi</TableHead>
                      <TableHead>Keldi</TableHead>
                      <TableHead>Kelmadi</TableHead>
                      <TableHead>Izoh</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students[selectedGroup].map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>
                          <Checkbox
                            checked={studentAttendance[student.id] === true}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                handleCheckboxChange(student.id, true)
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Checkbox
                            checked={studentAttendance[student.id] === false}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                handleCheckboxChange(student.id, false)
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            placeholder="Izoh"
                            value={comments[student.id] || ""}
                            onChange={(e) => handleCommentChange(student.id, e.target.value)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsMarkAttendanceDialogOpen(false)}>
                Bekor qilish
              </Button>
              <Button onClick={handleMarkAttendance}>Saqlash</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="mark">Davomat belgilash</TabsTrigger>
          <TabsTrigger value="history">Davomat tarixi</TabsTrigger>
          <TabsTrigger value="stats">Statistika</TabsTrigger>
        </TabsList>
        <TabsContent value="mark">
          <Card>
            <CardHeader>
              <CardTitle>Davomat belgilash</CardTitle>
              <CardDescription>Guruh bo'yicha davomat ma'lumotlarini kiriting</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-4 space-x-2">
                <Label htmlFor="group-select">Guruhni tanlang:</Label>
                <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                  <SelectTrigger id="group-select" className="w-[300px]">
                    <SelectValue placeholder="Guruhni tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    {groups.map((group) => (
                      <SelectItem key={group.id} value={group.id}>
                        {group.name} - {group.teacher}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={() => setIsMarkAttendanceDialogOpen(true)}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Davomat belgilash
                </Button>
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Ism Familiya</TableHead>
                      <TableHead>Umumiy davomat</TableHead>
                      <TableHead>Amallar</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students[selectedGroup].map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.id}</TableCell>
                        <TableCell>{student.name}</TableCell>
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
                          <Button variant="outline" size="sm">
                            Davomat tarixini ko'rish
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
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Davomat tarixi</CardTitle>
              <CardDescription>Guruh bo'yicha davomat tarixi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-4 space-x-2">
                <Label htmlFor="group-history">Guruhni tanlang:</Label>
                <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                  <SelectTrigger id="group-history" className="w-[300px]">
                    <SelectValue placeholder="Guruhni tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    {groups.map((group) => (
                      <SelectItem key={group.id} value={group.id}>
                        {group.name} - {group.teacher}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Sana</TableHead>
                      <TableHead>Kelganlar</TableHead>
                      <TableHead>Kelmaganlar</TableHead>
                      <TableHead>Davomat</TableHead>
                      <TableHead>Amallar</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendanceHistory[selectedGroup].map((record, index) => (
                      <TableRow key={index}>
                        <TableCell>{record.date}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Check className="h-4 w-4 text-green-500" />
                            {record.present}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <X className="h-4 w-4 text-red-500" />
                            {record.absent}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              record.present / (record.present + record.absent) >= 0.9
                                ? "bg-green-50 text-green-700 border-green-200"
                                : record.present / (record.present + record.absent) >= 0.75
                                  ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                  : "bg-red-50 text-red-700 border-red-200"
                            }
                          >
                            {Math.round((record.present / (record.present + record.absent)) * 100)}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            Batafsil
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
        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle>Davomat statistikasi</CardTitle>
              <CardDescription>Guruh bo'yicha davomat statistikasi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-4 space-x-2">
                <Label htmlFor="group-stats">Guruhni tanlang:</Label>
                <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                  <SelectTrigger id="group-stats" className="w-[300px]">
                    <SelectValue placeholder="Guruhni tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    {groups.map((group) => (
                      <SelectItem key={group.id} value={group.id}>
                        {group.name} - {group.teacher}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Umumiy davomat</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-5xl font-bold mb-2">
                        {Math.round(
                          (attendanceHistory[selectedGroup].reduce((sum, record) => sum + record.present, 0) /
                            attendanceHistory[selectedGroup].reduce(
                              (sum, record) => sum + record.present + record.absent,
                              0,
                            )) *
                            100,
                        )}
                        %
                      </div>
                      <p className="text-muted-foreground">Jami darslar: {attendanceHistory[selectedGroup].length}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Eng yaxshi davomat</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {students[selectedGroup]
                        .sort((a, b) => b.attendance - a.attendance)
                        .slice(0, 5)
                        .map((student) => (
                          <div key={student.id} className="flex items-center justify-between">
                            <div>{student.name}</div>
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
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Davomat dinamikasi</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full">
                      {/* Bu yerda Chart.js yordamida davomat dinamikasi grafigi chiziladi */}
                      <div className="flex items-center justify-center h-full">
                        <p className="text-muted-foreground">Davomat dinamikasi grafigi</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>            
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )

}

