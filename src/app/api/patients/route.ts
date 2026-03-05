import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || ''

    const patients = await prisma.patient.findMany({
      where: {
        AND: [
          search
            ? {
                OR: [
                  { firstName: { contains: search } },
                  { lastName: { contains: search } },
                  { email: { contains: search } },
                ],
              }
            : {},
          status ? { status } : {},
        ],
      },
      include: {
        appointments: {
          orderBy: { date: 'desc' },
          take: 1,
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(patients)
  } catch (error) {
    console.error('GET /api/patients error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const patient = await prisma.patient.create({
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
        status: body.status || 'prospect',
        source: body.source,
        notes: body.notes,
      },
    })
    return NextResponse.json(patient, { status: 201 })
  } catch (error) {
    console.error('POST /api/patients error:', error)
    return NextResponse.json({ error: 'Erreur lors de la création du patient' }, { status: 500 })
  }
}
