import Hero from '@/components/landing/Hero'
import Services from '@/components/landing/Services'
import HowItWorks from '@/components/landing/HowItWorks'
import Testimonials from '@/components/landing/Testimonials'
import BookingCTA from '@/components/landing/BookingCTA'
import CookieBanner from '@/components/landing/CookieBanner'

export const metadata = {
  title: "Diét'Chloé — Diététicienne Nutritionniste | Consultation en ligne",
  description:
    "Chloé Constantin, diététicienne libérale certifiée. Accompagnement nutritionnel personnalisé : perte de poids, rééquilibrage alimentaire, gestion des pathologies. Consultation vidéo ou téléphone.",
}

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <HowItWorks />
      <Testimonials />
      <BookingCTA />
      <CookieBanner />
    </main>
  )
}
