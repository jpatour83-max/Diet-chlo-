export interface Patient {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth?: Date | null
  gender?: string | null
  address?: string | null
  city?: string | null
  postalCode?: string | null
  objective?: string | null
  pathology?: string | null
  initialWeight?: number | null
  targetWeight?: number | null
  height?: number | null
  status: string
  source?: string | null
  notes?: string | null
  createdAt: Date
  updatedAt: Date
  appointments?: Appointment[]
  healthMetrics?: HealthMetric[]
  dietPlans?: DietPlan[]
  consultationNotes?: ConsultationNote[]
}

export interface Appointment {
  id: string
  patientId: string
  patient?: Patient
  date: Date
  duration: number
  type: string
  status: string
  notes?: string | null
  price?: number | null
  createdAt: Date
}

export interface HealthMetric {
  id: string
  patientId: string
  date: Date
  weight?: number | null
  bmi?: number | null
  waist?: number | null
  hips?: number | null
  notes?: string | null
}

export interface DietPlan {
  id: string
  patientId: string
  title: string
  description?: string | null
  startDate: Date
  endDate?: Date | null
  calories?: number | null
  proteins?: number | null
  carbs?: number | null
  fats?: number | null
  content?: string | null
  status: string
  createdAt: Date
}

export interface ConsultationNote {
  id: string
  patientId: string
  date: Date
  content: string
  nextSteps?: string | null
}

export interface Campaign {
  id: string
  name: string
  platform: string
  status: string
  budget: number
  spent: number
  impressions: number
  clicks: number
  conversions: number
  startDate: Date
  endDate?: Date | null
  objective?: string | null
  createdAt: Date
}

export interface BookingRequest {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  type: string
  date: Date
  timeSlot: string
  objective?: string | null
  message?: string | null
  status: string
  source?: string | null
  createdAt: Date
}

export interface DashboardStats {
  totalPatients: number
  appointmentsToday: number
  monthlyRevenue: number
  conversionRate: number
  newPatientsThisMonth: number
  completedAppointmentsThisMonth: number
}
