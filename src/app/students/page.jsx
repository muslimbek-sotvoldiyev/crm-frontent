"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"
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

export default function StudentsPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newStudent, setNewStudent] = useState({
    name: "",
    phone: "",
    email: "",
    group: "",
    birthDate: "",
    address: "",
  })

  return (
    <div className="container py-10">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">O'quvchilar</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Yangi o'quvchi
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Yangi o'quvchi qo'shish</DialogTitle>
              <DialogDescription>O'quvchi ma'lumotlarini kiriting</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="studentName">Ism Familiya</Label>
                <Input
                  id="studentName"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  placeholder="Ism Familiya"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="studentPhone">Telefon raqam</Label>
                <Input
                  id="studentPhone"
                  value={newStudent.phone}
                  onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                  placeholder="+998 90 123 45 67"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="studentEmail">Email</Label>
                <Input
                  id="studentEmail"
                  type="email"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                  placeholder="email@example.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="studentGroup">Guruh</Label>
                <Select
                  value={newStudent.group}
                  onValueChange={(value) => setNewStudent({ ...newStudent, group: value })}
                >
                  <SelectTrigger id="studentGroup">
                    <SelectValue placeholder="Guruhni tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Elementary A1">Elementary A1 - Ingliz tili</SelectItem>
                    <SelectItem value="Elementary A2">Elementary A2 - Ingliz tili</SelectItem>
                    <SelectItem value="Intermediate B1">Intermediate B1 - Ingliz tili</SelectItem>
                    <SelectItem value="Matematika 7-sinf">Matematika 7-sinf</SelectItem>
                    <SelectItem value="Matematika 8-sinf">Matematika 8-sinf</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="studentBirthDate">Tug'ilgan sana</Label>
                <Input
                  id="studentBirthDate"
                  value={newStudent.birthDate}
                  onChange={(e) => setNewStudent({ ...newStudent, birthDate: e.target.value })}
                  placeholder="01.01.2000"
                />
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
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Bekor qilish
              </Button>
              <Button
                onClick={() => {
                  console.log("Yangi o'quvchi:", newStudent)
                  setIsAddDialogOpen(false)
                  setNewStudent({ name: "", phone: "", email: "", group: "", birthDate: "", address: "" })
                }}
              >
                Qo'shish
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
