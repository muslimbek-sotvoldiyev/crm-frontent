"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Save, Plus, Trash2, Edit } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data
const initialSettings = {
  centerName: "English Center",
  address: "Toshkent, Chilonzor tumani",
  phone: "+998 90 123 45 67",
  email: "info@englishcenter.uz",
  currency: "UZS",
  timezone: "Asia/Tashkent",
  language: "uz",
  autoBackup: true,
  emailNotifications: true,
  smsNotifications: false,
}

const discountTypes = [
  {
    id: 1,
    name: "2+ kurs chegirmasi",
    type: "percentage",
    value: 10,
    description: "2 yoki undan ko'p kursga yozilganda",
  },
  {
    id: 2,
    name: "3+ kurs chegirmasi",
    type: "percentage",
    value: 15,
    description: "3 yoki undan ko'p kursga yozilganda",
  },
  { id: 3, name: "Oilaviy chegirma", type: "percentage", value: 20, description: "Bir oiladan 2+ o'quvchi" },
  { id: 4, name: "Erta to'lov", type: "fixed", value: 50000, description: "Oyning 1-5 kunigacha to'lov" },
  { id: 5, name: "Yillik to'lov", type: "percentage", value: 25, description: "Butun yil uchun oldindan to'lov" },
]

const paymentMethods = [
  { id: 1, name: "Naqd", active: true },
  { id: 2, name: "Karta", active: true },
  { id: 3, name: "Bank o'tkazmasi", active: true },
  { id: 4, name: "Click", active: false },
  { id: 5, name: "Payme", active: false },
]

const coursePrices = [
  { id: 1, level: "Elementary", price: 450000, duration: "3 oy" },
  { id: 2, level: "Intermediate", price: 500000, duration: "3 oy" },
  { id: 3, level: "Advanced", price: 550000, duration: "3 oy" },
  { id: 4, level: "IELTS", price: 600000, duration: "2 oy" },
]

const systemUsers = [
  { id: 1, name: "Admin", username: "admin", role: "admin", active: true, lastLogin: "16.03.2023 15:30" },
  { id: 2, name: "Aziza Karimova", username: "aziza", role: "teacher", active: true, lastLogin: "16.03.2023 14:20" },
  { id: 3, name: "Bobur Aliyev", username: "bobur", role: "teacher", active: true, lastLogin: "15.03.2023 18:45" },
  { id: 4, name: "Kassir", username: "kassir", role: "cashier", active: true, lastLogin: "16.03.2023 12:10" },
]

