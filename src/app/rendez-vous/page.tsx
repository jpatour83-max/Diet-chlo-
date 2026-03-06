import BookingForm from '@/components/booking/BookingForm'
import Link from 'next/link'
import { Leaf, ArrowLeft, Shield, Clock, Star } from 'lucide-react'

export const metadata = {
  title: "Prendre rendez-vous — Diét'Chloé",
  description: "Réservez votre consultation diététique en ligne avec Chloé Constantin. Consultations vidéo ou téléphone disponibles.",
}

const reassurance = [
  { icon: Star,   text: '1ère consultation gratuite (30 min)' },
  { icon: Shield, text: 'Remboursable selon mutuelle' },
  { icon: Clock,  text: 'Disponible en semaine & week-end' },
]

export default function RendezVousPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-forest-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-1.5 text-forest-600 hover:text-forest-500 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Retour</span>
            </Link>
            <div className="w-px h-5 bg-forest-100" />
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-forest-600 rounded-lg flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="font-serif font-bold text-forest-900">Diét&apos;Chloé</span>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm text-forest-600 font-medium">
            <Star className="w-4 h-4 text-gold-500" />
            1ère consultation offerte
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-14">
        {/* Page hero */}
        <div className="text-center mb-12">
          <span className="inline-block bg-sage border border-forest-200 text-forest-700 px-4 py-1.5 rounded-full text-sm font-medium mb-5">
            Prise de rendez-vous
          </span>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-forest-900 mb-4">
            Réservez votre consultation
          </h1>
          <p className="text-lg text-forest-700/70 max-w-lg mx-auto leading-relaxed">
            Avec Chloé Constantin, diététicienne nutritionniste — en ligne, depuis chez vous.
          </p>

          {/* Reassurance pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {reassurance.map(({ icon: Icon, text }) => (
              <div key={text} className="inline-flex items-center gap-2 bg-white border border-forest-100 text-forest-700 px-4 py-2 rounded-full text-sm shadow-sm">
                <Icon className="w-4 h-4 text-forest-600" />
                {text}
              </div>
            ))}
          </div>
        </div>

        <BookingForm />
      </main>
    </div>
  )
}

