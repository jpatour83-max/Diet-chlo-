import { prisma } from '@/lib/prisma'
import { formatCurrency, getStatusColor, getStatusLabel } from '@/lib/utils'
import { format } from 'date-fns'
import { CampaignPerformanceChart, ROASChart } from '@/components/charts/CampaignChart'
import { TrendingUp, Euro, MousePointer, Target, Plus, Globe } from 'lucide-react'

const platformConfig: Record<string, { label: string; color: string; textColor: string }> = {
  facebook: { label: 'Facebook', color: 'bg-blue-100', textColor: 'text-blue-700' },
  instagram: { label: 'Instagram', color: 'bg-pink-100', textColor: 'text-pink-700' },
  google: { label: 'Google', color: 'bg-red-100', textColor: 'text-red-700' },
  retargeting: { label: 'Retargeting', color: 'bg-purple-100', textColor: 'text-purple-700' },
}

async function getCampaigns() {
  return prisma.campaign.findMany({ orderBy: { createdAt: 'desc' } })
}

function computeMetrics(campaigns: Awaited<ReturnType<typeof getCampaigns>>) {
  const active = campaigns.filter(c => c.status === 'active')
  
  const totalSpent = campaigns.reduce((s, c) => s + c.spent, 0)
  const totalConversions = campaigns.reduce((s, c) => s + c.conversions, 0)
  const totalClicks = campaigns.reduce((s, c) => s + c.clicks, 0)
  const avgCPC = totalClicks > 0 ? totalSpent / totalClicks : 0
  
  // ROAS: assuming avg consultation value of 60€
  const revenue = totalConversions * 60
  const roas = totalSpent > 0 ? revenue / totalSpent : 0

  const byPlatform = ['facebook', 'instagram', 'google', 'retargeting'].map(platform => {
    const platformCampaigns = campaigns.filter(c => c.platform === platform)
    const spent = platformCampaigns.reduce((s, c) => s + c.spent, 0)
    const clicks = platformCampaigns.reduce((s, c) => s + c.clicks, 0)
    const conversions = platformCampaigns.reduce((s, c) => s + c.conversions, 0)
    const impressions = platformCampaigns.reduce((s, c) => s + c.impressions, 0)
    const cpc = clicks > 0 ? spent / clicks : 0
    const platformRevenue = conversions * 60
    const platformRoas = spent > 0 ? platformRevenue / spent : 0
    
    return { platform, spent, clicks, conversions, impressions, cpc, roas: platformRoas }
  })

  return { totalSpent, totalConversions, avgCPC, roas, byPlatform, active }
}

