import type { Metadata } from 'next'
import AuthProvider from '@/components/admin/AuthProvider'
import AdminShell from '@/components/admin/AdminShell'

export const metadata: Metadata = {
  title: "Administration — Diét'Chloé",
  robots: 'noindex, nofollow',
}

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminShell>{children}</AdminShell>
    </AuthProvider>
  )
}
