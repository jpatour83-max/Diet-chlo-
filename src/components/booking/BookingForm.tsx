'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { format, addDays, startOfDay, isSameDay, isToday, isPast } from 'date-fns'
import { fr } from 'date-fns/locale'
import { ChevronLeft, ChevronRight, Check, Phone, Video, Calendar, User, Mail, Clock } from 'lucide-react'

const schema = z.object({
  firstName: z.string().min(2, 'Le prénom est requis'),
  lastName: z.string().min(2, 'Le nom est requis'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(10, 'Numéro de téléphone invalide'),
  type: z.enum(['phone', 'video']),
  objective: z.string().optional(),
  message: z.string().optional(),
})

type FormData = z.infer<typeof schema>

const ALLOWED_UTM_SOURCES = ['facebook', 'instagram', 'google', 'retargeting', 'direct', 'email', 'organic']

function sanitizeUtmSource(value: string | null): string {
  if (!value) return 'direct'
  const lower = value.toLowerCase().replace(/[^a-z0-9_-]/g, '')
  return ALLOWED_UTM_SOURCES.includes(lower) ? lower : 'direct'
}

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
]

// Simulate some booked slots
const bookedSlots: Record<string, string[]> = {
  [format(addDays(new Date(), 1), 'yyyy-MM-dd')]: ['09:00', '10:30', '14:00', '15:30'],
  [format(addDays(new Date(), 2), 'yyyy-MM-dd')]: ['11:00', '14:30', '16:00'],
}

