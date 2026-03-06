import { Calendar, ClipboardList, TrendingUp, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const steps = [
  {
    number: '01',
    icon: Calendar,
    title: 'Consultation initiale',
    description:
      'Réservez votre première consultation gratuite (30 min). Nous échangeons sur vos habitudes alimentaires, votre mode de vie et vos objectifs.',
    duration: 'Gratuit · 30 min',
    color: 'bg-forest-600',
    light: 'bg-forest-50',
  },
  {
    number: '02',
    icon: ClipboardList,
    title: 'Plan alimentaire personnalisé',
    description:
      'Je crée un programme sur-mesure adapté à vos goûts, contraintes et objectifs. Pas de régime strict — une approche durable et savoureuse.',
    duration: 'Sous 48h',
    color: 'bg-gold-500',
    light: 'bg-gold-100',
  },
  {
    number: '03',
    icon: TrendingUp,
    title: 'Suivi & ajustements',
    description:
      'Des consultations de suivi régulières pour ajuster le programme selon vos progrès et maintenir votre motivation sur le long terme.',
    duration: 'Tous les 15 jours',
    color: 'bg-forest-600',
    light: 'bg-forest-50',
  },
]

const stats = [
  { value: '200+', label: 'Patients accompagnés', icon: '👥' },
  { value: '95%',  label: 'Taux de satisfaction',  icon: '⭐' },
  { value: '5 ans', label: "D'expérience",          icon: '🏅' },
  { value: '100%', label: 'En ligne, où vous voulez', icon: '💻' },
]

export default function HowItWorks() {
  return (
    <section id="comment" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block bg-sage border border-forest-200 text-forest-700 px-4 py-1.5 rounded-full text-sm font-medium mb-5">
            Comment ça marche
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-forest-900 mb-5">
            3 étapes vers{' '}
            <em className="not-italic text-forest-600">votre objectif</em>
          </h2>
          <p className="text-lg text-forest-700/70 max-w-2xl mx-auto leading-relaxed">
            Un processus simple et bienveillant pour vous accompagner vers une alimentation
            équilibrée et durable — depuis chez vous.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {steps.map((step, idx) => (
            <div key={step.number} className="relative flex flex-col">
              {/* Connector arrow */}
              {idx < steps.length - 1 && (
                <div className="hidden md:flex absolute top-10 -right-4 z-10 w-8 items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-forest-200" />
                </div>
              )}

              {/* Card */}
              <div className="bg-white rounded-3xl border border-forest-100 p-8 flex-1 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                {/* Number badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 ${step.color} rounded-2xl flex items-center justify-center shadow-md`}>
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="font-serif text-5xl font-bold text-forest-100 select-none">
                    {step.number}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-forest-900 mb-3">{step.title}</h3>
                <p className="text-forest-700/70 leading-relaxed mb-5">{step.description}</p>

                <span className={`inline-block ${step.light} text-forest-700 border border-forest-200 px-3 py-1.5 rounded-full text-xs font-semibold`}>
                  ⏱ {step.duration}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-cream rounded-2xl p-6 text-center border border-forest-100 hover:border-forest-300 transition-colors"
            >
              <div className="text-3xl mb-2">{s.icon}</div>
              <p className="font-serif text-4xl font-bold text-forest-700 mb-1">{s.value}</p>
              <p className="text-sm text-forest-600/70">{s.label}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <Link
            href="/rendez-vous"
            className="inline-flex items-center gap-2.5 bg-forest-600 hover:bg-forest-500 text-white px-10 py-4 rounded-2xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <Calendar className="w-5 h-5" />
            Commencer dès aujourd&apos;hui
          </Link>
        </div>
      </div>
    </section>
  )
}

