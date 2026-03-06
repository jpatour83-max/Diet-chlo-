import { Check, Heart, Users, Sprout } from 'lucide-react'

function ApproachIllustration() {
  return (
    <svg viewBox="0 0 420 460" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Background organic blob */}
      <path
        d="M60 80 C20 120 10 220 40 310 C70 400 150 450 250 440 C350 430 410 360 410 260 C410 160 370 60 280 40 C190 20 100 40 60 80Z"
        fill="#EEF4EE"
      />

      {/* Inner accent blob */}
      <path
        d="M90 130 C65 165 60 240 85 305 C110 370 175 405 255 398 C335 390 385 330 385 250 C385 170 350 100 280 80 C210 60 115 95 90 130Z"
        fill="#D8EBD8"
        opacity="0.5"
      />

      {/* Table / desk */}
      <rect x="80" y="310" width="260" height="14" rx="7" fill="#C8A96E" opacity="0.6" />

      {/* Laptop */}
      <rect x="140" y="240" width="140" height="90" rx="8" fill="#2D5A3D" />
      <rect x="148" y="248" width="124" height="74" rx="4" fill="#3D7550" />
      {/* Screen content lines */}
      <rect x="158" y="258" width="60" height="6" rx="3" fill="#EEF4EE" opacity="0.7" />
      <rect x="158" y="270" width="90" height="4" rx="2" fill="#EEF4EE" opacity="0.4" />
      <rect x="158" y="280" width="75" height="4" rx="2" fill="#EEF4EE" opacity="0.4" />
      <rect x="158" y="290" width="50" height="4" rx="2" fill="#EEF4EE" opacity="0.4" />
      {/* Green chart on screen */}
      <polyline points="228,308 238,296 248,302 258,285 268,290" stroke="#C8A96E" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="115" y="322" width="190" height="8" rx="4" fill="#1C2B1E" opacity="0.3" />

      {/* Body / chair */}
      <ellipse cx="210" cy="215" rx="50" ry="30" fill="#F0F9F4" />
      <rect x="183" y="200" width="54" height="28" rx="8" fill="#D8EBD8" />

      {/* Neck + Head */}
      <rect x="200" y="172" width="20" height="32" rx="6" fill="#D4937A" />
      <ellipse cx="210" cy="148" rx="42" ry="46" fill="#D4937A" />

      {/* Hair */}
      <path d="M170 138 C170 95 250 95 250 138 C250 110 246 88 210 84 C174 88 170 110 170 138 Z" fill="#5C3A1E" />
      <path d="M168 142 C162 122 166 165 173 182 C168 168 165 153 168 142 Z" fill="#5C3A1E" />
      <path d="M252 142 C258 122 254 165 247 182 C252 168 255 153 252 142 Z" fill="#5C3A1E" />

      {/* Face */}
      <ellipse cx="196" cy="148" rx="6" ry="7" fill="#3C2415" />
      <ellipse cx="224" cy="148" rx="6" ry="7" fill="#3C2415" />
      <circle cx="198" cy="146" r="2" fill="white" />
      <circle cx="226" cy="146" r="2" fill="white" />
      <path d="M200 160 Q210 168 220 160" stroke="#B8826A" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="186" cy="157" rx="8" ry="5" fill="#E8A898" opacity="0.3" />
      <ellipse cx="234" cy="157" rx="8" ry="5" fill="#E8A898" opacity="0.3" />

      {/* Floating notes / cards */}
      {/* Left card */}
      <rect x="50" y="155" width="90" height="60" rx="12" fill="white" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.08))" />
      <rect x="62" y="167" width="40" height="5" rx="2.5" fill="#2D5A3D" opacity="0.6" />
      <rect x="62" y="178" width="64" height="4" rx="2" fill="#2D5A3D" opacity="0.25" />
      <rect x="62" y="187" width="50" height="4" rx="2" fill="#2D5A3D" opacity="0.25" />
      <circle cx="127" cy="162" r="8" fill="#EEF4EE" />
      <text x="127" y="166" textAnchor="middle" fontSize="9" fill="#2D5A3D" fontWeight="bold">✓</text>

      {/* Right card */}
      <rect x="285" y="140" width="100" height="55" rx="12" fill="white" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.08))" />
      <circle cx="300" cy="160" r="10" fill="#EEF4EE" />
      <text x="300" y="165" textAnchor="middle" fontSize="12" fill="#2D5A3D">♥</text>
      <rect x="316" y="153" width="55" height="5" rx="2.5" fill="#2D5A3D" opacity="0.6" />
      <rect x="316" y="163" width="45" height="4" rx="2" fill="#2D5A3D" opacity="0.3" />

      {/* Gold accent dots */}
      <circle cx="80" cy="90"  r="5" fill="#C8A96E" opacity="0.7" />
      <circle cx="355" cy="80" r="6" fill="#C8A96E" opacity="0.5" />
      <circle cx="370" cy="380" r="4" fill="#C8A96E" opacity="0.6" />
      <circle cx="55" cy="380" r="3" fill="#C8A96E" opacity="0.5" />

      {/* Plant decorations */}
      <path d="M45 320 C30 298 52 285 62 305 C68 290 82 295 72 316 Z" fill="#3D7550" opacity="0.6" />
      <path d="M375 300 C392 278 412 295 400 315 Z" fill="#3D7550" opacity="0.5" />
    </svg>
  )
}

