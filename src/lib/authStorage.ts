"use client"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { stateType, dispatchType } from "@/lib/store"
import { login, setLoaded } from "@/redux/authSlice"


export default function AuthStorage() {
  const dispatch = useDispatch<dispatchType>()
  const user = useSelector((state: stateType) => state.auth.user)
  const loaded = useSelector((state: stateType) => state.auth.loaded)


  useEffect(() => {
    try {
      // console.log("AuthStorage started");

      const saved = localStorage.getItem("user");

      // console.log("Saved user:", saved);

      if (saved) {
        dispatch(login(JSON.parse(saved)));
      }
    } catch (error) {
      // console.log("AuthStorage error:", error);
      localStorage.removeItem("user");
    } finally {
      dispatch(setLoaded());
      // console.log("AuthStorage finished");
    }
  }, [dispatch]);

  useEffect(() => {
    if (!loaded) return;

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [loaded, user]);


  return null
}