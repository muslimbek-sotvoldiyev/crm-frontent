import { DashboardPage } from "@/components/dashboard-page"

export default function Home() {
  // In a real application, you would check for authentication here
  // If not authenticated, redirect to login page
  // For demo purposes, we'll just render the dashboard

  // Uncomment this to enable authentication check
  // const isAuthenticated = false;
  // if (!isAuthenticated) {
  //   redirect("/login");
  // }

  return <DashboardPage />
}

