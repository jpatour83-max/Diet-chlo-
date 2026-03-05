'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft, Check } from 'lucide-react'
import Link from 'next/link'

const schema = z.object({
  firstName: z.string().min(2, 'Requis'),
  lastName: z.string().min(2, 'Requis'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(10, 'Numéro invalide'),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  objective: z.string().optional(),
  pathology: z.string().optional(),
  initialWeight: z.string().optional(),
  targetWeight: z.string().optional(),
  height: z.string().optional(),
  status: z.string().min(1),
  source: z.string().optional(),
  notes: z.string().optional(),
})

type FormData = z.infer<typeof schema>

export default function NewPatientPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { status: 'prospect' },
  })

  const objective = watch('objective')

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setError('')
    
    try {
      const response = await fetch('/api/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      
      if (!response.ok) throw new Error()
      
      const patient = await response.json()
      router.push(`/admin/patients/${patient.id}`)
    } catch {
      setError('Erreur lors de la création du patient')
    } finally {
      setIsSubmitting(false)
    }
  }

  const field = (label: string, name: keyof FormData, type = 'text', placeholder = '') => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
      />
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]?.message as string}</p>}
    </div>
  )

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/patients"
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour
        </Link>
        <div className="w-px h-5 bg-gray-200" />
        <h1 className="text-2xl font-bold text-gray-900">Nouveau patient</h1>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Identité */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="w-7 h-7 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 text-sm font-bold">1</span>
            Informations personnelles
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {field('Prénom *', 'firstName', 'text', 'Marie')}
            {field('Nom *', 'lastName', 'text', 'Dupont')}
            {field('Email *', 'email', 'email', 'marie.dupont@email.fr')}
            {field('Téléphone *', 'phone', 'tel', '06 12 34 56 78')}
            {field('Date de naissance', 'dateOfBirth', 'date')}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Genre</label>
              <select {...register('gender')} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-white">
                <option value="">Non renseigné</option>
                <option value="female">Femme</option>
                <option value="male">Homme</option>
                <option value="other">Autre</option>
              </select>
            </div>
            {field('Ville', 'city', 'text', 'Paris')}
            {field('Code postal', 'postalCode', 'text', '75011')}
          </div>
        </div>

        {/* Objectifs */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="w-7 h-7 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600 text-sm font-bold">2</span>
            Objectifs & Santé
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Objectif principal</label>
              <select {...register('objective')} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-white">
                <option value="">Sélectionner</option>
                <option value="weight_loss">Perte de poids</option>
                <option value="balance">Rééquilibrage alimentaire</option>
                <option value="pathology">Gestion de pathologie</option>
                <option value="performance">Performance sportive</option>
                <option value="other">Autre</option>
              </select>
            </div>
            {objective === 'pathology' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Pathologie</label>
                <input
                  {...register('pathology')}
                  placeholder="Diabète type 2, hypothyroïdie..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>
            )}
            {field('Poids initial (kg)', 'initialWeight', 'number')}
            {field('Poids cible (kg)', 'targetWeight', 'number')}
            {field('Taille (cm)', 'height', 'number')}
          </div>
        </div>

        {/* Admin */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-sm font-bold">3</span>
            Administration
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Statut</label>
              <select {...register('status')} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-white">
                <option value="prospect">Prospect</option>
                <option value="active">Actif</option>
                <option value="inactive">Inactif</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Source d&apos;acquisition</label>
              <select {...register('source')} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-white">
                <option value="">Sélectionner</option>
                <option value="facebook">Facebook</option>
                <option value="instagram">Instagram</option>
                <option value="google">Google</option>
                <option value="direct">Direct</option>
                <option value="referral">Recommandation</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Notes internes</label>
            <textarea
              {...register('notes')}
              rows={3}
              placeholder="Notes privées sur le patient..."
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Link
            href="/admin/patients"
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium text-sm transition-colors"
          >
            Annuler
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-8 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 text-white rounded-xl font-semibold text-sm transition-colors shadow-sm"
          >
            {isSubmitting ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Check className="w-4 h-4" />
            )}
            Créer le patient
          </button>
        </div>
      </form>
    </div>
  )
}
