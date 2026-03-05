'use client'

export default function SeedButton() {
  const handleSeed = async () => {
    try {
      const res = await fetch('/api/seed', { method: 'POST' })
      const data = await res.json()
      if (data.success) {
        window.location.reload()
      } else {
        alert('Erreur: ' + data.error)
      }
    } catch {
      alert('Erreur lors de l\'initialisation')
    }
  }

  return (
    <button
      onClick={handleSeed}
      className="flex-1 text-center bg-gray-50 hover:bg-gray-100 text-gray-700 px-3 py-2 rounded-xl text-sm font-medium transition-colors"
    >
      🌱 Seed DB
    </button>
  )
}
