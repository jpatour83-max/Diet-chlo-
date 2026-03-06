import Link from 'next/link'
import { Check, ArrowRight, Star } from 'lucide-react'

const plans = [
  {
    name: 'Découverte',
    price: 'Gratuit',
    sub: 'Sans engagement',
    desc: 'Idéal pour faire connaissance et évaluer si mon approche vous correspond.',
    features: [
      'Consultation de 30 min (vidéo ou téléphone)',
      'Évaluation de vos habitudes alimentaires',
      'Présentation de la méthode',
      'Réponse à vos questions',
    ],
    cta: 'Réserver gratuitement',
    featured: false,
    badgeColor: 'bg-forest-50 border-forest-200 text-forest-800',
    ctaClass: 'bg-forest-600 hover:bg-forest-500 text-white',
  },
  {
    name: 'Consultation',
    price: '60€',
    sub: 'Par séance',
    desc: 'Une consultation complète avec plan alimentaire sur mesure et suivi personnalisé.',
    features: [
      'Consultation de 60 min',
      'Bilan nutritionnel complet',
      'Plan alimentaire personnalisé',
      'Conseils et recettes adaptés',
      'Compte-rendu écrit',
      'Accès messagerie entre les séances',
    ],
    cta: 'Réserver une séance',
    featured: true,
    badgeColor: 'bg-forest-600 text-white border-forest-600',
    ctaClass: 'bg-white hover:bg-cream text-forest-700',
  },
  {
    name: 'Pack Suivi',
    price: '150€',
    sub: '3 séances · économie de 30€',
    desc: 'L\'option idéale pour un suivi régulier et une transformation durable.',
    features: [
      '3 consultations de 45–60 min',
      'Plan alimentaire évolutif',
      'Ajustements à chaque séance',
      'Bilan de composition corporelle',
      'Support entre les consultations',
      'Validité 3 mois',
    ],
    cta: 'Choisir ce pack',
    featured: false,
    badgeColor: 'bg-gold-100 border-gold-300 text-forest-800',
    ctaClass: 'bg-forest-600 hover:bg-forest-500 text-white',
  },
]

export default function Pricing() {
  return (
    <section id="tarifs" className="py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block bg-white border border-forest-200 text-forest-700 px-4 py-1.5 rounded-full text-sm font-medium mb-5">
            Tarifs
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-forest-900 mb-5">
            Des formules{' '}
            <em className="not-italic text-forest-600">transparentes</em>
          </h2>
          <p className="text-lg text-forest-700/70 max-w-xl mx-auto leading-relaxed">
            Commencez gratuitement. Continuez à votre rythme. Remboursement partiel
            possible selon votre mutuelle.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl border p-8 flex flex-col transition-all ${
                plan.featured
                  ? 'bg-forest-600 border-forest-600 shadow-2xl shadow-forest-200 -mt-4 scale-105'
                  : 'bg-white border-forest-100 hover:shadow-lg'
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold-500 text-white text-xs font-bold px-5 py-1.5 rounded-full shadow-md flex items-center gap-1">
                  <Star className="w-3 h-3 fill-white" /> Recommandé
                </div>
              )}

              <div className="mb-6">
                <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full border mb-4 ${plan.badgeColor}`}>
                  {plan.name}
                </span>
                <div className="flex items-end gap-2 mb-1">
                  <span className={`font-serif text-4xl font-bold ${plan.featured ? 'text-white' : 'text-forest-900'}`}>
                    {plan.price}
                  </span>
                </div>
                <p className={`text-sm ${plan.featured ? 'text-forest-200' : 'text-forest-600/70'}`}>{plan.sub}</p>
              </div>

              <p className={`text-sm leading-relaxed mb-6 ${plan.featured ? 'text-forest-100' : 'text-forest-700/70'}`}>
                {plan.desc}
              </p>

              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      plan.featured ? 'bg-white/20' : 'bg-forest-50'
                    }`}>
                      <Check className={`w-3 h-3 ${plan.featured ? 'text-white' : 'text-forest-600'}`} />
                    </div>
                    <span className={plan.featured ? 'text-forest-100' : 'text-forest-800'}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/rendez-vous"
                className={`inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-semibold text-sm transition-all hover:-translate-y-0.5 ${plan.ctaClass}`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* Reassurance */}
        <div className="mt-12 text-center">
          <p className="text-forest-600/70 text-sm">
            💳 Paiement par carte · 🧾 Remboursement mutuelle jusqu&apos;à 100% · 🔒 Sans engagement
          </p>
        </div>
      </div>
    </section>
  )
}
