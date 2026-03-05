import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft, Phone, Mail, MapPin, Calendar, FileText,
  ClipboardList, Activity, Edit, Target
} from 'lucide-react'
import { formatDate, formatDateTime, formatCurrency, getStatusColor, getStatusLabel, calculateBMI, getBMICategory } from '@/lib/utils'

async function getPatient(id: string) {
  return prisma.patient.findUnique({
    where: { id },
    include: {
      appointments: { orderBy: { date: 'desc' } },
      healthMetrics: { orderBy: { date: 'desc' } },
      dietPlans: { orderBy: { createdAt: 'desc' } },
      consultationNotes: { orderBy: { date: 'desc' } },
    },
  })
}

const objectiveLabels: Record<string, string> = {
  weight_loss: 'Perte de poids',
  balance: 'Rééquilibrage alimentaire',
  pathology: 'Gestion pathologie',
  performance: 'Performance sportive',
}

export default async function PatientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const patient = await getPatient(id)
  if (!patient) notFound()

  const latestMetric = patient.healthMetrics[0]
  const currentBMI = latestMetric?.bmi || 
    (patient.initialWeight && patient.height 
      ? calculateBMI(patient.initialWeight, patient.height) 
      : null)

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/patients"
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour
        </Link>
        <div className="w-px h-5 bg-gray-200" />
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">
            {patient.firstName} {patient.lastName}
          </h1>
          <p className="text-gray-500 mt-0.5">
            Patient depuis le {formatDate(patient.createdAt)}
          </p>
        </div>
        <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(patient.status)}`}>
          {getStatusLabel(patient.status)}
        </span>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left column: Info + Metrics */}
        <div className="space-y-6">
          {/* Patient info card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900">Informations</h2>
              <button className="text-gray-400 hover:text-gray-600">
                <Edit className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center text-white text-xl font-bold">
                {patient.firstName[0]}{patient.lastName[0]}
              </div>
              <div>
                <p className="font-bold text-gray-900 text-lg">{patient.firstName} {patient.lastName}</p>
                {patient.dateOfBirth && (
                  <p className="text-sm text-gray-500">
                    {new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear()} ans
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-gray-600">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="truncate">{patient.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Phone className="w-4 h-4 text-gray-400" />
                <span>{patient.phone}</span>
              </div>
              {patient.city && (
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>{patient.city}{patient.postalCode ? ` (${patient.postalCode})` : ''}</span>
                </div>
              )}
              {patient.objective && (
                <div className="flex items-center gap-3 text-gray-600">
                  <Target className="w-4 h-4 text-gray-400" />
                  <span>{objectiveLabels[patient.objective] || patient.objective}</span>
                </div>
              )}
              {patient.pathology && (
                <div className="flex items-center gap-3 text-gray-600">
                  <Activity className="w-4 h-4 text-gray-400" />
                  <span>{patient.pathology}</span>
                </div>
              )}
            </div>
          </div>

          {/* Health metrics */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-bold text-gray-900 mb-4">Métriques corporelles</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Poids actuel', value: latestMetric?.weight ? `${latestMetric.weight} kg` : patient.initialWeight ? `${patient.initialWeight} kg` : '—' },
                { label: 'Poids cible', value: patient.targetWeight ? `${patient.targetWeight} kg` : '—' },
                { label: 'Taille', value: patient.height ? `${patient.height} cm` : '—' },
                { label: 'IMC', value: currentBMI ? `${currentBMI}` : '—' },
              ].map(({ label, value }) => (
                <div key={label} className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-1">{label}</p>
                  <p className="font-bold text-gray-900">{value}</p>
                </div>
              ))}
            </div>
            {currentBMI && (
              <div className="mt-3 text-xs text-gray-500 text-center">
                IMC: {getBMICategory(currentBMI)}
              </div>
            )}

            {/* Weight history */}
            {patient.healthMetrics.length > 0 && (
              <div className="mt-4">
                <p className="text-xs font-medium text-gray-500 mb-2">Historique poids</p>
                <div className="space-y-1">
                  {patient.healthMetrics.slice(0, 4).map((metric) => (
                    <div key={metric.id} className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{formatDate(metric.date)}</span>
                      <span className="font-medium text-gray-800">{metric.weight} kg</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Appointments */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="font-bold text-gray-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-500" />
                Rendez-vous ({patient.appointments.length})
              </h2>
            </div>
            <div className="divide-y divide-gray-50 max-h-64 overflow-y-auto">
              {patient.appointments.length === 0 ? (
                <div className="p-6 text-center text-gray-400 text-sm">Aucun rendez-vous</div>
              ) : (
                patient.appointments.map((apt) => (
                  <div key={apt.id} className="flex items-center justify-between px-5 py-3">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{formatDateTime(apt.date)}</p>
                      <p className="text-xs text-gray-500">
                        {apt.type === 'video' ? 'Vidéo' : 'Téléphone'} · {apt.duration} min
                        {apt.price ? ` · ${formatCurrency(apt.price)}` : ''}
                      </p>
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${getStatusColor(apt.status)}`}>
                      {getStatusLabel(apt.status)}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Diet Plans */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="font-bold text-gray-900 flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-teal-500" />
                Plans alimentaires ({patient.dietPlans.length})
              </h2>
            </div>
            <div className="p-5 space-y-4">
              {patient.dietPlans.length === 0 ? (
                <p className="text-center text-gray-400 text-sm">Aucun plan alimentaire</p>
              ) : (
                patient.dietPlans.map((plan) => (
                  <div key={plan.id} className="border border-gray-100 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-gray-900">{plan.title}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(plan.status)}`}>
                        {getStatusLabel(plan.status)}
                      </span>
                    </div>
                    {plan.description && (
                      <p className="text-sm text-gray-600 mb-3">{plan.description}</p>
                    )}
                    {plan.calories && (
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          { label: 'Calories', value: `${plan.calories} kcal` },
                          { label: 'Protéines', value: `${plan.proteins}g` },
                          { label: 'Glucides', value: `${plan.carbs}g` },
                          { label: 'Lipides', value: `${plan.fats}g` },
                        ].map(({ label, value }) => (
                          <div key={label} className="bg-gray-50 rounded-lg p-2 text-center">
                            <p className="text-xs text-gray-500">{label}</p>
                            <p className="text-sm font-bold text-gray-800">{value}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    {plan.content && (
                      <div className="mt-3 p-3 bg-emerald-50 rounded-lg">
                        <p className="text-xs text-gray-600 whitespace-pre-line">{plan.content}</p>
                      </div>
                    )}
                    <p className="text-xs text-gray-400 mt-2">
                      Du {formatDate(plan.startDate)}{plan.endDate ? ` au ${formatDate(plan.endDate)}` : ' (en cours)'}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Consultation notes */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="font-bold text-gray-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-500" />
                Notes de consultation ({patient.consultationNotes.length})
              </h2>
            </div>
            <div className="p-5 space-y-4">
              {patient.consultationNotes.length === 0 ? (
                <p className="text-center text-gray-400 text-sm">Aucune note de consultation</p>
              ) : (
                patient.consultationNotes.map((note) => (
                  <div key={note.id} className="border-l-4 border-emerald-400 pl-4 py-1">
                    <p className="text-xs text-gray-400 mb-1">{formatDateTime(note.date)}</p>
                    <p className="text-sm text-gray-800">{note.content}</p>
                    {note.nextSteps && (
                      <div className="mt-2 bg-blue-50 rounded-lg p-2">
                        <p className="text-xs font-medium text-blue-700 mb-1">Prochaines étapes:</p>
                        <p className="text-xs text-blue-600">{note.nextSteps}</p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {patient.notes && (
            <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-5">
              <p className="text-sm font-medium text-yellow-800 mb-1">Notes</p>
              <p className="text-sm text-yellow-700">{patient.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
