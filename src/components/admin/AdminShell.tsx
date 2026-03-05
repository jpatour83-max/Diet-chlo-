'use client'

import { usePathname } from 'next/navigation'
import Sidebar from '@/components/admin/Sidebar'

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/admin/login'

  if (isLoginPage) {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-64">
        <div className="min-h-screen">
          {children}
        </div>
      </div>
    </div>
  )
}
