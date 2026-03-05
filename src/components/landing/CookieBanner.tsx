'use client'

import { useState, useEffect } from 'react'
import { X, Cookie, Settings, Check } from 'lucide-react'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setTimeout(() => setVisible(true), 1500)
    }
  }, [])

  const acceptAll = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({ necessary: true, analytics: true, marketing: true }))
    setVisible(false)
  }

  const rejectAll = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({ necessary: true, analytics: false, marketing: false }))
    setVisible(false)
  }

  const savePreferences = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences))
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Cookie className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Gestion des cookies</h3>
                <p className="text-sm text-gray-500">Conforme au RGPD</p>
              </div>
            </div>
            <button onClick={rejectAll} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <p className="text-gray-600 text-sm mb-4">
            Nous utilisons des cookies pour améliorer votre expérience, analyser notre trafic et 
            personnaliser les publicités. Vous pouvez accepter tous les cookies ou gérer vos préférences.
          </p>

          {showDetails && (
            <div className="space-y-3 mb-4 border rounded-xl p-4 bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800 text-sm">Cookies nécessaires</p>
                  <p className="text-xs text-gray-500">Fonctionnement du site</p>
                </div>
                <div className="w-10 h-6 bg-emerald-500 rounded-full flex items-center justify-end px-1">
                  <div className="w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
              
              {(['analytics', 'marketing'] as const).map((type) => (
                <div key={type} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800 text-sm capitalize">
                      {type === 'analytics' ? 'Cookies analytiques' : 'Cookies marketing'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {type === 'analytics' ? 'Statistiques de visite' : 'Publicités personnalisées'}
                    </p>
                  </div>
                  <button
                    onClick={() => setPreferences(prev => ({ ...prev, [type]: !prev[type] }))}
                    className={`w-10 h-6 rounded-full flex items-center transition-all px-1 ${
                      preferences[type] ? 'bg-emerald-500 justify-end' : 'bg-gray-300 justify-start'
                    }`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full shadow" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={acceptAll}
              className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-medium text-sm transition-colors"
            >
              <Check className="w-4 h-4" />
              Tout accepter
            </button>
            <button
              onClick={rejectAll}
              className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2.5 rounded-xl font-medium text-sm transition-colors"
            >
              Tout refuser
            </button>
            {showDetails ? (
              <button
                onClick={savePreferences}
                className="flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-6 py-2.5 rounded-xl font-medium text-sm transition-colors"
              >
                Enregistrer mes choix
              </button>
            ) : (
              <button
                onClick={() => setShowDetails(true)}
                className="flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-6 py-2.5 rounded-xl font-medium text-sm transition-colors"
              >
                <Settings className="w-4 h-4" />
                Personnaliser
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