export default async function MarketingPage() {
  const campaigns = await getCampaigns()
  const metrics = computeMetrics(campaigns)

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Marketing & Campagnes</h1>
          <p className="text-gray-500 mt-1">{metrics.active.length} campagnes actives</p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          Nouvelle campagne
        </button>
      </div>

      {/* Global KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total dépensé', value: formatCurrency(metrics.totalSpent), icon: Euro, color: 'text-red-500', bg: 'bg-red-50' },
          { label: 'Total conversions', value: metrics.totalConversions, icon: Target, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'CPC moyen', value: `€${metrics.avgCPC.toFixed(2)}`, icon: MousePointer, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'ROAS global', value: `${metrics.roas.toFixed(1)}x`, icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-50' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center mb-4`}>
              <Icon className={`w-6 h-6 ${color}`} />
            </div>
            <p className="text-sm text-gray-500 mb-1">{label}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Performance chart */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-900 mb-6">Performance par plateforme</h2>
          {campaigns.length > 0 ? (
            <CampaignPerformanceChart data={metrics.byPlatform} />
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-400">
              Pas de données disponibles
            </div>
          )}
        </div>

        {/* ROAS chart */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-900 mb-6">ROAS & CPC par plateforme</h2>
          {campaigns.length > 0 ? (
            <ROASChart data={metrics.byPlatform} />
          ) : (
            <div className="h-48 flex items-center justify-center text-gray-400">
              Pas de données disponibles
            </div>
          )}
        </div>
      </div>

      {/* Platform breakdown */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.byPlatform.map(({ platform, spent, clicks, conversions, cpc, roas }) => {
          const config = platformConfig[platform]
          return (
            <div key={platform} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${config.color} ${config.textColor}`}>
                  {config.label}
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Dépensé</span>
                  <span className="font-semibold">{formatCurrency(spent)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Clics</span>
                  <span className="font-semibold">{clicks.toLocaleString('fr-FR')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Conversions</span>
                  <span className="font-semibold text-emerald-600">{conversions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">CPC</span>
                  <span className="font-semibold">€{cpc.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-gray-100 pt-2">
                  <span className="text-gray-500">ROAS</span>
                  <span className={`font-bold ${roas >= 3 ? 'text-emerald-600' : roas >= 2 ? 'text-yellow-600' : 'text-red-500'}`}>
                    {roas.toFixed(1)}x
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Campaign list */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">Toutes les campagnes</h2>
          <p className="text-sm text-gray-500">{campaigns.length} campagnes</p>
        </div>
        
        {campaigns.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            <Globe className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>Aucune campagne créée</p>
            <p className="text-sm mt-1">Commencez par initialiser la base de données</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  {['Campagne', 'Plateforme', 'Statut', 'Budget', 'Dépensé', 'Impressions', 'Clics', 'Conv.', 'CPC', 'ROAS'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {campaigns.map((campaign) => {
                  const config = platformConfig[campaign.platform]
                  const ctr = campaign.impressions > 0 ? (campaign.clicks / campaign.impressions * 100).toFixed(2) : '0.00'
                  const cpc = campaign.clicks > 0 ? campaign.spent / campaign.clicks : 0
                  const revenue = campaign.conversions * 60
                  const roas = campaign.spent > 0 ? revenue / campaign.spent : 0
                  const budgetPct = campaign.budget > 0 ? Math.min(100, Math.round(campaign.spent / campaign.budget * 100)) : 0
                  
                  return (
                    <tr key={campaign.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{campaign.name}</p>
                          <p className="text-xs text-gray-400">
                            {format(new Date(campaign.startDate), 'dd/MM/yy')}
                            {campaign.endDate ? ` → ${format(new Date(campaign.endDate), 'dd/MM/yy')}` : ' (en cours)'}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${config.color} ${config.textColor}`}>
                          {config.label}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusColor(campaign.status)}`}>
                          {getStatusLabel(campaign.status)}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{formatCurrency(campaign.budget)}</p>
                          <div className="mt-1 h-1.5 bg-gray-100 rounded-full w-16">
                            <div
                              className="h-full bg-emerald-400 rounded-full"
                              style={{ width: `${budgetPct}%` }}
                            />
                          </div>
                          <p className="text-xs text-gray-400 mt-0.5">{budgetPct}% utilisé</p>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm font-semibold text-gray-900">{formatCurrency(campaign.spent)}</td>
                      <td className="px-4 py-4 text-sm text-gray-600">{campaign.impressions.toLocaleString('fr-FR')}</td>
                      <td className="px-4 py-4">
                        <div>
                          <p className="text-sm text-gray-800">{campaign.clicks.toLocaleString('fr-FR')}</p>
                          <p className="text-xs text-gray-400">CTR: {ctr}%</p>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm font-semibold text-emerald-600">{campaign.conversions}</td>
                      <td className="px-4 py-4 text-sm text-gray-700">€{cpc.toFixed(2)}</td>
                      <td className="px-4 py-4">
                        <span className={`text-sm font-bold ${roas >= 3 ? 'text-emerald-600' : roas >= 2 ? 'text-yellow-600' : 'text-red-500'}`}>
                          {roas.toFixed(1)}x
                        </span>
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
