import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { UserPlus, Search, Filter, Users, ChevronRight } from 'lucide-react'
import { getStatusColor, getStatusLabel, formatDate } from '@/lib/utils'

async function getPatients(search?: string, status?: string) {
  return prisma.patient.findMany({
    where: {
      AND: [
        search ? {
          OR: [
            { firstName: { contains: search } },
            { lastName: { contains: search } },
            { email: { contains: search } },
          ],
        } : {},
        status ? { status } : {},
      ],
    },
    include: {
      appointments: { orderBy: { date: 'desc' }, take: 1 },
    },
    orderBy: { createdAt: 'desc' },
  })
}

const objectiveLabels: Record<string, string> = {
  weight_loss: 'Perte de poids',
  balance: 'Rééquilibrage',
  pathology: 'Pathologie',
  performance: 'Performance',
  other: 'Autre',
}

const sourceLabels: Record<string, { label: string; color: string }> = {
  facebook: { label: 'Facebook', color: 'bg-blue-100 text-blue-700' },
  instagram: { label: 'Instagram', color: 'bg-pink-100 text-pink-700' },
  google: { label: 'Google', color: 'bg-red-100 text-red-700' },
  direct: { label: 'Direct', color: 'bg-gray-100 text-gray-700' },
}

export default async function PatientsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; status?: string }>
}) {
  const resolvedSearchParams = await searchParams
  const patients = await getPatients(resolvedSearchParams.search, resolvedSearchParams.status)

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
          <p className="text-gray-500 mt-1">{patients.length} patient{patients.length !== 1 ? 's' : ''}</p>
        </div>
        <Link
          href="/admin/patients/nouveau"
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-colors shadow-sm"
        >
          <UserPlus className="w-4 h-4" />
          Nouveau patient
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6">
        <form className="flex flex-wrap gap-3">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              name="search"
              defaultValue={resolvedSearchParams.search}
              placeholder="Rechercher un patient..."
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <select
            name="status"
            defaultValue={resolvedSearchParams.status}
            className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
          >
            <option value="">Tous les statuts</option>
            <option value="active">Actifs</option>
            <option value="prospect">Prospects</option>
            <option value="inactive">Inactifs</option>
          </select>
          <button
            type="submit"
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filtrer
          </button>
        </form>
      </div>

      {/* Patients table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {patients.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium">Aucun patient trouvé</p>
            <p className="text-sm mt-1">
              {resolvedSearchParams.search ? 'Essayez une autre recherche' : 'Ajoutez votre premier patient'}
            </p>
            <Link
              href="/admin/patients/nouveau"
              className="inline-flex items-center gap-2 mt-4 bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-emerald-600 transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              Ajouter un patient
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Patient</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Objectif</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Statut</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Source</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Dernier RDV</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Inscrit le</th>
                  <th className="px-6 py-4" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {patients.map((patient) => {
                  const lastApt = patient.appointments[0]
                  const source = patient.source ? sourceLabels[patient.source] : null
                  
                  return (
                    <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                            {patient.firstName[0]}{patient.lastName[0]}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{patient.firstName} {patient.lastName}</p>
                            <p className="text-sm text-gray-400">{patient.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">
                          {patient.objective ? objectiveLabels[patient.objective] || patient.objective : '—'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusColor(patient.status)}`}>
                          {getStatusLabel(patient.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {source ? (
                          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${source.color}`}>
                            {source.label}
                          </span>
                        ) : <span className="text-gray-400">—</span>}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {lastApt ? formatDate(lastApt.date) : '—'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(patient.createdAt)}
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/admin/patients/${patient.id}`}
                          className="flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                        >
                          Voir
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
