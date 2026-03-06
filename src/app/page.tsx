import Navbar       from '@/components/landing/Navbar'
import Hero         from '@/components/landing/Hero'
import Services     from '@/components/landing/Services'
import About        from '@/components/landing/About'
import HowItWorks   from '@/components/landing/HowItWorks'
import Pricing      from '@/components/landing/Pricing'
import Testimonials from '@/components/landing/Testimonials'
import BookingCTA   from '@/components/landing/BookingCTA'
import CookieBanner from '@/components/landing/CookieBanner'

export const metadata = {
  title: "Diét'Chloé — Diététicienne Nutritionniste | Consultation en ligne",
  description:
    "Chloé Constantin, diététicienne libérale certifiée à Hyères. Accompagnement nutritionnel personnalisé : perte de poids, rééquilibrage alimentaire, pathologies. Consultation vidéo ou téléphone.",
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <BookingCTA />
      </main>
      <CookieBanner />
    </>
  )
}

