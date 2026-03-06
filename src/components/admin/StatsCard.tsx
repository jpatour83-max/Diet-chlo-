import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: number
  trendLabel?: string
  color?: 'emerald' | 'blue' | 'purple' | 'orange' | 'teal'
  suffix?: string
}

const colorMap = {
  emerald: { bg: 'bg-emerald-50', icon: 'bg-emerald-500', text: 'text-emerald-600' },
  blue: { bg: 'bg-blue-50', icon: 'bg-blue-500', text: 'text-blue-600' },
  purple: { bg: 'bg-purple-50', icon: 'bg-purple-500', text: 'text-purple-600' },
  orange: { bg: 'bg-orange-50', icon: 'bg-orange-500', text: 'text-orange-600' },
  teal: { bg: 'bg-teal-50', icon: 'bg-teal-500', text: 'text-teal-600' },
}

export default function StatsCard({
  title, value, icon: Icon, trend, trendLabel, color = 'emerald', suffix = ''
}: StatsCardProps) {
  const colors = colorMap[color]
  const isPositive = trend !== undefined && trend >= 0

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">
            {value}{suffix}
          </p>
        </div>
        <div className={`w-12 h-12 ${colors.icon} rounded-xl flex items-center justify-center shadow-sm`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      
      {trend !== undefined && (
        <div className="flex items-center gap-1.5">
          {isPositive ? (
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-400" />
          )}
          <span className={`text-sm font-medium ${isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
            {isPositive ? '+' : ''}{trend}%
          </span>
          {trendLabel && <span className="text-sm text-gray-400">{trendLabel}</span>}
        </div>
      )}
    </div>
  )
}
