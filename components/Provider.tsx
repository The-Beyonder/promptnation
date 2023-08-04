'use client'
import { Session } from "next-auth"
import { SessionProvider, SessionProviderProps } from "next-auth/react"

const Provider = ({ children, session }: { children: React.ReactNode, session: undefined }) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>

  )
}

export default Provider