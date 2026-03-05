'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import {
  LayoutDashboard, Users, Calendar, Megaphone, LogOut, Leaf,
  ChevronRight, Settings, User,
} from 'lucide-react'

const navItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'Tableau de bord', exact: true },
  { href: '/admin/patients', icon: Users, label: 'Patients' },
  { href: '/admin/rendez-vous', icon: Calendar, label: 'Rendez-vous' },
  { href: '/admin/marketing', icon: Megaphone, label: 'Marketing' },
]

export default function Sidebar() {
  const pathname = usePathname()

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col min-h-screen fixed left-0 top-0 bottom-0 z-30">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-white">Diét&apos;Chloé</p>
            <p className="text-xs text-gray-400">Administration</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider px-3 mb-3">Principal</p>
        {navItems.map(({ href, icon: Icon, label, exact }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${
              isActive(href, exact)
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium text-sm">{label}</span>
            {isActive(href, exact) && <ChevronRight className="w-4 h-4 ml-auto" />}
          </Link>
        ))}
      </nav>

      {/* Bottom actions */}
      <div className="p-4 border-t border-gray-800 space-y-1">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400">
          <User className="w-5 h-5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Chloé Constantin</p>
            <p className="text-xs text-gray-400 truncate">admin@dietchloe.fr</p>
          </div>
        </div>
        <Link
          href="/admin/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:bg-gray-800 hover:text-white transition-all"
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium text-sm">Paramètres</span>
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:bg-red-900/20 hover:text-red-400 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium text-sm">Déconnexion</span>
        </button>
      </div>
    </aside>
  )
}
