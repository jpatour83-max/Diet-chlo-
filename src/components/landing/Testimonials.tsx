import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Sophie M.',
    age: 34,
    objective: 'Perte de poids',
    result: '-12 kg en 4 mois',
    text: 'Chloé est une diététicienne exceptionnelle. Son approche bienveillante et ses conseils personnalisés m\'ont permis de perdre 12kg sans me priver. Je recommande vivement !',
    rating: 5,
    avatar: 'SM',
    color: 'bg-pink-100 text-pink-600',
  },
  {
    name: 'Pierre D.',
    age: 52,
    objective: 'Diabète type 2',
    result: 'Glycémie stabilisée',
    text: 'Grâce au suivi de Chloé, j\'ai réussi à stabiliser ma glycémie et à réduire ma médication. Son expertise en nutrition clinique est remarquable.',
    rating: 5,
    avatar: 'PD',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    name: 'Amélie L.',
    age: 28,
    objective: 'Rééquilibrage',
    result: 'Rapport serein à la nourriture',
    text: 'Après des années de régimes yoyo, Chloé m\'a aidée à retrouver un rapport apaisé avec la nourriture. Sa méthode douce et progressive a vraiment changé ma vie.',
    rating: 5,
    avatar: 'AL',
    color: 'bg-emerald-100 text-emerald-600',
  },
  {
    name: 'Marc B.',
    age: 45,
    objective: 'Perte de poids',
    result: '-8 kg en 3 mois',
    text: 'La consultation en ligne est super pratique pour mon emploi du temps chargé. Chloé est disponible et à l\'écoute. Les résultats sont au rendez-vous !',
    rating: 5,
    avatar: 'MB',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    name: 'Isabelle R.',
    age: 39,
    objective: 'Hypothyroïdie',
    result: 'Énergie retrouvée',
    text: 'Je souffre d\'hypothyroïdie et Chloé a adapté mon alimentation en conséquence. J\'ai retrouvé de l\'énergie et perdu les kilos liés à ma pathologie.',
    rating: 5,
    avatar: 'IR',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    name: 'Thomas V.',
    age: 31,
    objective: 'Performance sportive',
    result: 'Meilleures performances',
    text: 'Chloé m\'a aidé à optimiser mon alimentation pour la course à pied. Mes temps se sont améliorés et je récupère beaucoup mieux après l\'effort.',
    rating: 5,
    avatar: 'TV',
    color: 'bg-teal-100 text-teal-600',
  },
]

export default function Testimonials() {
  return (
    <section id="temoignages" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            Témoignages
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Ce que disent{' '}
            <span className="text-emerald-500">mes patients</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez les témoignages de patients qui ont transformé leur alimentation et leur santé.
          </p>
          
          <div className="flex items-center justify-center gap-2 mt-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="ml-2 text-gray-600 font-medium">4.9/5 — 200+ avis</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-shadow border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${t.color}`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.age} ans · {t.objective}</p>
                  </div>
                </div>
                <Quote className="w-8 h-8 text-emerald-200 flex-shrink-0" />
              </div>
              
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
              
              <div className="bg-emerald-50 rounded-xl px-3 py-2 inline-block">
                <span className="text-emerald-600 font-semibold text-sm">✓ {t.result}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
