"use client";

import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useTokenVerifyQuery, useRefreshTokenMutation } from "@/lib/service/authApi";
import { useRouter } from "next/router";

const useAuth = () => {
  const router = useRouter();
  const [refreshToken] = useRefreshTokenMutation();
  const { error: meError, refetch: refetchMe } = useTokenVerifyQuery({});

  const clearAuthAndRedirect = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    router.push("/login");
  };

  useEffect(() => {
    if (meError && "status" in meError && meError.status === 401) {
      clearAuthAndRedirect();
      return;
    }
  }, [meError, router]);

  useEffect(() => {
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
              refresh: refreshTokenStr, // <-- bu yerda `refresh` deb yozilgan, `authApi` faylga mos
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
  }, [refetchMe, refreshToken, router]);

  return null;
};

export default useAuth;
