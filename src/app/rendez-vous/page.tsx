import BookingForm from '@/components/booking/BookingForm'
import Link from 'next/link'
import { Leaf, ArrowLeft } from 'lucide-react'

export const metadata = {
  title: "Prendre rendez-vous — Diét'Chloé",
  description: "Réservez votre consultation diététique en ligne avec Chloé Constantin. Consultations vidéo ou téléphone disponibles.",
}

export default function RendezVousPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Retour</span>
            </Link>
            <div className="w-px h-5 bg-gray-200" />
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-emerald-500 rounded-lg flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-gray-800">Diét&apos;Chloé</span>
            </div>
          </div>
          <span className="text-sm text-gray-500 hidden sm:block">Consultation en ligne · 60€</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Prendre rendez-vous
          </h1>
          <p className="text-xl text-gray-600">
            Réservez votre consultation avec Chloé Constantin, diététicienne nutritionniste
          </p>
        </div>

        <BookingForm />
      </main>
    </div>
  )
}
