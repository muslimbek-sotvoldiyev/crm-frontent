"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bot, MessageSquare, Save, UserPlus, UserCheck, Activity, Copy, RefreshCw } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data
const botUsers = [
  {
    id: 1,
    name: "Alisher Zokirov",
    telegramId: 123456789,
    role: "student",
    status: "active",
    lastActive: "12.03.2023 15:45",
  },
  {
    id: 2,
    name: "Malika Karimova",
    telegramId: 987654321,
    role: "student",
    status: "active",
    lastActive: "15.03.2023 10:30",
  },
  {
    id: 3,
    name: "Aziza Karimova",
    telegramId: 456789123,
    role: "teacher",
    status: "active",
    lastActive: "14.03.2023 18:20",
  },
  {
    id: 4,
    name: "Bobur Aliyev",
    telegramId: 789123456,
    role: "teacher",
    status: "active",
    lastActive: "13.03.2023 09:15",
  },
  { id: 5, name: "Admin", telegramId: 111222333, role: "admin", status: "active", lastActive: "16.03.2023 12:00" },
  {
    id: 6,
    name: "Jasur Toshmatov",
    telegramId: 333444555,
    role: "student",
    status: "inactive",
    lastActive: "01.03.2023 14:30",
  },
]

const botLogs = [
  { id: 1, user: "Alisher Zokirov", action: "Davomat ko'rish", timestamp: "16.03.2023 15:45" },
  { id: 2, name: "Malika Karimova", action: "To'lov ma'lumotlarini ko'rish", timestamp: "16.03.2023 14:30" },
  { id: 3, name: "Aziza Karimova", action: "Guruh davomatini belgilash", timestamp: "16.03.2023 12:20" },
  { id: 4, name: "Admin", action: "Eslatma yuborish", timestamp: "16.03.2023 11:00" },
  { id: 5, name: "Bobur Aliyev", action: "Dars jadvalini ko'rish", timestamp: "16.03.2023 10:15" },
  { id: 6, name: "Jasur Toshmatov", action: "Botga kirish", timestamp: "16.03.2023 09:30" },
]

const students = [
  {
    id: "STD001",
    name: "Alisher Zokirov",
    group: "Elementary A1",
    status: "active",
    phone: "+998 90 123 45 67",
    linked: true,
  },
  {
    id: "STD002",
    name: "Malika Karimova",
    group: "Elementary A2",
    status: "active",
    phone: "+998 91 234 56 78",
    linked: true,
  },
  {
    id: "STD003",
    name: "Jasur Toshmatov",
    group: "Advanced C1",
    status: "active",
    phone: "+998 93 345 67 89",
    linked: false,
  },
  {
    id: "STD004",
    name: "Nilufar Rahimova",
    group: "Intermediate B2",
    status: "active",
    phone: "+998 94 456 78 90",
    linked: false,
  },
  {
    id: "STD005",
    name: "Bobur Alimov",
    group: "Elementary A1",
    status: "active",
    phone: "+998 95 567 89 01",
    linked: true,
  },
  {
    id: "STD006",
    name: "Zarina Umarova",
    group: "Intermediate B1",
    status: "inactive",
    phone: "+998 97 678 90 12",
    linked: false,
  },
]

const teachers = [
  { id: "TCH001", name: "Aziza Karimova", groups: 1, status: "active", phone: "+998 90 111 22 33", linked: true },
  { id: "TCH002", name: "Bobur Aliyev", groups: 1, status: "active", phone: "+998 91 222 33 44", linked: true },
  { id: "TCH003", name: "Dilnoza Rahimova", groups: 1, status: "active", phone: "+998 93 333 44 55", linked: false },
  { id: "TCH004", name: "Eldor Toshmatov", groups: 1, status: "active", phone: "+998 94 444 55 66", linked: false },
  { id: "TCH005", name: "Feruza Kamalova", groups: 1, status: "active", phone: "+998 95 555 66 77", linked: true },
  { id: "TCH006", name: "Gulnora Saidova", groups: 1, status: "active", phone: "+998 97 666 77 88", linked: false },
]

