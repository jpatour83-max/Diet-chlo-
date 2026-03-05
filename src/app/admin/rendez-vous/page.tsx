import { prisma } from '@/lib/prisma'
import { format, startOfDay, endOfDay, addDays, subDays } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Calendar, Phone, Video, Clock, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { getStatusColor, getStatusLabel, formatCurrency } from '@/lib/utils'

async function getAppointments(date: string) {
  const targetDate = new Date(date)
  const start = startOfDay(targetDate)
  const end = endOfDay(targetDate)
  
  return prisma.appointment.findMany({
    where: { date: { gte: start, lte: end } },
    include: { patient: true },
    orderBy: { date: 'asc' },
  })
}

async function getWeekAppointments(weekStart: Date) {
  const weekEnd = addDays(weekStart, 6)
  weekEnd.setHours(23, 59, 59, 999)
  
  return prisma.appointment.findMany({
    where: { date: { gte: weekStart, lte: weekEnd } },
    include: { patient: true },
    orderBy: { date: 'asc' },
  })
}

export default async function AppointmentsPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>
}) {
  const resolvedSearchParams = await searchParams
  const today = new Date()
  const selectedDateStr = resolvedSearchParams.date || format(today, 'yyyy-MM-dd')
  const selectedDate = new Date(selectedDateStr)
  
  // Get current week start (Monday)
  const dayOfWeek = selectedDate.getDay()
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
  const weekStart = new Date(selectedDate)
  weekStart.setDate(selectedDate.getDate() + mondayOffset)
  weekStart.setHours(0, 0, 0, 0)

  const [dayAppointments, weekAppointments] = await Promise.all([
    getAppointments(selectedDateStr),
    getWeekAppointments(weekStart),
  ])

  const prevDay = format(subDays(selectedDate, 1), 'yyyy-MM-dd')
  const nextDay = format(addDays(selectedDate, 1), 'yyyy-MM-dd')

  const totalRevenue = dayAppointments
    .filter(a => a.status === 'completed' && a.price)
    .reduce((sum, a) => sum + (a.price || 0), 0)

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rendez-vous</h1>
          <p className="text-gray-500 mt-1">
            {dayAppointments.length} rendez-vous le{' '}
            {format(selectedDate, 'EEEE d MMMM yyyy', { locale: fr })}
          </p>
        </div>
      </div>

      {/* Week overview */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-800 text-sm">Vue semaine</h2>
          <p className="text-xs text-gray-400">
            Semaine du {format(weekStart, 'd MMM', { locale: fr })}
          </p>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 7 }, (_, i) => {
            const day = addDays(weekStart, i)
            const dayStr = format(day, 'yyyy-MM-dd')
            const count = weekAppointments.filter(a => 
              format(new Date(a.date), 'yyyy-MM-dd') === dayStr
            ).length
            const isSelected = dayStr === selectedDateStr
            const isToday = format(today, 'yyyy-MM-dd') === dayStr
            
            return (
              <Link
                key={i}
                href={`/admin/rendez-vous?date=${dayStr}`}
                className={`flex flex-col items-center p-2 rounded-xl transition-all ${
                  isSelected ? 'bg-emerald-500 text-white' :
                  isToday ? 'bg-emerald-50 text-emerald-700' :
                  'hover:bg-gray-50 text-gray-600'
                }`}
              >
                <span className="text-xs font-medium capitalize">
                  {format(day, 'EEE', { locale: fr })}
                </span>
                <span className={`text-lg font-bold mt-0.5 ${isSelected ? 'text-white' : ''}`}>
                  {format(day, 'd')}
                </span>
                {count > 0 && (
                  <span className={`text-xs mt-0.5 px-1.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-600'
                  }`}>
                    {count}
                  </span>
                )}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Day navigation */}
      <div className="flex items-center gap-3 mb-6">
        <Link href={`/admin/rendez-vous?date=${prevDay}`} className="w-9 h-9 bg-white border border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-50 transition-colors">
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </Link>
        <h2 className="font-bold text-gray-900 capitalize text-lg flex-1 text-center">
          {format(selectedDate, 'EEEE d MMMM yyyy', { locale: fr })}
        </h2>
        <Link href={`/admin/rendez-vous?date=${nextDay}`} className="w-9 h-9 bg-white border border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-50 transition-colors">
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Appointments list */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-5 border-b border-gray-100">
            <h3 className="font-bold text-gray-900">Planning du jour</h3>
          </div>
          
          {dayAppointments.length === 0 ? (
            <div className="py-16 text-center text-gray-400">
              <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Aucun rendez-vous ce jour</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {dayAppointments.map((apt) => (
                <div key={apt.id} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors">
                  <div className="text-center w-16 flex-shrink-0">
                    <p className="text-lg font-bold text-gray-900">
                      {format(new Date(apt.date), 'HH:mm')}
                    </p>
                    <p className="text-xs text-gray-400">{apt.duration} min</p>
                  </div>
                  
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    apt.type === 'video' ? 'bg-blue-100' : 'bg-green-100'
                  }`}>
                    {apt.type === 'video' 
                      ? <Video className="w-5 h-5 text-blue-600" />
                      : <Phone className="w-5 h-5 text-green-600" />
                    }
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <Link 
                      href={`/admin/patients/${apt.patientId}`}
                      className="font-medium text-gray-900 hover:text-emerald-600 transition-colors"
                    >
                      {apt.patient.firstName} {apt.patient.lastName}
                    </Link>
                    <p className="text-sm text-gray-500">{apt.patient.phone}</p>
                    {apt.notes && <p className="text-xs text-gray-400 mt-0.5 truncate">{apt.notes}</p>}
                  </div>
                  
                  <div className="text-right flex-shrink-0">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${getStatusColor(apt.status)}`}>
                      {getStatusLabel(apt.status)}
                    </span>
                    {apt.price && (
                      <p className="text-sm font-semibold text-gray-700 mt-1">
                        {formatCurrency(apt.price)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Day stats */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4">Résumé du jour</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Total RDV</span>
                <span className="font-bold text-gray-900">{dayAppointments.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Consultations vidéo</span>
                <span className="font-semibold text-blue-600">
                  {dayAppointments.filter(a => a.type === 'video').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Consultations tél.</span>
                <span className="font-semibold text-green-600">
                  {dayAppointments.filter(a => a.type === 'phone').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Revenus confirmés</span>
                <span className="font-bold text-emerald-600">{formatCurrency(totalRevenue)}</span>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 rounded-2xl border border-emerald-100 p-6">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="w-5 h-5 text-emerald-600" />
              <p className="font-semibold text-emerald-800">Prochain RDV</p>
            </div>
            {dayAppointments.filter(a => a.status === 'scheduled')[0] ? (() => {
              const next = dayAppointments.filter(a => a.status === 'scheduled')[0]
              return (
                <div>
                  <p className="text-2xl font-bold text-emerald-700">
                    {format(new Date(next.date), 'HH:mm')}
                  </p>
                  <p className="text-sm text-emerald-600 mt-1">
                    {next.patient.firstName} {next.patient.lastName}
                  </p>
                </div>
              )
            })() : (
              <p className="text-sm text-emerald-600">Aucun RDV planifié</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
