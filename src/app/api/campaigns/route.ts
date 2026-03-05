import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const campaigns = await prisma.campaign.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(campaigns)
  } catch (err) {
    console.error('GET /api/campaigns error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const campaign = await prisma.campaign.create({
      data: {
        name: body.name,
        platform: body.platform,
        status: body.status || 'active',
        budget: parseFloat(body.budget),
        spent: body.spent ? parseFloat(body.spent) : 0,
        impressions: body.impressions || 0,
        clicks: body.clicks || 0,
        conversions: body.conversions || 0,
        startDate: new Date(body.startDate),
        endDate: body.endDate ? new Date(body.endDate) : null,
        objective: body.objective,
      },
    })
    return NextResponse.json(campaign, { status: 201 })
  } catch (err) {
    console.error('POST /api/campaigns error:', err)
    return NextResponse.json({ error: 'Erreur lors de la création de la campagne' }, { status: 500 })
  }
}
