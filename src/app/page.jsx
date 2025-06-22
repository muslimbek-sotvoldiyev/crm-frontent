"use client";
import { DashboardPage } from "@/components/dashboard-page";
import useAuth from "@/hooks/auth";
import { redirect } from "next/navigation"; // Import qo'shish

export default function Home() {
  // Hook komponent ichida chaqirilishi kerak
  const authResult = useAuth(); // Agar hook qiymat qaytarsa
  
  // Authentication tekshirish
  const isAuthenticated = false; // Bu qiymatni auth hook-dan oling
  
  if (!isAuthenticated) {
    redirect("/login");
    return null; // redirect dan keyin return
  }

  return <DashboardPage />;
}