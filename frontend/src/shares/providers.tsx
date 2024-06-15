import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import React from 'react'
import { Toaster } from 'sonner'

export function Providers ({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
      <Toaster
        toastOptions={{
          classNames: {
            success: ' dark box-border font-normal subpixel-antialiased outline-none  border-medium px-4 min-w-20 h-22 text-small gap-2 rounded-medium  border-default bg-default-100 text-primary ',
            error: 'dark box-border  font-normal subpixel-antialiased  outline-none  border-medium px-4 min-w-20 h-22 text-small gap-2 rounded-medium  border-default bg-default-100 text-danger '
          }
        }}
      />
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  )
}
