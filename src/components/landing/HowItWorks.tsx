import { Calendar, ClipboardList, TrendingUp } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Calendar,
    title: 'Consultation initiale',
    description:
      'Réservez votre première consultation en ligne (vidéo ou téléphone). Nous échangeons sur vos habitudes alimentaires, votre mode de vie et vos objectifs.',
    duration: '60 minutes',
    color: 'bg-emerald-500',
  },
  {
    number: '02',
    icon: ClipboardList,
    title: 'Plan alimentaire personnalisé',
    description:
      'Je crée un plan alimentaire sur mesure adapté à vos goûts, contraintes et objectifs. Pas de régime strict, mais une approche durable et équilibrée.',
    duration: 'Sous 48h',
    color: 'bg-teal-500',
  },
  {
    number: '03',
    icon: TrendingUp,
    title: 'Suivi et ajustements',
    description:
      'Des consultations de suivi régulières permettent d\'ajuster le programme selon vos progrès et de vous maintenir motivé(e) sur la durée.',
    duration: 'Tous les 15 jours',
    color: 'bg-blue-500',
  },
]

export default function HowItWorks() {
  return (
    <section id="comment" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            Comment ça marche
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            3 étapes vers votre{' '}
            <span className="text-emerald-500">objectif</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Un processus simple et efficace pour vous accompagner vers une alimentation équilibrée et durable.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-16 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-emerald-300 to-teal-300" />
          
          {steps.map((step) => (
            <div key={step.number} className="relative flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <span className="absolute -top-3 -right-3 w-8 h-8 bg-white border-2 border-gray-200 rounded-full text-xs font-bold text-gray-600 flex items-center justify-center shadow">
                  {step.number}
                </span>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{step.description}</p>
                <span className="inline-block bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-sm font-medium">
                  {step.duration}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid md:grid-cols-4 gap-6">
          {[
            { value: '200+', label: 'Patients accompagnés' },
            { value: '95%', label: 'Taux de satisfaction' },
            { value: '5 ans', label: "D'expérience" },
            { value: '100%', label: 'En ligne' },
          ].map((stat) => (
            <div key={stat.label} className="text-center bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <p className="text-4xl font-bold text-emerald-600 mb-2">{stat.value}</p>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
