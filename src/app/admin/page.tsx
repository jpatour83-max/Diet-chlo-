import { prisma } from '@/lib/prisma'
import StatsCard from '@/components/admin/StatsCard'
import SeedButton from '@/components/admin/SeedButton'
import { Users, Calendar, Euro, TrendingUp, Clock, CheckCircle, ArrowRight, UserPlus } from 'lucide-react'
import Link from 'next/link'
import { formatDateTime, formatCurrency, getStatusLabel, getStatusColor } from '@/lib/utils'

async function getDashboardData() {
  const now = new Date()
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59)
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  const [
    totalPatients,
    activePatients,
    appointmentsToday,
    monthlyRevenue,
    recentAppointments,
    recentPatients,
    completedThisMonth,
    prospects,
  ] = await Promise.all([
    prisma.patient.count(),
    prisma.patient.count({ where: { status: 'active' } }),
    prisma.appointment.count({
      where: { date: { gte: startOfToday, lte: endOfToday } },
    }),
    prisma.appointment.aggregate({
      where: {
        status: 'completed',
        date: { gte: startOfMonth },
        price: { not: null },
      },
      _sum: { price: true },
    }),
    prisma.appointment.findMany({
      take: 8,
      orderBy: { date: 'asc' },
      where: { date: { gte: startOfToday } },
      include: { patient: true },
    }),
    prisma.patient.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.appointment.count({
      where: { status: 'completed', date: { gte: startOfMonth } },
    }),
    prisma.patient.count({ where: { status: 'prospect' } }),
  ])

  const conversionRate = totalPatients > 0 
    ? Math.round((activePatients / totalPatients) * 100) 
    : 0

  return {
    totalPatients,
    appointmentsToday,
    monthlyRevenue: monthlyRevenue._sum.price || 0,
    conversionRate,
    recentAppointments,
    recentPatients,
    completedThisMonth,
    prospects,
  }
}

export default async function AdminDashboard() {
  const data = await getDashboardData()

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-500 mt-1">Bienvenue, Chloé 👋</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/patients/nouveau"
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-colors shadow-sm"
          >
            <UserPlus className="w-4 h-4" />
            Nouveau patient
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Patients"
          value={data.totalPatients}
          icon={Users}
          trend={12}
          trendLabel="ce mois"
          color="emerald"
        />
        <StatsCard
          title="RDV Aujourd'hui"
          value={data.appointmentsToday}
          icon={Calendar}
          color="blue"
        />
        <StatsCard
          title="Revenus du Mois"
          value={formatCurrency(data.monthlyRevenue)}
          icon={Euro}
          trend={8}
          trendLabel="vs. mois dernier"
          color="purple"
        />
        <StatsCard
          title="Taux de Conversion"
          value={data.conversionRate}
          icon={TrendingUp}
          trend={3}
          trendLabel="vs. mois dernier"
          color="orange"
          suffix="%"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upcoming appointments */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">Prochains rendez-vous</h2>
            <Link href="/admin/rendez-vous" className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
              Voir tout <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {data.recentAppointments.length === 0 ? (
              <div className="p-6 text-center text-gray-400">
                <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>Aucun rendez-vous aujourd&apos;hui</p>
              </div>
            ) : (
              data.recentAppointments.map((apt) => (
                <div key={apt.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900">
                      {apt.patient.firstName} {apt.patient.lastName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatDateTime(apt.date)} · {apt.type === 'video' ? 'Vidéo' : 'Téléphone'} · {apt.duration} min
                    </p>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusColor(apt.status)}`}>
                    {getStatusLabel(apt.status)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent patients + Quick stats */}
        <div className="space-y-6">
          {/* Quick stats */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-bold text-gray-900 mb-4">Résumé</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">RDV terminés ce mois</span>
                <span className="font-semibold text-gray-800 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  {data.completedThisMonth}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Patients actifs</span>
                <span className="font-semibold text-gray-800">{data.totalPatients - data.prospects}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Prospects</span>
                <span className="font-semibold text-blue-600">{data.prospects}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex gap-2">
                <Link
                  href="/admin/patients/nouveau"
                  className="flex-1 text-center bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-3 py-2 rounded-xl text-sm font-medium transition-colors"
                >
                  + Patient
                </Link>
                <SeedButton />
              </div>
            </div>
          </div>

          {/* Recent patients */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="font-bold text-gray-900">Derniers patients</h2>
              <Link href="/admin/patients" className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                Voir tout <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="divide-y divide-gray-50">
              {data.recentPatients.map((patient) => (
                <Link
                  key={patient.id}
                  href={`/admin/patients/${patient.id}`}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {patient.firstName[0]}{patient.lastName[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {patient.firstName} {patient.lastName}
                    </p>
                    <p className="text-xs text-gray-400 truncate">{patient.email}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusColor(patient.status)}`}>
                    {getStatusLabel(patient.status)}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