export default function BotSettingsPage() {
  const [botToken, setBotToken] = useState("")
  const [webhookUrl, setWebhookUrl] = useState("https://your-server.com/api/telegram-webhook")
  const [botStatus, setBotStatus] = useState("active")
  const [welcomeMessage, setWelcomeMessage] = useState("Assalomu alaykum! English Center CRM botiga xush kelibsiz.")
  const [paymentReminder, setPaymentReminder] = useState("Hurmatli o'quvchi, to'lovni amalga oshirishni unutmang!")
  const [attendanceNotification, setAttendanceNotification] = useState(true)
  const [paymentNotification, setPaymentNotification] = useState(true)
  const [scheduleNotification, setScheduleNotification] = useState(true)
  const [newGroupNotification, setNewGroupNotification] = useState(true)
  const [studentRemovalNotification, setStudentRemovalNotification] = useState(true)
  const [activeTab, setActiveTab] = useState("settings")
  const [isLinkUserDialogOpen, setIsLinkUserDialogOpen] = useState(false)
  const [selectedUserType, setSelectedUserType] = useState("student")
  const [selectedUser, setSelectedUser] = useState("")
  const [telegramId, setTelegramId] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const handleSaveSettings = () => {
    // In a real application, this would save the bot settings
    console.log("Bot settings saved")
  }

  const handleTestBot = () => {
    // In a real application, this would test the bot connection
    console.log("Testing bot connection")
  }

  const handleSetWebhook = () => {
    // In a real application, this would set the webhook URL
    console.log("Setting webhook URL:", webhookUrl)
  }

  const handleLinkUser = () => {
    // In a real application, this would link the user to the Telegram bot
    console.log("Linking user:", selectedUser, "with Telegram ID:", telegramId)
    setIsLinkUserDialogOpen(false)
    setSelectedUser("")
    setTelegramId("")
  }

  const handleGenerateLink = () => {
    // In a real application, this would generate a link for the user to join the bot
    return `https://t.me/YourBotUsername?start=${selectedUser}`
  }

  const filteredBotUsers = botUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.telegramId.toString().includes(searchTerm) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.phone.includes(searchTerm),
  )

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.phone.includes(searchTerm),
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Telegram Bot Sozlamalari</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleTestBot}>
            <Bot className="mr-2 h-4 w-4" />
            Botni tekshirish
          </Button>
          <Button onClick={handleSaveSettings}>
            <Save className="mr-2 h-4 w-4" />
            Saqlash
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="settings">Bot sozlamalari</TabsTrigger>
          <TabsTrigger value="users">Foydalanuvchilar</TabsTrigger>
          <TabsTrigger value="notifications">Bildirishnomalar</TabsTrigger>
          <TabsTrigger value="bot-users">Bot foydalanuvchilari</TabsTrigger>
          <TabsTrigger value="logs">Bot loglari</TabsTrigger>
        </TabsList>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Bot sozlamalari</CardTitle>
              <CardDescription>Telegram bot uchun asosiy sozlamalar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="bot-token">Bot Token</Label>
                <Input
                  id="bot-token"
                  type="password"
                  value={botToken}
                  onChange={(e) => setBotToken(e.target.value)}
                  placeholder="1234567890:ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                />
                <p className="text-sm text-muted-foreground">
                  Bot tokenini{" "}
                  <a
                    href="https://t.me/BotFather"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    @BotFather
                  </a>{" "}
                  dan olishingiz mumkin
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="webhook-url">Webhook URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="webhook-url"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    placeholder="https://your-server.com/api/telegram-webhook"
                  />
                  <Button variant="outline" onClick={handleSetWebhook}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    O'rnatish
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Webhook URL - bu Telegram botdan kelgan xabarlarni qabul qilish uchun URL
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="bot-status">Bot statusi</Label>
                <Select value={botStatus} onValueChange={setBotStatus}>
                  <SelectTrigger id="bot-status">
                    <SelectValue placeholder="Bot statusini tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Ishlayapti</SelectItem>
                    <SelectItem value="inactive">O'chirilgan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4 pt-4">
                <h3 className="text-lg font-medium">Bot imkoniyatlari</h3>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>O'quvchilar uchun</Label>
                      <p className="text-sm text-muted-foreground">O'quvchilar uchun bot imkoniyatlari</p>
                    </div>
                    <Switch checked={true} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>O'qituvchilar uchun</Label>
                      <p className="text-sm text-muted-foreground">O'qituvchilar uchun bot imkoniyatlari</p>
                    </div>
                    <Switch checked={true} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Adminlar uchun</Label>
                      <p className="text-sm text-muted-foreground">Adminlar uchun bot imkoniyatlari</p>
                    </div>
                    <Switch checked={true} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Foydalanuvchilarni bog'lash</CardTitle>
              <CardDescription>Foydalanuvchilarni Telegram bot bilan bog'lash</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="relative w-full max-w-sm">
                  <Input
                    type="search"
                    placeholder="Qidirish..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                </div>
                <Dialog open={isLinkUserDialogOpen} onOpenChange={setIsLinkUserDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Foydalanuvchini bog'lash
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Foydalanuvchini bog'lash</DialogTitle>
                      <DialogDescription>Foydalanuvchini Telegram bot bilan bog'lash</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="user-type">Foydalanuvchi turi</Label>
                        <Select value={selectedUserType} onValueChange={setSelectedUserType}>
                          <SelectTrigger id="user-type">
                            <SelectValue placeholder="Foydalanuvchi turini tanlang" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="student">O'quvchi</SelectItem>
                            <SelectItem value="teacher">O'qituvchi</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="user">Foydalanuvchi</Label>
                        <Select value={selectedUser} onValueChange={setSelectedUser}>
                          <SelectTrigger id="user">
                            <SelectValue placeholder="Foydalanuvchini tanlang" />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedUserType === "student" &&
                              students.map((student) => (
                                <SelectItem key={student.id} value={student.id}>
                                  {student.name} - {student.id}
                                </SelectItem>
                              ))}
                            {selectedUserType === "teacher" &&
                              teachers.map((teacher) => (
                                <SelectItem key={teacher.id} value={teacher.id}>
                                  {teacher.name} - {teacher.id}
                                </SelectItem>
                              ))}
                            {selectedUserType === "admin" && <SelectItem value="admin">Admin</SelectItem>}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="telegram-id">Telegram ID</Label>
                        <Input
                          id="telegram-id"
                          value={telegramId}
                          onChange={(e) => setTelegramId(e.target.value)}
                          placeholder="123456789"
                        />
                        <p className="text-sm text-muted-foreground">Foydalanuvchining Telegram ID raqami</p>
                      </div>
                      <div className="grid gap-2">
                        <Label>Yoki havola orqali bog'lash</Label>
                        <div className="flex gap-2">
                          <Input
                            value={selectedUser ? handleGenerateLink() : ""}
                            readOnly
                            placeholder="Foydalanuvchini tanlang"
                          />
                          <Button
                            variant="outline"
                            onClick={() => {
                              if (selectedUser) {
                                navigator.clipboard.writeText(handleGenerateLink())
                              }
                            }}
                            disabled={!selectedUser}
                          >
                            <Copy className="h-4 w-4" />
                            <span className="sr-only">Nusxa olish</span>
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Bu havolani foydalanuvchiga yuboring. Foydalanuvchi havolani ochganda, u avtomatik ravishda
                          botga bog'lanadi.
                        </p>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsLinkUserDialogOpen(false)}>
                        Bekor qilish
                      </Button>
                      <Button onClick={handleLinkUser} disabled={!selectedUser || !telegramId}>
                        Bog'lash
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <Tabs defaultValue="students" className="space-y-4">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="students">O'quvchilar</TabsTrigger>
                  <TabsTrigger value="teachers">O'qituvchilar</TabsTrigger>
                  <TabsTrigger value="admins">Adminlar</TabsTrigger>
                </TabsList>
                <TabsContent value="students">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Ism Familiya</TableHead>
                          <TableHead>Telefon</TableHead>
                          <TableHead>Guruh</TableHead>
                          <TableHead>Status</TableHead>
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
                                <div className="font-medium">{student.name}</div>
                              </div>
                            </TableCell>
                            <TableCell>{student.phone}</TableCell>
                            <TableCell>{student.group}</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={
                                  student.linked
                                    ? "bg-green-50 text-green-700 border-green-200"
                                    : "bg-yellow-50 text-yellow-700 border-yellow-200"
                                }
                              >
                                {student.linked ? "Bog'langan" : "Bog'lanmagan"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {student.linked ? (
                                <Button variant="outline" size="sm">
                                  <UserCheck className="mr-2 h-4 w-4" />
                                  Bog'langan
                                </Button>
                              ) : (
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    setSelectedUserType("student")
                                    setSelectedUser(student.id)
                                    setIsLinkUserDialogOpen(true)
                                  }}
                                >
                                  <UserPlus className="mr-2 h-4 w-4" />
                                  Bog'lash
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
                <TabsContent value="teachers">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Ism Familiya</TableHead>
                          <TableHead>Telefon</TableHead>
                          <TableHead>Guruhlar soni</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Amallar</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredTeachers.map((teacher) => (
                          <TableRow key={teacher.id}>
                            <TableCell className="font-medium">{teacher.id}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback>{teacher.name.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div className="font-medium">{teacher.name}</div>
                              </div>
                            </TableCell>
                            <TableCell>{teacher.phone}</TableCell>
                            <TableCell>{teacher.groups}</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={
                                  teacher.linked
                                    ? "bg-green-50 text-green-700 border-green-200"
                                    : "bg-yellow-50 text-yellow-700 border-yellow-200"
                                }
                              >
                                {teacher.linked ? "Bog'langan" : "Bog'lanmagan"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {teacher.linked ? (
                                <Button variant="outline" size="sm">
                                  <UserCheck className="mr-2 h-4 w-4" />
                                  Bog'langan
                                </Button>
                              ) : (
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    setSelectedUserType("teacher")
                                    setSelectedUser(teacher.id)
                                    setIsLinkUserDialogOpen(true)
                                  }}
                                >
                                  <UserPlus className="mr-2 h-4 w-4" />
                                  Bog'lash
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
                <TabsContent value="admins">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Ism Familiya</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Amallar</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">ADMIN001</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>AD</AvatarFallback>
                              </Avatar>
                              <div className="font-medium">Admin</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              Bog'langan
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              <UserCheck className="mr-2 h-4 w-4" />
                              Bog'langan
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Bildirishnomalar</CardTitle>
              <CardDescription>Bot tomonidan yuboriladigan bildirishnomalar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Davomat bildirishnomalari</Label>
                    <p className="text-sm text-muted-foreground">
                      O'quvchi darsga kelganda yoki kelmagan bo'lsa bildirishnoma yuborish
                    </p>
                  </div>
                  <Switch checked={attendanceNotification} onCheckedChange={setAttendanceNotification} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>To'lov bildirishnomalari</Label>
                    <p className="text-sm text-muted-foreground">
                      To'lov qilinganda yoki to'lov muddati yaqinlashganda bildirishnoma yuborish
                    </p>
                  </div>
                  <Switch checked={paymentNotification} onCheckedChange={setPaymentNotification} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Dars jadvali bildirishnomalari</Label>
                    <p className="text-sm text-muted-foreground">Dars jadvali o'zgarganda bildirishnoma yuborish</p>
                  </div>
                  <Switch checked={scheduleNotification} onCheckedChange={setScheduleNotification} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Yangi guruh bildirishnomalari</Label>
                    <p className="text-sm text-muted-foreground">
                      O'qituvchiga yangi guruh tayinlanganda bildirishnoma yuborish
                    </p>
                  </div>
                  <Switch checked={newGroupNotification} onCheckedChange={setNewGroupNotification} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>O'quvchi chiqarilganda bildirishnomalar</Label>
                    <p className="text-sm text-muted-foreground">
                      O'quvchi guruhdan chiqarilganda bildirishnoma yuborish
                    </p>
                  </div>
                  <Switch checked={studentRemovalNotification} onCheckedChange={setStudentRemovalNotification} />
                </div>
              </div>

              <div className="grid gap-4 pt-4">
                <h3 className="text-lg font-medium">Xabar namunalari</h3>
                <div className="grid gap-2">
                  <Label htmlFor="welcome-message">Salomlashish xabari</Label>
                  <Textarea
                    id="welcome-message"
                    value={welcomeMessage}
                    onChange={(e) => setWelcomeMessage(e.target.value)}
                    placeholder="Assalomu alaykum! English Center CRM botiga xush kelibsiz."
                    rows={3}
                  />
                  <p className="text-sm text-muted-foreground">
                    Foydalanuvchi bot bilan birinchi marta muloqot qilganda yuboriladigan xabar
                  </p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="payment-reminder">To'lov eslatmasi</Label>
                  <Textarea
                    id="payment-reminder"
                    value={paymentReminder}
                    onChange={(e) => setPaymentReminder(e.target.value)}
                    placeholder="Hurmatli o'quvchi, to'lovni amalga oshirishni unutmang!"
                    rows={3}
                  />
                  <p className="text-sm text-muted-foreground">
                    To'lov muddati yaqinlashganda o'quvchilarga yuboriladigan xabar
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bot-users">
          <Card>
            <CardHeader>
              <CardTitle>Bot foydalanuvchilari</CardTitle>
              <CardDescription>Telegram bot bilan bog'langan foydalanuvchilar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-4">
                <div className="relative w-full max-w-sm">
                  <Input
                    type="search"
                    placeholder="Qidirish..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                </div>
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ism Familiya</TableHead>
                      <TableHead>Telegram ID</TableHead>
                      <TableHead>Rol</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Oxirgi faollik</TableHead>
                      <TableHead>Amallar</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBotUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{user.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>{user.telegramId}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              user.role === "admin"
                                ? "bg-purple-50 text-purple-700 border-purple-200"
                                : user.role === "teacher"
                                  ? "bg-blue-50 text-blue-700 border-blue-200"
                                  : "bg-green-50 text-green-700 border-green-200"
                            }
                          >
                            {user.role === "admin" ? "Admin" : user.role === "teacher" ? "O'qituvchi" : "O'quvchi"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              user.status === "active"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : "bg-red-50 text-red-700 border-red-200"
                            }
                          >
                            {user.status === "active" ? "Faol" : "Faol emas"}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.lastActive}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Xabar yuborish
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

        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle>Bot loglari</CardTitle>
              <CardDescription>Telegram bot faoliyati loglari</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] w-full rounded-md border">
                <div className="p-4">
                  <div className="space-y-4">
                    {botLogs.map((log) => (
                      <div key={log.id} className="flex items-start gap-4 rounded-lg border p-3">
                        <Activity className="h-5 w-5 text-muted-foreground" />
                        <div className="grid gap-1">
                          <div className="font-medium">{log.user || log.name}</div>
                          <div className="text-sm text-muted-foreground">{log.action}</div>
                          <div className="text-xs text-muted-foreground">{log.timestamp}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

