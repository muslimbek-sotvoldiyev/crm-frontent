"use client";
import { DashboardPage } from "@/components/dashboard-page";
import useAuth from "@/hooks/auth";
import { redirect } from "next/navigation";

export default function Home() {
  // const { mounted } = useAuth();
  
  // Client-side mount bo'lguncha kutish
  // if (!mounted) {
  //   return <div>Loading...</div>;
  // }

  // Bu yerda authentication logic
  // const isAuthenticated = typeof window !== 'undefined' && 
  //   localStorage.getItem("accessToken");
  
  // if (!isAuthenticated) {
  //   redirect("/login");
  //   return null;
  // }

  return <DashboardPage />;
}