const values = [
  {
    icon: Heart,
    title: 'Bienveillance',
    desc: 'Un accompagnement sans jugement, à votre rythme.',
  },
  {
    icon: Users,
    title: 'Personnalisation',
    desc: 'Chaque plan est unique car chaque personne est unique.',
  },
  {
    icon: Sprout,
    title: 'Durabilité',
    desc: 'Des changements progressifs, pas de régimes express.',
  },
]

const credentials = [
  'Diplôme d\'État de Diététique (BTS)',
  'DU Alimentation & Pathologies Chroniques',
  'Membre de l\'AFDN',
  'Formation TCC & comportement alimentaire',
  '5 ans d\'expérience libérale',
]

export default function About() {
  return (
    <section id="about" className="py-28 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Illustration */}
          <div className="relative flex justify-center">
            <div className="w-full max-w-[420px] aspect-[420/460]">
              <ApproachIllustration />
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="inline-block bg-white border border-forest-200 text-forest-700 px-4 py-1.5 rounded-full text-sm font-medium mb-5">
              À propos de moi
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-forest-900 leading-tight mb-6">
              Bonjour, je suis{' '}
              <em className="not-italic text-forest-600">Chloé</em>
            </h2>

            <div className="space-y-4 text-forest-700/80 leading-relaxed mb-8">
              <p>
                Passionnée par la nutrition depuis toujours, j&apos;ai fondé mon cabinet de diététique
                libérale après 5 ans d&apos;expérience en milieu hospitalier et en libéral.
                Mon approche est simple : vous aider à retrouver une relation sereine avec la nourriture,
                sans culpabilité ni restrictions inutiles.
              </p>
              <p>
                Je crois profondément qu&apos;une alimentation équilibrée ne devrait pas être une contrainte.
                Ensemble, nous construirons un plan qui s&apos;adapte à <em>votre</em> vie, <em>vos</em> goûts
                et <em>vos</em> contraintes — pas l&apos;inverse.
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {values.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-white rounded-2xl p-4 border border-forest-100 text-center">
                  <div className="w-10 h-10 bg-forest-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-5 h-5 text-forest-600" />
                  </div>
                  <p className="font-semibold text-forest-900 text-sm mb-1">{title}</p>
                  <p className="text-xs text-forest-600/70 leading-snug">{desc}</p>
                </div>
              ))}
            </div>

            {/* Credentials */}
            <div className="bg-white rounded-2xl border border-forest-100 p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-forest-600 mb-4">
                Formations & certifications
              </p>
              <ul className="space-y-2.5">
                {credentials.map((c) => (
                  <li key={c} className="flex items-center gap-3 text-forest-800 text-sm">
                    <div className="w-5 h-5 bg-forest-50 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-forest-600" />
                    </div>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
