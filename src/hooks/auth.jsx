"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useTokenVerifyQuery, useRefreshTokenMutation } from "@/lib/service/authApi";
import { useRouter } from "next/navigation"; // ✅ To'g'ri import

const useAuth = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [refreshToken] = useRefreshTokenMutation();
  const { error: meError, refetch: refetchMe } = useTokenVerifyQuery({});

  // Client-side mount tekshirish
  useEffect(() => {
    setMounted(true);
  }, []);

  const clearAuthAndRedirect = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    }
    router.push("/login");
  };

  useEffect(() => {
    if (meError && "status" in meError && meError.status === 401) {
      clearAuthAndRedirect();
      return;
    }
  }, [meError]);

  useEffect(() => {
    // Faqat client-side da ishga tushirish
    if (!mounted) return;

    const accessToken = localStorage.getItem("accessToken");
    const refreshTokenStr = localStorage.getItem("refreshToken");

    if (!accessToken || !refreshTokenStr) {
      clearAuthAndRedirect();
      return;
    }

    let decodedToken;
    try {
      decodedToken = jwtDecode(accessToken);
    } catch (error) {
      console.error("Error decoding token:", error);
      clearAuthAndRedirect();
      return;
    }

    const isTokenExpired = decodedToken.exp * 1000 < Date.now();

    const verifyAndRefresh = async () => {
      try {
        await refetchMe().unwrap();
      } catch (error) {
        if (error?.status === 401) {
          try {
            const refreshResponse = await refreshToken({
              refresh: refreshTokenStr,
            }).unwrap();

            if (refreshResponse?.accessToken) {
              localStorage.setItem("accessToken", refreshResponse.accessToken);
              await refetchMe().unwrap();
            } else {
              throw new Error("Invalid refresh response");
            }
          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
            clearAuthAndRedirect();
          }
        } else {
          console.error("User data fetch failed:", error);
          clearAuthAndRedirect();
        }
      }
    };

    if (isTokenExpired) {
      verifyAndRefresh();
    } else {
      refetchMe();
    }
  }, [mounted, refetchMe, refreshToken]);

  return { mounted };
};

export default useAuth;