"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { OverviewChart } from "@/components/overview-chart"
import { RecentStudents } from "@/components/recent-students"
import { AttendanceChart } from "@/components/attendance-chart"
import { PaymentChart } from "@/components/payment-chart"
import { DebtStudents } from "@/components/debt-students"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jami o'quvchilar</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
            <p className="text-xs text-muted-foreground">+12% o'tgan oyga nisbatan</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faol guruhlar</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-4" />
              <path d="M12 16v4" />
              <path d="M8 20h8" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">+2 guruh bu oy</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jami o'qituvchilar</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+1 o'qituvchi bu oy</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">To'lovlar</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24,500,000</div>
            <p className="text-xs text-muted-foreground">+18% o'tgan oyga nisbatan</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Umumiy ko'rinish</TabsTrigger>
          <TabsTrigger value="debts">Qarzdorlar</TabsTrigger>
          <TabsTrigger value="bot">Telegram Bot</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle>O'quvchilar soni dinamikasi</CardTitle>
                  <CardDescription>Oxirgi 6 oy davomida o'quvchilar soni o'zgarishi</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pl-2">
                <OverviewChart />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Davomat statistikasi</CardTitle>
                <CardDescription>Guruhlar bo'yicha davomat ko'rsatkichlari</CardDescription>
              </CardHeader>
              <CardContent>
                <AttendanceChart />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle>Yangi qo'shilgan o'quvchilar</CardTitle>
                  <CardDescription>Oxirgi 10 ta yangi qo'shilgan o'quvchilar</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/students">
                    Barchasi <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <RecentStudents />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>To'lovlar statistikasi</CardTitle>
                <CardDescription>Oylik to'lovlar statistikasi</CardDescription>
              </CardHeader>
              <CardContent>
                <PaymentChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="debts">
          <Card>
            <CardHeader>
              <CardTitle>Qarzdor o'quvchilar</CardTitle>
              <CardDescription>To'lov muddati o'tgan o'quvchilar ro'yxati</CardDescription>
            </CardHeader>
            <CardContent>
              <DebtStudents />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="bot">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Bot holati</CardTitle>
                <CardDescription>Telegram bot holati va statistikasi</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <span className="font-medium">Bot holati: Ishlayapti</span>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/bot-settings">Sozlamalar</Link>
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg border p-3">
                      <div className="text-sm text-muted-foreground">Bog'langan foydalanuvchilar</div>
                      <div className="text-2xl font-bold">156</div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="text-sm text-muted-foreground">Bugun faol</div>
                      <div className="text-2xl font-bold">42</div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="text-sm text-muted-foreground">Yuborilgan xabarlar</div>
                      <div className="text-2xl font-bold">1,245</div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="text-sm text-muted-foreground">Bog'lanmagan o'quvchilar</div>
                      <div className="text-2xl font-bold">89</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Oxirgi faoliyat</CardTitle>
                <CardDescription>Bot orqali amalga oshirilgan so'nggi harakatlar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { user: "Alisher Zokirov", action: "Davomat ko'rish", time: "15:45" },
                    { user: "Malika Karimova", action: "To'lov ma'lumotlarini ko'rish", time: "14:30" },
                    { user: "Aziza Karimova", action: "Guruh davomatini belgilash", time: "12:20" },
                    { user: "Admin", action: "Eslatma yuborish", time: "11:00" },
                    { user: "Bobur Aliyev", action: "Dars jadvalini ko'rish", time: "10:15" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{activity.user.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{activity.user}</div>
                          <div className="text-sm text-muted-foreground">{activity.action}</div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-7">
              <CardHeader>
                <CardTitle>Bog'lanmagan o'quvchilar</CardTitle>
                <CardDescription>Telegram botga hali bog'lanmagan o'quvchilar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Ism Familiya</TableHead>
                        <TableHead>Guruh</TableHead>
                        <TableHead>Telefon</TableHead>
                        <TableHead>Amallar</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { id: "STD003", name: "Jasur Toshmatov", group: "Advanced C1", phone: "+998 93 345 67 89" },
                        {
                          id: "STD004",
                          name: "Nilufar Rahimova",
                          group: "Intermediate B2",
                          phone: "+998 94 456 78 90",
                        },
                        { id: "STD006", name: "Zarina Umarova", group: "Intermediate B1", phone: "+998 97 678 90 12" },
                        { id: "STD012", name: "Rustam Kamolov", group: "Elementary A2", phone: "+998 90 123 45 67" },
                        { id: "STD018", name: "Dilshod Rahimov", group: "Advanced C1", phone: "+998 91 234 56 78" },
                      ].map((student, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{student.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>{student.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div className="font-medium">{student.name}</div>
                            </div>
                          </TableCell>
                          <TableCell>{student.group}</TableCell>
                          <TableCell>{student.phone}</TableCell>
                          <TableCell>
                            <Button size="sm">Bog'lash havolasini yuborish</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
