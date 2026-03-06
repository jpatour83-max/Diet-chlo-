import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Diét'Chloé — Diététicienne Nutritionniste | Consultation en ligne",
  description:
    "Chloé Constantin, diététicienne libérale certifiée à Hyères. Accompagnement nutritionnel personnalisé : perte de poids, rééquilibrage alimentaire, pathologies. Consultation vidéo ou téléphone.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        {/* Preconnect for faster font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Google Fonts — Playfair Display (serif headings) + Inter (sans body) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
