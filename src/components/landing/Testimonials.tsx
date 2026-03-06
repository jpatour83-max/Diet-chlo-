import { Star } from 'lucide-react'

const testimonials = [
  {
    name:      'Sophie M.',
    age:       34,
    objective: 'Perte de poids',
    result:    '−12 kg en 4 mois',
    text:      "L'approche de Chloé est tellement bienveillante. Je n'ai jamais eu l'impression de me priver — et pourtant les résultats sont là. Je recommande à 100% !",
    rating:    5,
    initials:  'SM',
    hue:       'bg-rose-100 text-rose-700',
  },
  {
    name:      'Pierre D.',
    age:       52,
    objective: 'Diabète type 2',
    result:    'Glycémie stabilisée',
    text:      "Grâce au suivi de Chloé, j'ai réussi à stabiliser ma glycémie et à réduire ma médication. Son expertise en nutrition clinique est précieuse et rassurante.",
    rating:    5,
    initials:  'PD',
    hue:       'bg-blue-100 text-blue-700',
  },
  {
    name:      'Amélie L.',
    age:       28,
    objective: 'Rééquilibrage',
    result:    'Rapport serein avec la nourriture',
    text:      "Après des années de régimes yoyo, Chloé m'a aidée à retrouver un rapport apaisé avec la nourriture. Sa méthode douce a vraiment changé ma vie.",
    rating:    5,
    initials:  'AL',
    hue:       'bg-sage text-forest-700',
  },
  {
    name:      'Marc B.',
    age:       45,
    objective: 'Perte de poids',
    result:    '−8 kg en 3 mois',
    text:      "La consultation en ligne est super pratique. Chloé est disponible et à l'écoute. Les résultats sont au rendez-vous et je me sens beaucoup mieux dans ma peau !",
    rating:    5,
    initials:  'MB',
    hue:       'bg-purple-100 text-purple-700',
  },
  {
    name:      'Isabelle R.',
    age:       39,
    objective: 'Hypothyroïdie',
    result:    'Énergie retrouvée',
    text:      "Je souffre d'hypothyroïdie et Chloé a adapté mon alimentation en conséquence. J'ai retrouvé de l'énergie et les kilos liés à ma pathologie ont disparu progressivement.",
    rating:    5,
    initials:  'IR',
    hue:       'bg-amber-100 text-amber-700',
  },
  {
    name:      'Thomas V.',
    age:       31,
    objective: 'Performance sportive',
    result:    'Meilleures performances',
    text:      "Chloé m'a aidé à optimiser mon alimentation pour la course à pied. Mes temps se sont améliorés et je récupère beaucoup mieux après les efforts intenses.",
    rating:    5,
    initials:  'TV',
    hue:       'bg-teal-100 text-teal-700',
  },
]

export default function Testimonials() {
  return (
    <section id="temoignages" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-sage border border-forest-200 text-forest-700 px-4 py-1.5 rounded-full text-sm font-medium mb-5">
            Témoignages
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-forest-900 mb-5">
            Ce que disent{' '}
            <em className="not-italic text-forest-600">mes patients</em>
          </h2>
          <p className="text-lg text-forest-700/70 max-w-2xl mx-auto leading-relaxed mb-8">
            Des vraies transformations, des vrais résultats — et surtout une vraie qualité de vie retrouvée.
          </p>

          {/* Rating bar */}
          <div className="inline-flex items-center gap-3 bg-cream border border-forest-100 px-6 py-3 rounded-full">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 fill-gold-500 text-gold-500" />
              ))}
            </div>
            <span className="font-semibold text-forest-800">4.9 / 5</span>
            <span className="text-forest-600/60 text-sm">· 200+ avis vérifiés</span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-cream rounded-3xl border border-forest-100 p-7 flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold-500 text-gold-500" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-forest-800 leading-relaxed flex-grow mb-6 text-[0.95rem]">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Result badge */}
              <div className="inline-flex items-center gap-2 bg-forest-50 border border-forest-200 text-forest-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-5 self-start">
                <span className="text-forest-500">✓</span>
                {t.result}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-forest-100">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${t.hue}`}>
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-forest-900 text-sm">{t.name}</p>
                  <p className="text-xs text-forest-600/70">{t.age} ans · {t.objective}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