export default function SettingsPage() {
  const [settings, setSettings] = useState(initialSettings)
  const [activeTab, setActiveTab] = useState("general")
  const [isAddDiscountDialogOpen, setIsAddDiscountDialogOpen] = useState(false)
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false)
  const [newDiscount, setNewDiscount] = useState({
    name: "",
    type: "percentage",
    value: "",
    description: "",
  })
  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    password: "",
    role: "teacher",
  })

  const handleSaveSettings = () => {
    console.log("Settings saved:", settings)
    // In a real application, this would save to backend
  }

  const handleAddDiscount = () => {
    console.log("Adding discount:", newDiscount)
    setIsAddDiscountDialogOpen(false)
    setNewDiscount({ name: "", type: "percentage", value: "", description: "" })
  }

  const handleAddUser = () => {
    console.log("Adding user:", newUser)
    setIsAddUserDialogOpen(false)
    setNewUser({ name: "", username: "", password: "", role: "teacher" })
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Sozlamalar</h2>
        <Button onClick={handleSaveSettings}>
          <Save className="mr-2 h-4 w-4" />
          Saqlash
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-6 w-full">
          <TabsTrigger value="general">Umumiy</TabsTrigger>
          <TabsTrigger value="pricing">Narxlar</TabsTrigger>
          <TabsTrigger value="discounts">Chegirmalar</TabsTrigger>
          <TabsTrigger value="payments">To'lov usullari</TabsTrigger>
          <TabsTrigger value="users">Foydalanuvchilar</TabsTrigger>
          <TabsTrigger value="backup">Zaxira nusxa</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Umumiy sozlamalar</CardTitle>
              <CardDescription>Markaz haqida asosiy ma'lumotlar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="centerName">Markaz nomi</Label>
                  <Input
                    id="centerName"
                    value={settings.centerName}
                    onChange={(e) => setSettings({ ...settings, centerName: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    id="phone"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="currency">Valyuta</Label>
                  <Select
                    value={settings.currency}
                    onValueChange={(value) => setSettings({ ...settings, currency: value })}
                  >
                    <SelectTrigger id="currency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UZS">O'zbek so'mi (UZS)</SelectItem>
                      <SelectItem value="USD">Dollar (USD)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Manzil</Label>
                <Input
                  id="address"
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                />
              </div>

              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-medium">Bildirishnomalar</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email bildirishnomalar</Label>
                      <p className="text-sm text-muted-foreground">Email orqali bildirishnomalar yuborish</p>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>SMS bildirishnomalar</Label>
                      <p className="text-sm text-muted-foreground">SMS orqali bildirishnomalar yuborish</p>
                    </div>
                    <Switch
                      checked={settings.smsNotifications}
                      onCheckedChange={(checked) => setSettings({ ...settings, smsNotifications: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Avtomatik zaxira nusxa</Label>
                      <p className="text-sm text-muted-foreground">Har kuni avtomatik zaxira nusxa yaratish</p>
                    </div>
                    <Switch
                      checked={settings.autoBackup}
                      onCheckedChange={(checked) => setSettings({ ...settings, autoBackup: checked })}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing">
          <Card>
            <CardHeader>
              <CardTitle>Kurs narxlari</CardTitle>
              <CardDescription>Har bir kurs darajasi uchun narxlar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Daraja</TableHead>
                      <TableHead>Narx (oylik)</TableHead>
                      <TableHead>Davomiyligi</TableHead>
                      <TableHead>Amallar</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {coursePrices.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">{course.level}</TableCell>
                        <TableCell>{course.price.toLocaleString()} so'm</TableCell>
                        <TableCell>{course.duration}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <Edit className="mr-2 h-4 w-4" />
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

        <TabsContent value="discounts">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Chegirmalar</CardTitle>
                  <CardDescription>O'quvchilar uchun chegirma turlari</CardDescription>
                </div>
                <Dialog open={isAddDiscountDialogOpen} onOpenChange={setIsAddDiscountDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Yangi chegirma
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Yangi chegirma qo'shish</DialogTitle>
                      <DialogDescription>Chegirma ma'lumotlarini kiriting</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="discountName">Chegirma nomi</Label>
                        <Input
                          id="discountName"
                          value={newDiscount.name}
                          onChange={(e) => setNewDiscount({ ...newDiscount, name: e.target.value })}
                          placeholder="Chegirma nomi"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="discountType">Chegirma turi</Label>
                        <Select
                          value={newDiscount.type}
                          onValueChange={(value) => setNewDiscount({ ...newDiscount, type: value })}
                        >
                          <SelectTrigger id="discountType">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="percentage">Foiz (%)</SelectItem>
                            <SelectItem value="fixed">Qat'iy summa</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="discountValue">
                          Qiymati {newDiscount.type === "percentage" ? "(%)" : "(so'm)"}
                        </Label>
                        <Input
                          id="discountValue"
                          type="number"
                          value={newDiscount.value}
                          onChange={(e) => setNewDiscount({ ...newDiscount, value: e.target.value })}
                          placeholder={newDiscount.type === "percentage" ? "10" : "50000"}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="discountDescription">Tavsif</Label>
                        <Input
                          id="discountDescription"
                          value={newDiscount.description}
                          onChange={(e) => setNewDiscount({ ...newDiscount, description: e.target.value })}
                          placeholder="Chegirma tavsifi"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddDiscountDialogOpen(false)}>
                        Bekor qilish
                      </Button>
                      <Button onClick={handleAddDiscount}>Qo'shish</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nomi</TableHead>
                      <TableHead>Turi</TableHead>
                      <TableHead>Qiymati</TableHead>
                      <TableHead>Tavsif</TableHead>
                      <TableHead>Amallar</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {discountTypes.map((discount) => (
                      <TableRow key={discount.id}>
                        <TableCell className="font-medium">{discount.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{discount.type === "percentage" ? "Foiz" : "Qat'iy summa"}</Badge>
                        </TableCell>
                        <TableCell>
                          {discount.type === "percentage"
                            ? `${discount.value}%`
                            : `${discount.value.toLocaleString()} so'm`}
                        </TableCell>
                        <TableCell>{discount.description}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
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

        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>To'lov usullari</CardTitle>
              <CardDescription>Qabul qilinadigan to'lov usullari</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>To'lov usuli</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Amallar</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentMethods.map((method) => (
                      <TableRow key={method.id}>
                        <TableCell className="font-medium">{method.name}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              method.active
                                ? "bg-green-50 text-green-700 border-green-200"
                                : "bg-red-50 text-red-700 border-red-200"
                            }
                          >
                            {method.active ? "Faol" : "Faol emas"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Switch checked={method.active} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Tizim foydalanuvchilari</CardTitle>
                  <CardDescription>CRM tizimiga kirish huquqi bo'lgan foydalanuvchilar</CardDescription>
                </div>
                <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Yangi foydalanuvchi
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Yangi foydalanuvchi qo'shish</DialogTitle>
                      <DialogDescription>Foydalanuvchi ma'lumotlarini kiriting</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="userName">Ism Familiya</Label>
                        <Input
                          id="userName"
                          value={newUser.name}
                          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                          placeholder="Ism Familiya"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="username">Foydalanuvchi nomi</Label>
                        <Input
                          id="username"
                          value={newUser.username}
                          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                          placeholder="username"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="password">Parol</Label>
                        <Input
                          id="password"
                          type="password"
                          value={newUser.password}
                          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                          placeholder="••••••••"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="role">Rol</Label>
                        <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                          <SelectTrigger id="role">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="teacher">O'qituvchi</SelectItem>
                            <SelectItem value="cashier">Kassir</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddUserDialogOpen(false)}>
                        Bekor qilish
                      </Button>
                      <Button onClick={handleAddUser}>Qo'shish</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Foydalanuvchi</TableHead>
                      <TableHead>Username</TableHead>
                      <TableHead>Rol</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Oxirgi kirish</TableHead>
                      <TableHead>Amallar</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {systemUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{user.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>{user.username}</TableCell>
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
                            {user.role === "admin" ? "Admin" : user.role === "teacher" ? "O'qituvchi" : "Kassir"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              user.active
                                ? "bg-green-50 text-green-700 border-green-200"
                                : "bg-red-50 text-red-700 border-red-200"
                            }
                          >
                            {user.active ? "Faol" : "Faol emas"}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.lastLogin}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
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

        <TabsContent value="backup">
          <Card>
            <CardHeader>
              <CardTitle>Zaxira nusxa</CardTitle>
              <CardDescription>Ma'lumotlarni zaxiralash va tiklash</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Zaxira nusxa yaratish</h3>
                  <p className="text-sm text-muted-foreground">Barcha ma'lumotlarning zaxira nusxasini yarating</p>
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Zaxira nusxa yaratish
                  </Button>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Ma'lumotlarni tiklash</h3>
                  <p className="text-sm text-muted-foreground">
                    Avval yaratilgan zaxira nusxadan ma'lumotlarni tiklang
                  </p>
                  <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Fayl tanlash
                  </Button>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-medium">Oxirgi zaxira nusxalar</h3>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Sana</TableHead>
                        <TableHead>Hajmi</TableHead>
                        <TableHead>Turi</TableHead>
                        <TableHead>Amallar</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>16.03.2023 02:00</TableCell>
                        <TableCell>2.5 MB</TableCell>
                        <TableCell>
                          <Badge variant="outline">Avtomatik</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Yuklab olish
                            </Button>
                            <Button variant="outline" size="sm">
                              Tiklash
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>15.03.2023 02:00</TableCell>
                        <TableCell>2.3 MB</TableCell>
                        <TableCell>
                          <Badge variant="outline">Avtomatik</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Yuklab olish
                            </Button>
                            <Button variant="outline" size="sm">
                              Tiklash
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
