"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { SunMedium, Moon, Monitor } from "lucide-react"
import { useTranslations } from "next-intl"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Theme() {
  const t = useTranslations("AdminDashboard.theme")
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const themes = [
    { value: "light", icon: SunMedium },
    { value: "dark", icon: Moon },
    { value: "system", icon: Monitor },
  ]

  let ActiveIcon = Monitor

  if (theme === "light") {
    ActiveIcon = SunMedium
  } else if (theme === "dark") {
    ActiveIcon = Moon
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <ActiveIcon size={19} />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="dark:text-current mt-2">
        <DropdownMenuRadioGroup
          value={theme}
          onValueChange={(value) => setTheme(value)}
        >
          <DropdownMenuRadioItem value="light"  className="focus:bg-[#F1EBFE] dark:focus:bg-[#c5a3fd3c] text-[#031381] dark:text-current">
            <SunMedium/>
            {t("light")}
          </DropdownMenuRadioItem>

          <DropdownMenuRadioItem value="dark" className="focus:bg-[#F1EBFE] text-[#031381] dark:text-current dark:focus:bg-[#c5a3fd3c]">
            <Moon />
            {t("dark")}
          </DropdownMenuRadioItem>

          <DropdownMenuRadioItem value="system" className="focus:bg-[#F1EBFE] text-[#031381] dark:text-current dark:focus:bg-[#c5a3fd3c]">
            <Monitor />
             {t("system")}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )

}