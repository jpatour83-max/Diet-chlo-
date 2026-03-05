import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const patient = await prisma.patient.findUnique({
      where: { id: params.id },
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
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const patient = await prisma.patient.update({
      where: { id: params.id },
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
  } catch {
    return NextResponse.json({ error: 'Erreur lors de la mise à jour' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.patient.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Erreur lors de la suppression' }, { status: 500 })
  }
}
