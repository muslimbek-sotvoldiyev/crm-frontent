"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, Check, X, Search } from "lucide-react"
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
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { AttendanceStatsChart } from "@/components/attendance-stats-chart"
import { MonthlyAttendanceChart } from "@/components/monthly-attendance-chart"
import { StudentMovementChart } from "@/components/student-movement-chart"
import { MonthlyPaymentChart } from "@/components/monthly-payment-chart"

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
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [studentAttendance, setStudentAttendance] = useState({})
  const [comments, setComments] = useState({})
  const [activeTab, setActiveTab] = useState("today")
  const [searchTerm, setSearchTerm] = useState("")
  const [historyDate, setHistoryDate] = useState(new Date())

  const handleMarkAttendance = () => {
    // In a real application, this would save the attendance data
    console.log("Attendance marked for date:", format(selectedDate, "dd.MM.yyyy"))
    console.log("Student attendance:", studentAttendance)
    console.log("Comments:", comments)

    setIsMarkAttendanceDialogOpen(false)
    setStudentAttendance({})
    setComments({})
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

  const filteredStudents = students[selectedGroup].filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Davomat</h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={selectedGroup} onValueChange={setSelectedGroup}>
            <SelectTrigger className="w-full sm:w-[250px]">
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
          <Dialog open={isMarkAttendanceDialogOpen} onOpenChange={setIsMarkAttendanceDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <CalendarIcon className="mr-2 h-4 w-4" />
                Davomat belgilash
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Davomat belgilash</DialogTitle>
                <DialogDescription>
                  {groups.find((g) => g.id === selectedGroup)?.name} guruhi uchun davomat ma'lumotlarini kiriting
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Sana</Label>
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
                <ScrollArea className="h-[400px]">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>O'quvchi</TableHead>
                          <TableHead className="w-[100px] text-center">Keldi</TableHead>
                          <TableHead>Izoh</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {students[selectedGroup].map((student) => (
                          <TableRow key={student.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback>{student.name.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                {student.name}
                              </div>
                            </TableCell>
                            <TableCell className="text-center">
                              <Checkbox
                                checked={studentAttendance[student.id] === true}
                                onCheckedChange={(checked) => {
                                  handleCheckboxChange(student.id, checked ? true : false)
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
                </ScrollArea>
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
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="today">Bugungi davomat</TabsTrigger>
          <TabsTrigger value="history">Davomat tarixi</TabsTrigger>
          <TabsTrigger value="stats">Statistika</TabsTrigger>
        </TabsList>

        <TabsContent value="today">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <CardTitle>Bugungi davomat</CardTitle>
                  <CardDescription>
                    {groups.find((g) => g.id === selectedGroup)?.name} guruhi uchun bugungi davomat
                  </CardDescription>
                </div>
                <div className="relative w-full sm:w-[300px]">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="O'quvchi qidirish..."
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
                      <TableHead>O'quvchi</TableHead>
                      <TableHead>Umumiy davomat</TableHead>
                      <TableHead>Bugun</TableHead>
                      <TableHead>Amallar</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{student.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{student.name}</div>
                              <div className="text-xs text-muted-foreground">{student.id}</div>
                            </div>
                          </div>
                        </TableCell>
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
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              <Check className="mr-1 h-3 w-3" />
                              Kelgan
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            Tarix
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
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <CardTitle>Davomat tarixi</CardTitle>
                  <CardDescription>
                    {groups.find((g) => g.id === selectedGroup)?.name} guruhi bo'yicha davomat tarixi
                  </CardDescription>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {historyDate ? format(historyDate, "MMMM yyyy") : "Oyni tanlang"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={historyDate} onSelect={setHistoryDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </CardHeader>
            <CardContent>
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
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Umumiy davomat</CardTitle>
                <CardDescription>
                  {groups.find((g) => g.id === selectedGroup)?.name} guruhi uchun umumiy davomat statistikasi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-2">
                  <div className="text-6xl font-bold mb-2">
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
                  <div className="h-[200px] w-full mt-4">
                    <AttendanceStatsChart
                      present={attendanceHistory[selectedGroup].reduce((sum, record) => sum + record.present, 0)}
                      absent={attendanceHistory[selectedGroup].reduce((sum, record) => sum + record.absent, 0)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Eng yaxshi davomat</CardTitle>
                <CardDescription>
                  {groups.find((g) => g.id === selectedGroup)?.name} guruhidagi eng yaxshi davomatga ega o'quvchilar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {students[selectedGroup]
                    .sort((a, b) => b.attendance - a.attendance)
                    .slice(0, 5)
                    .map((student, index) => (
                      <div key={student.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                            {index + 1}
                          </div>
                          <div>{student.name}</div>
                        </div>
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
                <CardTitle>Oylik davomat</CardTitle>
                <CardDescription>
                  {groups.find((g) => g.id === selectedGroup)?.name} guruhi uchun oylik davomat statistikasi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <MonthlyAttendanceChart selectedGroup={selectedGroup} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>O'quvchilar harakati</CardTitle>
                <CardDescription>
                  {groups.find((g) => g.id === selectedGroup)?.name} guruhiga qo'shilgan va chiqib ketgan o'quvchilar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] w-full">
                  <StudentMovementChart selectedGroup={selectedGroup} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Oylik to'lovlar</CardTitle>
                <CardDescription>
                  {groups.find((g) => g.id === selectedGroup)?.name} guruhi uchun oylik to'lovlar statistikasi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] w-full">
                  <MonthlyPaymentChart selectedGroup={selectedGroup} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

