import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const booking = await prisma.bookingRequest.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        type: body.type,
        date: new Date(body.date),
        timeSlot: body.timeSlot,
        objective: body.objective,
        message: body.message,
        source: body.source,
        status: 'pending',
      },
    })
    return NextResponse.json(booking, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Erreur lors de la réservation' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const bookings = await prisma.bookingRequest.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(bookings)
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
