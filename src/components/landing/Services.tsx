import { Scale, Salad, Stethoscope, ArrowRight, Check } from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    icon: Scale,
    emoji: '⚖️',
    title: 'Perte de Poids',
    tagline: 'Sans privation, pour de vrai.',
    description:
      'Un programme personnalisé et durable, adapté à votre mode de vie. Fini les régimes drastiques — je vous guide vers des changements concrets et pérennes.',
    features: [
      'Bilan nutritionnel complet',
      'Plan alimentaire sur-mesure',
      'Suivi régulier et motivant',
      'Soutien psychologique doux',
    ],
    bg:      'bg-forest-50',
    border:  'border-forest-100',
    iconBg:  'bg-forest-600',
    accent:  'text-forest-600',
  },
  {
    icon: Salad,
    emoji: '🥗',
    title: 'Rééquilibrage Alimentaire',
    tagline: 'Retrouvez la paix avec la nourriture.',
    description:
      'Une approche bienveillante pour construire une relation saine et durable avec votre alimentation — sans culpabilité ni interdits.',
    features: [
      'Éducation nutritionnelle',
      'Gestion des envies',
      'Alimentation intuitive',
      'Recettes adaptées à vos goûts',
    ],
    bg:      'bg-gold-100',
    border:  'border-gold-200',
    iconBg:  'bg-gold-500',
    accent:  'text-gold-600',
    featured: true,
  },
  {
    icon: Stethoscope,
    emoji: '🩺',
    title: 'Pathologies & Santé',
    tagline: 'Nutrition médicale spécialisée.',
    description:
      'Accompagnement diététique adapté aux pathologies nécessitant une attention nutritionnelle particulière — en collaboration avec votre médecin.',
    features: [
      'Diabète type 1 & 2',
      'Maladies cardiovasculaires',
      'Troubles thyroïdiens',
      'Troubles digestifs (SII, MICI…)',
    ],
    bg:      'bg-forest-50',
    border:  'border-forest-100',
    iconBg:  'bg-forest-600',
    accent:  'text-forest-600',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block bg-sage border border-forest-200 text-forest-700 px-4 py-1.5 rounded-full text-sm font-medium mb-5">
            Mon accompagnement
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-forest-900 mb-5">
            Un suivi adapté à{' '}
            <em className="not-italic text-forest-600">chaque besoin</em>
          </h2>
          <p className="text-lg text-forest-700/70 max-w-2xl mx-auto leading-relaxed">
            Que vous souhaitiez perdre du poids, rééquilibrer votre alimentation ou gérer
            une pathologie, je vous propose une prise en charge personnalisée et bienveillante.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s) => (
            <div
              key={s.title}
              className={`relative rounded-3xl border ${s.border} ${s.bg} p-8 flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${s.featured ? 'ring-2 ring-gold-400' : ''}`}
            >
              {s.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gold-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow">
                  ⭐ Le plus populaire
                </div>
              )}

              {/* Icon */}
              <div className={`w-14 h-14 ${s.iconBg} rounded-2xl flex items-center justify-center mb-6 shadow-md`}>
                <s.icon className="w-7 h-7 text-white" />
              </div>

              <p className={`text-xs font-semibold uppercase tracking-wider ${s.accent} mb-2`}>{s.tagline}</p>
              <h3 className="font-serif text-2xl font-bold text-forest-900 mb-3">{s.title}</h3>
              <p className="text-forest-700/70 leading-relaxed mb-6 flex-grow">{s.description}</p>

              <ul className="space-y-2.5 mb-8">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-forest-800 text-sm">
                    <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Check className="w-3 h-3 text-forest-600" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/rendez-vous"
                className={`inline-flex items-center gap-2 font-semibold text-sm transition-all group ${s.accent} hover:gap-3`}
              >
                Prendre rendez-vous
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>

        {/* Banner */}
        <div className="mt-16 bg-forest-600 rounded-4xl p-10 lg:p-14 flex flex-col lg:flex-row items-center justify-between gap-8 text-white">
          <div>
            <p className="text-forest-100 text-sm font-semibold uppercase tracking-wider mb-2">Offre de bienvenue</p>
            <h3 className="font-serif text-3xl lg:text-4xl font-bold mb-3">
              Première consultation offerte
            </h3>
            <p className="text-forest-100 text-lg max-w-xl">
              30 minutes pour faire le point sur vos habitudes alimentaires et découvrir comment
              je peux vous aider — sans engagement, sans frais.
            </p>
          </div>
          <Link
            href="/rendez-vous"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-forest-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-cream transition-all shadow-lg"
          >
            Réserver gratuitement
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