export default function BookingForm() {
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [bookingRef, setBookingRef] = useState('')

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { type: 'video' },
  })

  const consultationType = watch('type')

  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const days: (Date | null)[] = []
    
    // Pad start (Monday = 0)
    const startDow = (firstDay.getDay() + 6) % 7
    for (let i = 0; i < startDow; i++) days.push(null)
    
    for (let d = 1; d <= lastDay.getDate(); d++) {
      days.push(new Date(year, month, d))
    }
    return days
  }

  const isDateAvailable = (date: Date) => {
    const dow = date.getDay()
    const isWeekend = dow === 0 || (dow === 6 && date.getHours() >= 13)
    return !isWeekend && !isPast(startOfDay(date))
  }

  const getAvailableSlots = (date: Date) => {
    const key = format(date, 'yyyy-MM-dd')
    const booked = bookedSlots[key] || []
    return timeSlots.filter(slot => !booked.includes(slot))
  }

  const onSubmit = async (data: FormData) => {
    if (!selectedDate || !selectedSlot) return
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          date: selectedDate.toISOString(),
          timeSlot: selectedSlot,
          source: sanitizeUtmSource(new URLSearchParams(window.location.search).get('utm_source')),
        }),
      })
      
      if (response.ok) {
        const booking = await response.json()
        setBookingRef(booking.id.slice(-8).toUpperCase())
        setSubmitted(true)
      }
    } catch (error) {
      console.error('Booking error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-12 text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Rendez-vous confirmé !</h2>
          <p className="text-gray-600 mb-6 text-lg">
            Votre demande de rendez-vous a bien été reçue. Vous recevrez une confirmation par email sous peu.
          </p>
          <div className="bg-emerald-50 rounded-2xl p-6 mb-8">
            <p className="text-sm text-gray-500 mb-1">Référence de votre réservation</p>
            <p className="text-2xl font-bold text-emerald-600">#{bookingRef}</p>
            <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Date</p>
                <p className="font-semibold text-gray-800">{selectedDate && format(selectedDate, 'dd MMMM yyyy', { locale: fr })}</p>
              </div>
              <div>
                <p className="text-gray-500">Heure</p>
                <p className="font-semibold text-gray-800">{selectedSlot}</p>
              </div>
              <div>
                <p className="text-gray-500">Type</p>
                <p className="font-semibold text-gray-800">{consultationType === 'video' ? 'Vidéo' : 'Téléphone'}</p>
              </div>
            </div>
          </div>
          <p className="text-gray-500 text-sm">
            Un email de confirmation vous sera envoyé avec le lien de connexion (pour les consultations vidéo).
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress steps */}
      <div className="flex items-center justify-center gap-2 mb-10">
        {[
          { n: 1, label: 'Type & Date' },
          { n: 2, label: 'Horaire' },
          { n: 3, label: 'Vos informations' },
        ].map(({ n, label }) => (
          <div key={n} className="flex items-center gap-2">
            <div className={`flex items-center gap-2 ${step >= n ? 'text-emerald-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
                step > n ? 'bg-emerald-500 border-emerald-500 text-white' :
                step === n ? 'border-emerald-500 text-emerald-600' :
                'border-gray-300 text-gray-400'
              }`}>
                {step > n ? <Check className="w-4 h-4" /> : n}
              </div>
              <span className="text-sm font-medium hidden sm:block">{label}</span>
            </div>
            {n < 3 && <div className={`w-12 h-0.5 ${step > n ? 'bg-emerald-500' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Step 1: Type + Date */}
        {step === 1 && (
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Choisissez votre consultation</h2>
            <p className="text-gray-500 mb-8">Sélectionnez le type de consultation et une date disponible</p>

            {/* Consultation type */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Type de consultation</label>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: 'video', icon: Video, label: 'Consultation vidéo', desc: 'Via Zoom ou Google Meet', price: '60€ — 60 min' },
                  { value: 'phone', icon: Phone, label: 'Consultation téléphone', desc: 'Appel simple', price: '60€ — 60 min' },
                ].map(({ value, icon: Icon, label, desc, price }) => (
                  <label
                    key={value}
                    className={`relative flex flex-col gap-3 p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                      consultationType === value
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input {...register('type')} type="radio" value={value} className="sr-only" />
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      consultationType === value ? 'bg-emerald-500' : 'bg-gray-100'
                    }`}>
                      <Icon className={`w-5 h-5 ${consultationType === value ? 'text-white' : 'text-gray-500'}`} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{label}</p>
                      <p className="text-sm text-gray-500">{desc}</p>
                      <p className="text-sm font-medium text-emerald-600 mt-1">{price}</p>
                    </div>
                    {consultationType === value && (
                      <div className="absolute top-3 right-3 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Calendar */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Choisissez une date</label>
              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => setCurrentMonth(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))}
                    className="w-8 h-8 rounded-lg hover:bg-white flex items-center justify-center transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <h3 className="font-semibold text-gray-800 capitalize">
                    {format(currentMonth, 'MMMM yyyy', { locale: fr })}
                  </h3>
                  <button
                    onClick={() => setCurrentMonth(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))}
                    className="w-8 h-8 rounded-lg hover:bg-white flex items-center justify-center transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(d => (
                    <div key={d} className="text-center text-xs font-medium text-gray-400 py-1">{d}</div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {getDaysInMonth().map((day, i) => {
                    if (!day) return <div key={i} />
                    const available = isDateAvailable(day)
                    const selected = selectedDate && isSameDay(day, selectedDate)
                    const today = isToday(day)
                    
                    return (
                      <button
                        key={i}
                        onClick={() => { if (available) { setSelectedDate(day); setSelectedSlot(null) }}}
                        disabled={!available}
                        className={`relative aspect-square rounded-xl text-sm font-medium transition-all ${
                          selected ? 'bg-emerald-500 text-white shadow-md' :
                          today ? 'bg-emerald-100 text-emerald-700' :
                          available ? 'hover:bg-white text-gray-700' :
                          'text-gray-300 cursor-not-allowed'
                        }`}
                      >
                        {format(day, 'd')}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setStep(2)}
                disabled={!selectedDate}
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-200 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-semibold transition-colors"
              >
                Continuer
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Time slot */}
        {step === 2 && selectedDate && (
          <div className="p-8">
            <button onClick={() => setStep(1)} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6 transition-colors">
              <ChevronLeft className="w-4 h-4" />
              Retour
            </button>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Choisissez un horaire</h2>
            <p className="text-gray-500 mb-2">
              Disponibilités pour le{' '}
              <span className="font-semibold text-gray-700">
                {format(selectedDate, 'EEEE d MMMM yyyy', { locale: fr })}
              </span>
            </p>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-6">
              {getAvailableSlots(selectedDate).map(slot => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 font-medium text-sm transition-all ${
                    selectedSlot === slot
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-200 hover:border-emerald-300 text-gray-700'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  {slot}
                </button>
              ))}
            </div>

            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-xl font-semibold transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                Retour
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!selectedSlot}
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-200 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-semibold transition-colors"
              >
                Continuer
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Patient info */}
        {step === 3 && (
          <div className="p-8">
            <button onClick={() => setStep(2)} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6 transition-colors">
              <ChevronLeft className="w-4 h-4" />
              Retour
            </button>

            {/* Summary */}
            <div className="bg-emerald-50 rounded-2xl p-4 mb-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-emerald-600" />
                <span className="font-medium text-gray-800">
                  {selectedDate && format(selectedDate, 'dd/MM/yyyy', { locale: fr })} à {selectedSlot}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                {consultationType === 'video' ? <Video className="w-4 h-4 text-emerald-600" /> : <Phone className="w-4 h-4 text-emerald-600" />}
                <span className="font-medium text-gray-800">{consultationType === 'video' ? 'Vidéo' : 'Téléphone'}</span>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">Vos informations</h2>
            <p className="text-gray-500 mb-8">Renseignez vos coordonnées pour finaliser la réservation</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prénom *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      {...register('firstName')}
                      placeholder="Marie"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      {...register('lastName')}
                      placeholder="Dupont"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="marie.dupont@email.fr"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    {...register('phone')}
                    type="tel"
                    placeholder="06 12 34 56 78"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Objectif principal</label>
                <select
                  {...register('objective')}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                >
                  <option value="">Sélectionnez votre objectif</option>
                  <option value="weight_loss">Perte de poids</option>
                  <option value="balance">Rééquilibrage alimentaire</option>
                  <option value="pathology">Gestion d&apos;une pathologie</option>
                  <option value="performance">Performance sportive</option>
                  <option value="other">Autre</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message (optionnel)</label>
                <textarea
                  {...register('message')}
                  rows={3}
                  placeholder="Décrivez brièvement votre situation ou vos questions..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-xl font-semibold transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Retour
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Confirmation...
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5" />
                      Confirmer le rendez-vous
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
