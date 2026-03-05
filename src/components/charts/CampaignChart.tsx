'use client'

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  LineChart, Line,
} from 'recharts'

interface CampaignChartProps {
  data: Array<{
    platform: string
    impressions: number
    clicks: number
    conversions: number
    spent: number
  }>
}

const platformLabels: Record<string, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  google: 'Google',
  retargeting: 'Retargeting',
}

export function CampaignPerformanceChart({ data }: CampaignChartProps) {
  const chartData = data.map(d => ({
    name: platformLabels[d.platform] || d.platform,
    Impressions: Math.round(d.impressions / 1000),
    Clics: d.clicks,
    Dépenses: Math.round(d.spent),
  }))

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip
          contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', fontSize: '12px' }}
        />
        <Legend />
        <Bar dataKey="Impressions" fill="#10b981" radius={[4, 4, 0, 0]} name="Impressions (k)" />
        <Bar dataKey="Clics" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        <Bar dataKey="Dépenses" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Dépenses (€)" />
      </BarChart>
    </ResponsiveContainer>
  )
}

interface ROASChartProps {
  data: Array<{
    platform: string
    roas: number
    cpc: number
  }>
}

export function ROASChart({ data }: ROASChartProps) {
  const chartData = data.map(d => ({
    name: platformLabels[d.platform] || d.platform,
    ROAS: d.roas,
    CPC: d.cpc,
  }))

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip
          contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', fontSize: '12px' }}
        />
        <Legend />
        <Line type="monotone" dataKey="ROAS" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
        <Line type="monotone" dataKey="CPC" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}
