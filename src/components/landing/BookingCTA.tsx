import Link from 'next/link'
import { Calendar, Phone, Video, Check, Mail, MapPin, Clock } from 'lucide-react'

export default function BookingCTA() {
  return (
    <>
      {/* Booking CTA Section */}
      <section id="contact" className="py-24 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                Prendre rendez-vous
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Commencez votre transformation{' '}
                <span className="text-emerald-500">aujourd&apos;hui</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Réservez votre première consultation et faites le premier pas vers une alimentation 
                équilibrée et une meilleure santé.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  'Première consultation de 30 min offerte',
                  'Aucun engagement à long terme',
                  'Disponible en semaine et le week-end',
                  'Remboursement possible selon mutuelle',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/rendez-vous"
                  className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-emerald-200 hover:shadow-xl"
                >
                  <Calendar className="w-5 h-5" />
                  Réserver en ligne
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Video className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-900">Consultation vidéo</h3>
                </div>
                <p className="text-gray-600 text-sm mb-3">Via Zoom ou Google Meet, depuis le confort de votre domicile.</p>
                <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                  <span>60€ / 60 min</span>
                  <span className="text-gray-300">|</span>
                  <span>45€ / 45 min (suivi)</span>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="font-bold text-gray-900">Téléphone</h3>
                </div>
                <p className="text-gray-600 text-sm">Simple et rapide, idéal pour les suivis.</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-gray-900">Horaires</h3>
                </div>
                <p className="text-gray-600 text-sm">Lun-Ven: 9h-19h<br />Sam: 9h-13h</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">D</span>
                </div>
                <span className="text-xl font-bold">Diét&apos;Chloé</span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6 max-w-sm">
                Cabinet de diététique libérale de Chloé Constantin. Accompagnement nutritionnel 
                personnalisé en ligne pour atteindre vos objectifs de santé.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-emerald-600 transition-colors">
                  <span className="text-sm font-bold">f</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-emerald-600 transition-colors">
                  <span className="text-sm font-bold">in</span>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Navigation</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#services" className="hover:text-emerald-400 transition-colors">Mes services</a></li>
                <li><a href="#comment" className="hover:text-emerald-400 transition-colors">Comment ça marche</a></li>
                <li><a href="#temoignages" className="hover:text-emerald-400 transition-colors">Témoignages</a></li>
                <li><Link href="/rendez-vous" className="hover:text-emerald-400 transition-colors">Prendre RDV</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Contact</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-500" />
                  <span>contact@dietchloe.fr</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-500" />
                  <span>06 XX XX XX XX</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-500" />
                  <span>Consultations en ligne</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 text-sm">
            <p>&copy; 2024 Chloé Constantin — Cabinet Diététique. Tous droits réservés.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-gray-300 transition-colors">Mentions légales</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Politique de confidentialité</a>
              <a href="#" className="hover:text-gray-300 transition-colors">CGV</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
