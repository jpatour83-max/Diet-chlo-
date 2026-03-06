import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const { id } = await params
    const patient = await prisma.patient.findUnique({
      where: { id },
      include: {
        appointments: { orderBy: { date: 'desc' } },
        healthMetrics: { orderBy: { date: 'desc' } },
        dietPlans: { orderBy: { createdAt: 'desc' } },
        consultationNotes: { orderBy: { date: 'desc' } },
      },
    })
    if (!patient) {
      return NextResponse.json({ error: 'Patient introuvable' }, { status: 404 })
    }
    return NextResponse.json(patient)
  } catch (err) {
    console.error('GET /api/patients/[id] error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const { id } = await params
    const body = await request.json()
    const patient = await prisma.patient.update({
      where: { id },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        dateOfBirth: body.dateOfBirth ? new Date(body.dateOfBirth) : null,
        gender: body.gender,
        address: body.address,
        city: body.city,
        postalCode: body.postalCode,
        objective: body.objective,
        pathology: body.pathology,
        initialWeight: body.initialWeight ? parseFloat(body.initialWeight) : null,
        targetWeight: body.targetWeight ? parseFloat(body.targetWeight) : null,
        height: body.height ? parseFloat(body.height) : null,
        status: body.status,
        source: body.source,
        notes: body.notes,
      },
    })
    return NextResponse.json(patient)
  } catch (err) {
    console.error('PUT /api/patients/[id] error:', err)
    return NextResponse.json({ error: 'Erreur lors de la mise à jour' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const { id } = await params
    await prisma.patient.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('DELETE /api/patients/[id] error:', err)
    return NextResponse.json({ error: 'Erreur lors de la suppression' }, { status: 500 })
  }
}
