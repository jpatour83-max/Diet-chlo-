'use client'

import Link from 'next/link'
import { Calendar, Phone, Video, Star, ArrowRight, Leaf, Heart, Activity } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-teal-50" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxMGI5ODEiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTYgNnY2aDZ2LTZoLTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40" />
      
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">Diét&apos;Chloé</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-gray-600 hover:text-emerald-600 transition-colors">Services</a>
            <a href="#comment" className="text-gray-600 hover:text-emerald-600 transition-colors">Comment ça marche</a>
            <a href="#temoignages" className="text-gray-600 hover:text-emerald-600 transition-colors">Témoignages</a>
            <a href="#contact" className="text-gray-600 hover:text-emerald-600 transition-colors">Contact</a>
          </div>
          <Link
            href="/rendez-vous"
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
          >
            Prendre RDV
          </Link>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4 fill-emerald-500 text-emerald-500" />
              <span>Diététicienne certifiée - 5 ans d&apos;expérience</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Retrouvez votre{' '}
              <span className="text-emerald-500 relative">
                équilibre alimentaire
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 10C50 4 100 2 150 6C200 10 250 8 298 4" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>{' '}
              avec Chloé Constantin
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Diététicienne libérale certifiée, je vous accompagne avec des conseils personnalisés 
              pour atteindre vos objectifs de santé et bien-être. Consultations en ligne ou par téléphone.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link
                href="/rendez-vous"
                className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-emerald-200 hover:shadow-xl"
              >
                <Calendar className="w-5 h-5" />
                Prendre rendez-vous
              </Link>
              <a
                href="#services"
                className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all border border-gray-200 shadow-sm"
              >
                Découvrir mes services
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Video className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Consultation vidéo</p>
                  <p className="text-sm text-gray-500">Depuis chez vous</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Consultation téléphone</p>
                  <p className="text-sm text-gray-500">Simple et rapide</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl" />
              <div className="absolute inset-4 bg-white rounded-2xl shadow-2xl p-8 flex flex-col justify-between">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center">
                    <Leaf className="w-8 h-8 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">Chloé Constantin</p>
                    <p className="text-emerald-600 font-medium">Diététicienne Nutritionniste</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-emerald-50 rounded-xl p-4 flex items-center gap-3">
                    <Activity className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">Perte de poids</p>
                      <p className="text-xs text-gray-500">Programme personnalisé</p>
                    </div>
                  </div>
                  <div className="bg-teal-50 rounded-xl p-4 flex items-center gap-3">
                    <Heart className="w-6 h-6 text-teal-500 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">Rééquilibrage alimentaire</p>
                      <p className="text-xs text-gray-500">Approche durable</p>
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4 flex items-center gap-3">
                    <Star className="w-6 h-6 text-blue-500 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">Gestion des pathologies</p>
                      <p className="text-xs text-gray-500">Diabète, thyroïde, etc.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-emerald-600">200+</p>
                    <p className="text-xs text-gray-500">Patients</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-emerald-600">5 ans</p>
                    <p className="text-xs text-gray-500">d&apos;expérience</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-emerald-600">4.9★</p>
                    <p className="text-xs text-gray-500">Note moyenne</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg p-3 border border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-lg">✓</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-800">RDV confirmé</p>
                  <p className="text-xs text-gray-500">Aujourd&apos;hui 14h00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
