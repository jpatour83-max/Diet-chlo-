import { Scale, Salad, Stethoscope, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    icon: Scale,
    title: 'Perte de Poids',
    description:
      'Un programme de perte de poids personnalisé et durable, adapté à votre mode de vie. Sans privation ni régime drastique.',
    features: ['Bilan nutritionnel complet', 'Plan alimentaire sur mesure', 'Suivi hebdomadaire', 'Soutien psychologique'],
    color: 'from-emerald-400 to-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
  },
  {
    icon: Salad,
    title: 'Rééquilibrage Alimentaire',
    description:
      'Retrouvez une relation saine avec la nourriture grâce à une approche équilibrée et bienveillante de l\'alimentation.',
    features: ['Éducation nutritionnelle', 'Gestion des envies', 'Alimentation intuitive', 'Recettes adaptées'],
    color: 'from-teal-400 to-teal-600',
    bg: 'bg-teal-50',
    border: 'border-teal-100',
  },
  {
    icon: Stethoscope,
    title: 'Prise en Charge de Pathologies',
    description:
      'Accompagnement diététique spécialisé pour les pathologies nécessitant une attention nutritionnelle particulière.',
    features: ['Diabète type 1 & 2', 'Maladies cardiovasculaires', 'Troubles thyroïdiens', 'Troubles digestifs'],
    color: 'from-blue-400 to-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            Mes services
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Un accompagnement adapté à{' '}
            <span className="text-emerald-500">chaque besoin</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Que vous souhaitiez perdre du poids, rééquilibrer votre alimentation ou gérer une pathologie, 
            je vous propose une prise en charge personnalisée et bienveillante.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className={`relative rounded-2xl border ${service.border} ${service.bg} p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 shadow-lg`}>
                <service.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
              <ul className="space-y-2 mb-8">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-gray-700">
                    <span className="w-5 h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/rendez-vous"
                className="flex items-center gap-2 text-emerald-600 font-semibold hover:gap-3 transition-all"
              >
                Prendre rendez-vous
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl p-10 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Première consultation offerte</h3>
          <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
            Profitez d&apos;un bilan nutritionnel gratuit de 30 minutes pour discuter de vos objectifs 
            et découvrir comment je peux vous aider.
          </p>
          <Link
            href="/rendez-vous"
            className="inline-flex items-center gap-2 bg-white text-emerald-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-emerald-50 transition-colors shadow-lg"
          >
            <ArrowRight className="w-5 h-5" />
            Réserver ma consultation gratuite
          </Link>
        </div>
      </div>
    </section>
  )
}
