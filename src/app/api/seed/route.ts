import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST() {
  try {
    // Create admin user
    const hashedPassword = await bcrypt.hash('Admin123!', 10)
    await prisma.user.upsert({
      where: { email: 'admin@dietchloe.fr' },
      update: {},
      create: {
        email: 'admin@dietchloe.fr',
        password: hashedPassword,
        name: 'Chloé Constantin',
        role: 'admin',
      },
    })

    // Create patients
    const patients = await Promise.all([
      prisma.patient.upsert({
        where: { email: 'marie.dupont@email.fr' },
        update: {},
        create: {
          firstName: 'Marie',
          lastName: 'Dupont',
          email: 'marie.dupont@email.fr',
          phone: '06 12 34 56 78',
          dateOfBirth: new Date('1985-03-15'),
          gender: 'female',
          city: 'Paris',
          postalCode: '75011',
          objective: 'weight_loss',
          initialWeight: 78,
          targetWeight: 65,
          height: 165,
          status: 'active',
          source: 'instagram',
          notes: 'Patiente motivée, suit bien les recommandations',
        },
      }),
      prisma.patient.upsert({
        where: { email: 'pierre.martin@email.fr' },
        update: {},
        create: {
          firstName: 'Pierre',
          lastName: 'Martin',
          email: 'pierre.martin@email.fr',
          phone: '06 23 45 67 89',
          dateOfBirth: new Date('1978-07-22'),
          gender: 'male',
          city: 'Lyon',
          postalCode: '69003',
          objective: 'pathology',
          pathology: 'Diabète type 2',
          initialWeight: 95,
          targetWeight: 82,
          height: 178,
          status: 'active',
          source: 'google',
          notes: 'Diabétique, suivi en coordination avec médecin traitant',
        },
      }),
      prisma.patient.upsert({
        where: { email: 'sophie.bernard@email.fr' },
        update: {},
        create: {
          firstName: 'Sophie',
          lastName: 'Bernard',
          email: 'sophie.bernard@email.fr',
          phone: '06 34 56 78 90',
          dateOfBirth: new Date('1992-11-08'),
          gender: 'female',
          city: 'Marseille',
          postalCode: '13005',
          objective: 'balance',
          initialWeight: 58,
          height: 162,
          status: 'active',
          source: 'facebook',
        },
      }),
      prisma.patient.upsert({
        where: { email: 'lucas.petit@email.fr' },
        update: {},
        create: {
          firstName: 'Lucas',
          lastName: 'Petit',
          email: 'lucas.petit@email.fr',
          phone: '06 45 67 89 01',
          dateOfBirth: new Date('1990-05-30'),
          gender: 'male',
          city: 'Bordeaux',
          postalCode: '33000',
          objective: 'weight_loss',
          initialWeight: 102,
          targetWeight: 85,
          height: 182,
          status: 'prospect',
          source: 'facebook',
        },
      }),
      prisma.patient.upsert({
        where: { email: 'camille.leroy@email.fr' },
        update: {},
        create: {
          firstName: 'Camille',
          lastName: 'Leroy',
          email: 'camille.leroy@email.fr',
          phone: '06 56 78 90 12',
          dateOfBirth: new Date('1988-09-14'),
          gender: 'female',
          city: 'Toulouse',
          postalCode: '31000',
          objective: 'pathology',
          pathology: 'Hypothyroïdie',
          initialWeight: 72,
          targetWeight: 62,
          height: 168,
          status: 'active',
          source: 'direct',
        },
      }),
      prisma.patient.upsert({
        where: { email: 'thomas.rousseau@email.fr' },
        update: {},
        create: {
          firstName: 'Thomas',
          lastName: 'Rousseau',
          email: 'thomas.rousseau@email.fr',
          phone: '06 67 89 01 23',
          dateOfBirth: new Date('1982-12-03'),
          gender: 'male',
          city: 'Nantes',
          postalCode: '44000',
          objective: 'balance',
          initialWeight: 80,
          height: 175,
          status: 'inactive',
          source: 'google',
        },
      }),
    ])

    // Create appointments
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    
    await prisma.appointment.createMany({
      data: [
        {
          patientId: patients[0].id,
          date: new Date(today.getTime() + 9 * 3600000),
          duration: 60,
          type: 'video',
          status: 'scheduled',
          price: 60,
        },
        {
          patientId: patients[1].id,
          date: new Date(today.getTime() + 11 * 3600000),
          duration: 60,
          type: 'phone',
          status: 'scheduled',
          price: 60,
        },
        {
          patientId: patients[2].id,
          date: new Date(today.getTime() + 14 * 3600000),
          duration: 45,
          type: 'video',
          status: 'scheduled',
          price: 55,
        },
        {
          patientId: patients[0].id,
          date: new Date(today.getTime() - 7 * 24 * 3600000),
          duration: 60,
          type: 'video',
          status: 'completed',
          price: 60,
          notes: 'Bonne progression. -2kg depuis la dernière consultation.',
        },
        {
          patientId: patients[1].id,
          date: new Date(today.getTime() - 14 * 24 * 3600000),
          duration: 60,
          type: 'phone',
          status: 'completed',
          price: 60,
          notes: 'Glycémie stabilisée. Adaptation du plan alimentaire.',
        },
        {
          patientId: patients[4].id,
          date: new Date(today.getTime() - 3 * 24 * 3600000),
          duration: 60,
          type: 'video',
          status: 'completed',
          price: 60,
        },
        {
          patientId: patients[3].id,
          date: new Date(today.getTime() + 2 * 24 * 3600000),
          duration: 60,
          type: 'phone',
          status: 'scheduled',
          price: 60,
        },
        {
          patientId: patients[2].id,
          date: new Date(today.getTime() - 30 * 24 * 3600000),
          duration: 60,
          type: 'video',
          status: 'completed',
          price: 60,
        },
      ],
      
    })

    // Create health metrics
    await prisma.healthMetric.createMany({
      data: [
        { patientId: patients[0].id, date: new Date(today.getTime() - 60 * 24 * 3600000), weight: 78, bmi: 28.6, waist: 88 },
        { patientId: patients[0].id, date: new Date(today.getTime() - 30 * 24 * 3600000), weight: 75, bmi: 27.5, waist: 85 },
        { patientId: patients[0].id, date: new Date(today.getTime() - 7 * 24 * 3600000), weight: 73, bmi: 26.8, waist: 82 },
        { patientId: patients[1].id, date: new Date(today.getTime() - 60 * 24 * 3600000), weight: 95, bmi: 30.0, waist: 102 },
        { patientId: patients[1].id, date: new Date(today.getTime() - 30 * 24 * 3600000), weight: 92, bmi: 29.1, waist: 99 },
        { patientId: patients[1].id, date: new Date(today.getTime() - 14 * 24 * 3600000), weight: 90, bmi: 28.4, waist: 97 },
      ],
      
    })

    // Create diet plans
    await prisma.dietPlan.createMany({
      data: [
        {
          patientId: patients[0].id,
          title: 'Plan hypocalorique - Phase 1',
          description: 'Réduction progressive des apports caloriques avec maintien des protéines',
          startDate: new Date(today.getTime() - 30 * 24 * 3600000),
          calories: 1600,
          proteins: 100,
          carbs: 180,
          fats: 50,
          status: 'active',
          content: 'Petit-déjeuner: yaourt grec + fruits rouges + flocons avoine\nDéjeuner: protéines maigres + légumes + féculents\nDîner: légumes cuits + protéines légères',
        },
        {
          patientId: patients[1].id,
          title: 'Plan diabète type 2',
          description: 'Alimentation à index glycémique bas, riche en fibres',
          startDate: new Date(today.getTime() - 45 * 24 * 3600000),
          calories: 1800,
          proteins: 110,
          carbs: 160,
          fats: 65,
          status: 'active',
          content: 'Éviter sucres rapides, favoriser légumineuses et légumes verts, 3 repas réguliers',
        },
      ],
      
    })

    // Create consultation notes
    await prisma.consultationNote.createMany({
      data: [
        {
          patientId: patients[0].id,
          date: new Date(today.getTime() - 7 * 24 * 3600000),
          content: 'Excellente motivation. A bien suivi le plan alimentaire. Perte de 2kg en 2 semaines.',
          nextSteps: 'Maintenir le plan actuel, introduire davantage d\'activité physique.',
        },
        {
          patientId: patients[1].id,
          date: new Date(today.getTime() - 14 * 24 * 3600000),
          content: 'Glycémie en amélioration selon carnet de suivi. Bonne observance du régime.',
          nextSteps: 'Consultation avec diabétologue recommandée. Ajuster traitement si glycémie stable.',
        },
      ],
      
    })

    // Create campaigns
    await prisma.campaign.createMany({
      data: [
        {
          name: 'Facebook - Perte de poids printemps',
          platform: 'facebook',
          status: 'active',
          budget: 500,
          spent: 387,
          impressions: 45200,
          clicks: 1240,
          conversions: 18,
          startDate: new Date(today.getTime() - 30 * 24 * 3600000),
          objective: 'conversions',
        },
        {
          name: 'Instagram - Rééquilibrage alimentaire',
          platform: 'instagram',
          status: 'active',
          budget: 300,
          spent: 215,
          impressions: 32100,
          clicks: 890,
          conversions: 12,
          startDate: new Date(today.getTime() - 25 * 24 * 3600000),
          objective: 'traffic',
        },
        {
          name: 'Google Ads - Diététicienne consultation',
          platform: 'google',
          status: 'active',
          budget: 400,
          spent: 342,
          impressions: 18500,
          clicks: 620,
          conversions: 22,
          startDate: new Date(today.getTime() - 20 * 24 * 3600000),
          objective: 'conversions',
        },
        {
          name: 'Retargeting - Visiteurs site web',
          platform: 'retargeting',
          status: 'active',
          budget: 200,
          spent: 156,
          impressions: 28700,
          clicks: 980,
          conversions: 15,
          startDate: new Date(today.getTime() - 15 * 24 * 3600000),
          objective: 'conversions',
        },
        {
          name: 'Facebook - Campagne hiver',
          platform: 'facebook',
          status: 'ended',
          budget: 600,
          spent: 598,
          impressions: 62000,
          clicks: 1850,
          conversions: 25,
          startDate: new Date(today.getTime() - 90 * 24 * 3600000),
          endDate: new Date(today.getTime() - 35 * 24 * 3600000),
          objective: 'conversions',
        },
      ],
      
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Base de données initialisée avec succès',
      data: {
        patients: patients.length,
        campaigns: 5,
      }
    })
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json({ error: 'Erreur lors de l\'initialisation' }, { status: 500 })
  }
}
