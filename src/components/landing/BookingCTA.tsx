import Link from 'next/link'
import { Calendar, Phone, Video, Check, Mail, MapPin, Clock, Leaf, Instagram, Facebook } from 'lucide-react'

const highlights = [
  'Première consultation de 30 min offerte',
  'Aucun engagement à long terme',
  'Disponible en semaine et le week-end',
  'Remboursement possible selon mutuelle',
]

const footerLinks = {
  navigation: [
    { href: '#services',    label: 'Mes services' },
    { href: '#about',       label: 'À propos' },
    { href: '#tarifs',      label: 'Tarifs' },
    { href: '#temoignages', label: 'Témoignages' },
    { href: '/rendez-vous', label: 'Prendre RDV' },
  ],
  legal: [
    { href: '#', label: 'Mentions légales' },
    { href: '#', label: 'Confidentialité' },
    { href: '#', label: 'CGV' },
  ],
}

export default function BookingCTA() {
  return (
    <>
      {/* ── CTA Section ── */}
      <section id="contact" className="py-28 bg-forest-600 overflow-hidden relative">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-forest-500 rounded-full -translate-y-1/2 translate-x-1/3 opacity-50" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-forest-700 rounded-full translate-y-1/2 -translate-x-1/4 opacity-40" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left: text + checklist */}
            <div>
              <span className="inline-block bg-white/15 text-white border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                Prendre rendez-vous
              </span>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                Commencez votre{' '}
                <em className="not-italic text-gold-300">transformation</em>{' '}
                aujourd&apos;hui
              </h2>
              <p className="text-forest-100 text-lg mb-8 leading-relaxed">
                Réservez votre première consultation gratuite et faites le premier pas vers
                une alimentation équilibrée et une vie en pleine forme.
              </p>

              <ul className="space-y-3 mb-10">
                {highlights.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-forest-100">{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/rendez-vous"
                className="inline-flex items-center gap-2.5 bg-white hover:bg-cream text-forest-700 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <Calendar className="w-5 h-5" />
                Réserver en ligne
              </Link>
            </div>

            {/* Right: info cards */}
            <div className="grid grid-cols-2 gap-4">
              {/* Video */}
              <div className="col-span-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <Video className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-white">Consultation vidéo</h3>
                </div>
                <p className="text-forest-100 text-sm mb-4">Via Zoom ou Google Meet, depuis le confort de votre domicile.</p>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="bg-white/20 text-white px-3 py-1 rounded-full font-semibold">60€ / 60 min</span>
                  <span className="bg-white/20 text-white px-3 py-1 rounded-full font-semibold">45€ / 45 min (suivi)</span>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-bold text-white text-sm">Téléphone</h3>
                </div>
                <p className="text-forest-200 text-xs leading-relaxed">Simple et rapide, idéal pour les consultations de suivi.</p>
              </div>

              {/* Hours */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-bold text-white text-sm">Horaires</h3>
                </div>
                <p className="text-forest-200 text-xs leading-relaxed">Lun–Ven : 9h–19h<br />Samedi : 9h–13h</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-forest-900 text-white pt-16 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-12 mb-12">

            {/* Brand col */}
            <div className="md:col-span-5">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 bg-forest-600 rounded-xl flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <span className="font-serif text-xl font-semibold">Diét&apos;Chloé</span>
              </div>
              <p className="text-forest-300 leading-relaxed mb-6 max-w-sm text-sm">
                Cabinet de diététique libérale de Chloé Constantin, diététicienne nutritionniste.
                Accompagnement nutritionnel personnalisé en ligne — partout en France.
              </p>
              {/* Social */}
              <div className="flex gap-3">
                <a
                  href="https://www.instagram.com"
                  aria-label="Instagram"
                  className="w-10 h-10 bg-forest-800 rounded-xl flex items-center justify-center hover:bg-forest-600 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://www.facebook.com"
                  aria-label="Facebook"
                  className="w-10 h-10 bg-forest-800 rounded-xl flex items-center justify-center hover:bg-forest-600 transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div className="md:col-span-3">
              <h4 className="font-semibold text-sm uppercase tracking-wider text-forest-400 mb-5">Navigation</h4>
              <ul className="space-y-3">
                {footerLinks.navigation.map(({ href, label }) => (
                  <li key={label}>
                    {href.startsWith('#') ? (
                      <a href={href} className="text-forest-300 hover:text-white transition-colors text-sm">
                        {label}
                      </a>
                    ) : (
                      <Link href={href} className="text-forest-300 hover:text-white transition-colors text-sm">
                        {label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="md:col-span-4">
              <h4 className="font-semibold text-sm uppercase tracking-wider text-forest-400 mb-5">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sm text-forest-300">
                  <Mail className="w-4 h-4 text-forest-500 flex-shrink-0" />
                  <span>contact@dietchloe.fr</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-forest-300">
                  <Phone className="w-4 h-4 text-forest-500 flex-shrink-0" />
                  <span>06 XX XX XX XX</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-forest-300">
                  <MapPin className="w-4 h-4 text-forest-500 flex-shrink-0 mt-0.5" />
                  <span>Hyères (83) — Consultations 100% en ligne</span>
                </li>
              </ul>

              <div className="mt-6 bg-forest-800 rounded-2xl p-4 border border-forest-700">
                <p className="text-xs text-forest-400 font-medium mb-1">Remboursement mutuelle</p>
                <p className="text-sm text-forest-200">La plupart des mutuelles remboursent les consultations diététiques. Renseignez-vous auprès de la vôtre.</p>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-forest-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-forest-500 text-xs">
            <p>© 2025 Chloé Constantin — Cabinet Diététique. Tous droits réservés.</p>
            <div className="flex gap-6">
              {footerLinks.legal.map(({ href, label }) => (
                <a key={label} href={href} className="hover:text-forest-300 transition-colors">
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

