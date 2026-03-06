import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')
    const patientId = searchParams.get('patientId')

    const where: { patientId?: string; date?: { gte: Date; lte: Date } } = {}
    if (patientId) where.patientId = patientId
    if (date) {
      const start = new Date(date)
      start.setHours(0, 0, 0, 0)
      const end = new Date(date)
      end.setHours(23, 59, 59, 999)
      where.date = { gte: start, lte: end }
    }

    const appointments = await prisma.appointment.findMany({
      where,
      include: { patient: true },
      orderBy: { date: 'asc' },
    })

    return NextResponse.json(appointments)
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const appointment = await prisma.appointment.create({
      data: {
        patientId: body.patientId,
        date: new Date(body.date),
        duration: body.duration || 60,
        type: body.type,
        status: body.status || 'scheduled',
        notes: body.notes,
        price: body.price ? parseFloat(body.price) : null,
      },
      include: { patient: true },
    })
    return NextResponse.json(appointment, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Erreur lors de la création du rendez-vous' }, { status: 500 })
  }
}
