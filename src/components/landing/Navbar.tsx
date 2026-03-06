'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Leaf } from 'lucide-react'

const navLinks = [
  { href: '#services',    label: 'Services' },
  { href: '#about',       label: 'À propos' },
  { href: '#tarifs',      label: 'Tarifs' },
  { href: '#temoignages', label: 'Témoignages' },
  { href: '#contact',     label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-forest-100'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 bg-forest-600 rounded-xl flex items-center justify-center transition-colors group-hover:bg-forest-500">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <span className="font-serif text-xl font-semibold text-forest-800">
            Diét&apos;Chloé
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-sm font-medium text-forest-700 hover:text-forest-500 transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-3">
          <Link
            href="/rendez-vous"
            className="hidden md:inline-flex items-center gap-2 bg-forest-600 hover:bg-forest-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow hover:shadow-md hover:-translate-y-px"
          >
            Prendre RDV
          </Link>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            className="md:hidden p-2 rounded-lg text-forest-700 hover:bg-forest-50 transition-colors"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-white border-t border-forest-100 px-6 py-5 space-y-1 shadow-lg">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block py-3 text-forest-700 font-medium hover:text-forest-500 transition-colors border-b border-forest-50 last:border-0"
            >
              {label}
            </a>
          ))}
          <Link
            href="/rendez-vous"
            className="block mt-4 text-center bg-forest-600 text-white py-3.5 rounded-2xl font-semibold"
            onClick={() => setOpen(false)}
          >
            Prendre RDV
          </Link>
        </div>
      )}
    </header>
  )
}
