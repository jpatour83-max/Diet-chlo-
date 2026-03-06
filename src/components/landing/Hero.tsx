'use client'

import Link from 'next/link'
import { Calendar, Star, Shield, Award, ArrowRight, Leaf } from 'lucide-react'

function PortraitIllustration() {
  return (
    <svg viewBox="0 0 360 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Background organic shape */}
      <ellipse cx="180" cy="240" rx="150" ry="170" fill="#EEF4EE" />

      {/* Decorative leaves - top left */}
      <path d="M55 130 C40 100 70 85 80 110 C85 95 100 100 90 125 Z" fill="#3D7550" opacity="0.7" />
      <path d="M45 155 C25 130 50 110 65 138 Z" fill="#2D5A3D" opacity="0.5" />

      {/* Decorative leaves - top right */}
      <path d="M295 115 C315 90 340 110 320 135 C335 125 345 145 320 155 Z" fill="#3D7550" opacity="0.6" />
      <path d="M310 80 C330 60 350 80 335 100 Z" fill="#2D5A3D" opacity="0.4" />

      {/* Coat / body */}
      <path d="M90 370 L100 255 Q180 285 260 255 L270 370 Z" fill="#F0F9F4" />
      <path d="M100 255 Q125 280 155 275 L160 280 L155 260 Z" fill="#D8EBD8" />
      <path d="M260 255 Q235 280 205 275 L200 280 L205 260 Z" fill="#D8EBD8" />

      {/* Neck */}
      <rect x="163" y="218" width="34" height="42" rx="8" fill="#D4937A" />

      {/* Head */}
      <ellipse cx="180" cy="180" rx="62" ry="68" fill="#D4937A" />

      {/* Hair */}
      <path d="M118 165 C118 110 242 110 242 165 C242 130 238 100 180 95 C122 100 118 130 118 165 Z" fill="#5C3A1E" />
      <path d="M116 168 C108 145 112 195 122 215 C118 200 114 182 116 168 Z" fill="#5C3A1E" />
      <path d="M244 168 C252 145 248 195 238 215 C242 200 246 182 244 168 Z" fill="#5C3A1E" />
      <path d="M118 165 C115 190 120 210 125 220 C120 205 116 190 118 165 Z" fill="#4A2E16" />

      {/* Face details */}
      {/* Eyes */}
      <ellipse cx="158" cy="175" rx="8" ry="9" fill="#3C2415" />
      <ellipse cx="202" cy="175" rx="8" ry="9" fill="#3C2415" />
      <circle cx="160" cy="173" r="3" fill="white" />
      <circle cx="204" cy="173" r="3" fill="white" />
      {/* Eyebrows */}
      <path d="M148 162 Q158 157 168 161" stroke="#5C3A1E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M192 161 Q202 157 212 162" stroke="#5C3A1E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Nose */}
      <path d="M176 187 Q180 198 184 187" stroke="#B8826A" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Smile */}
      <path d="M162 205 Q180 218 198 205" stroke="#B8826A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Cheek blush */}
      <ellipse cx="145" cy="200" rx="12" ry="7" fill="#E8A898" opacity="0.35" />
      <ellipse cx="215" cy="200" rx="12" ry="7" fill="#E8A898" opacity="0.35" />

      {/* Stethoscope accent */}
      <path d="M155 270 Q150 290 160 300 Q175 310 180 305 Q185 310 200 300 Q210 290 205 270"
        stroke="#2D5A3D" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="180" cy="308" r="7" fill="#2D5A3D" />

      {/* Floating food icons */}
      {/* Avocado */}
      <ellipse cx="58" cy="290" rx="18" ry="24" fill="#6DB878" />
      <ellipse cx="58" cy="292" rx="11" ry="15" fill="#C8A96E" />
      <circle cx="58" cy="292" r="6" fill="#8B5E3C" />

      {/* Strawberry */}
      <path d="M300 180 C285 165 285 145 300 140 C315 145 315 165 300 180 Z" fill="#E85D5D" />
      <path d="M294 140 C296 130 300 126 300 126 C300 126 304 130 306 140" fill="#3D7550" />
      <circle cx="295" cy="158" r="1.5" fill="white" opacity="0.7" />
      <circle cx="305" cy="152" r="1.5" fill="white" opacity="0.7" />
      <circle cx="300" cy="165" r="1.5" fill="white" opacity="0.7" />

      {/* Lemon */}
      <ellipse cx="68" cy="345" rx="16" ry="12" fill="#F5E642" />
      <ellipse cx="60" cy="340" rx="5" ry="3" fill="#F5C842" />

      {/* Gold dots accent */}
      <circle cx="100" cy="95"  r="4" fill="#C8A96E" opacity="0.8" />
      <circle cx="265" cy="85"  r="5" fill="#C8A96E" opacity="0.6" />
      <circle cx="310" cy="320" r="3" fill="#C8A96E" opacity="0.7" />
      <circle cx="40"  cy="240" r="3" fill="#C8A96E" opacity="0.5" />
    </svg>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-cream flex items-center overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-sage rounded-full -translate-y-1/2 translate-x-1/3 opacity-70" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-sage rounded-full translate-y-1/2 -translate-x-1/3 opacity-50" />
      <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-forest-50 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-30" />

      {/* Gold accent dots */}
      <div className="absolute top-32 right-1/4 w-3 h-3 bg-gold-500 rounded-full opacity-60" />
      <div className="absolute top-2/3 left-1/3 w-2 h-2 bg-gold-500 rounded-full opacity-40" />
      <div className="absolute bottom-1/4 right-1/3 w-4 h-4 bg-forest-300 rounded-full opacity-30" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-28 pb-16">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* ── Left: Content ── */}
          <div className="max-w-xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white border border-forest-200 text-forest-700 px-4 py-2 rounded-full text-sm font-medium mb-8 shadow-sm">
              <Award className="w-4 h-4 text-gold-500" />
              Diététicienne diplômée d&apos;État — 5 ans d&apos;expérience
            </div>

            <h1 className="font-serif text-5xl lg:text-6xl xl:text-7xl font-bold text-forest-900 leading-[1.08] mb-6 text-balance">
              Votre santé{' '}
              <em className="not-italic text-forest-600">commence</em>{' '}
              dans l&apos;assiette
            </h1>

            <p className="text-xl text-forest-700/80 leading-relaxed mb-10">
              Je suis Chloé Constantin, diététicienne libérale certifiée. Je vous accompagne
              vers un équilibre alimentaire durable, bienveillant et adapté à votre vie.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/rendez-vous"
                className="inline-flex items-center justify-center gap-2.5 bg-forest-600 hover:bg-forest-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <Calendar className="w-5 h-5" />
                Consultation gratuite
              </Link>
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-sage text-forest-700 px-8 py-4 rounded-2xl font-semibold text-lg transition-all border-2 border-forest-200"
              >
                Mes services
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-5">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-500 text-gold-500" />
                  ))}
                </div>
                <span className="text-sm font-medium text-forest-700">4.9/5 · 200+ patients</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-forest-600" />
                <span className="text-sm font-medium text-forest-700">Remboursable mutuelle</span>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-forest-600" />
                <span className="text-sm font-medium text-forest-700">1ère consultation offerte</span>
              </div>
            </div>
          </div>

          {/* ── Right: Illustration card ── */}
          <div className="relative hidden lg:flex justify-center items-center">
            <div className="relative w-[400px] h-[470px]">
              {/* Outer glow frame */}
              <div className="absolute inset-0 bg-gradient-to-br from-forest-100 to-forest-200 rounded-[40px] rotate-2" />

              {/* Card */}
              <div className="absolute inset-0 bg-white rounded-[36px] shadow-2xl overflow-hidden">
                {/* Illustration area */}
                <div className="h-[310px] bg-gradient-to-br from-cream to-sage flex items-center justify-center pt-4 relative overflow-hidden">
                  <div className="w-[280px] h-[280px]">
                    <PortraitIllustration />
                  </div>
                </div>

                {/* Profile info */}
                <div className="px-6 py-5">
                  <p className="font-serif text-xl font-bold text-forest-900 mb-0.5">Chloé Constantin</p>
                  <p className="text-forest-600 text-sm font-medium mb-4">Diététicienne Nutritionniste · Hyères</p>
                  <div className="flex flex-wrap gap-2">
                    {['Perte de poids', 'Diabète', 'Rééquilibrage', '100% en ligne'].map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-sage text-forest-700 border border-forest-200 px-3 py-1 rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge — RDV confirmé */}
            <div className="absolute -top-5 -right-5 bg-white rounded-2xl shadow-xl px-4 py-3 border border-forest-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center">
                  <span className="text-green-600 text-lg font-bold">✓</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-forest-900">RDV confirmé</p>
                  <p className="text-xs text-forest-600">Aujourd&apos;hui 14h00</p>
                </div>
              </div>
            </div>

            {/* Floating badge — Consultation gratuite */}
            <div className="absolute -bottom-5 -left-5 bg-forest-600 rounded-2xl shadow-xl px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">1ère consultation</p>
                  <p className="text-xs text-forest-100 font-semibold">100% Gratuite</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

