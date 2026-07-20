import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'
import pg from 'pg'

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL!,
  connectionTimeoutMillis: 30000,
  idleTimeoutMillis: 30000,
})
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  // ── Campuses ──────────────────────────────────────────────────────────────
  const campuses = await Promise.all([
    prisma.campus.upsert({
      where: { id: 'campus-uon' },
      update: {},
      create: { id: 'campus-uon', name: 'University of Nairobi', city: 'Nairobi', latitude: -1.2792, longitude: 36.8172 },
    }),
    prisma.campus.upsert({
      where: { id: 'campus-ku' },
      update: {},
      create: { id: 'campus-ku', name: 'Kenyatta University', city: 'Nairobi', latitude: -1.1817, longitude: 36.9356 },
    }),
    prisma.campus.upsert({
      where: { id: 'campus-strathmore' },
      update: {},
      create: { id: 'campus-strathmore', name: 'Strathmore University', city: 'Nairobi', latitude: -1.3101, longitude: 36.8126 },
    }),
    prisma.campus.upsert({
      where: { id: 'campus-mku' },
      update: {},
      create: { id: 'campus-mku', name: 'Mount Kenya University', city: 'Thika', latitude: -1.0332, longitude: 37.0693 },
    }),
  ])

  const [uon, ku, strathmore] = campuses

  // ── Owner accounts ────────────────────────────────────────────────────────
  const hash = await bcrypt.hash('password123', 10)

  const owner1 = await prisma.user.upsert({
    where: { email: 'owner1@safestay.co.ke' },
    update: {},
    create: { id: 'owner-1', name: 'James Kariuki', email: 'owner1@safestay.co.ke', passwordHash: hash, role: 'OWNER', phone: '+254711000001' },
  })
  const owner2 = await prisma.user.upsert({
    where: { email: 'owner2@safestay.co.ke' },
    update: {},
    create: { id: 'owner-2', name: 'Grace Njeri', email: 'owner2@safestay.co.ke', passwordHash: hash, role: 'OWNER', phone: '+254711000002' },
  })
  const owner3 = await prisma.user.upsert({
    where: { email: 'owner3@safestay.co.ke' },
    update: {},
    create: { id: 'owner-3', name: 'Peter Omondi', email: 'owner3@safestay.co.ke', passwordHash: hash, role: 'OWNER', phone: '+254711000003' },
  })

  // ── Hostels ───────────────────────────────────────────────────────────────
  const hostelsData = [
    {
      id: 'hostel-1',
      ownerId: owner1.id,
      campusId: uon.id,
      name: 'Riverside Court',
      description: 'Modern student hostel 5 minutes walk from UoN main gate. 24/7 security, fast Wi-Fi, and a rooftop study lounge.',
      address: 'Ngong Road, Nairobi',
      latitude: -1.2820, longitude: 36.8200,
      gender: 'MIXED' as const,
      amenities: ['Wi-Fi', 'Security', 'Water', 'Study room', 'Laundry'],
      verified: true,
      status: 'LIVE' as const,
      minutesToCampus: 5,
      images: [
        { url: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80', isCover: true },
        { url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80', isCover: false },
      ],
      rooms: [
        { type: 'SINGLE' as const, pricePerMonth: 6500, pricePerTerm: 19500, capacity: 1, availableUnits: 4 },
        { type: 'SHARED' as const, pricePerMonth: 3500, pricePerTerm: 10500, capacity: 2, availableUnits: 6 },
        { type: 'EN_SUITE' as const, pricePerMonth: 9500, pricePerTerm: 28500, capacity: 1, availableUnits: 2 },
      ],
    },
    {
      id: 'hostel-2',
      ownerId: owner2.id,
      campusId: uon.id,
      name: 'Uhuru Gardens Hostel',
      description: 'Quiet, female-only hostel with a garden courtyard. 8-minute matatu ride to UoN. CCTV, backup generator, clean shared kitchens.',
      address: 'Uhuru Highway, Nairobi',
      latitude: -1.2900, longitude: 36.8150,
      gender: 'FEMALE' as const,
      amenities: ['Wi-Fi', 'CCTV', 'Generator', 'Kitchen', 'Water'],
      verified: true,
      status: 'LIVE' as const,
      minutesToCampus: 8,
      images: [
        { url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80', isCover: true },
        { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80', isCover: false },
      ],
      rooms: [
        { type: 'SINGLE' as const, pricePerMonth: 5500, pricePerTerm: 16500, capacity: 1, availableUnits: 5 },
        { type: 'BEDSITTER' as const, pricePerMonth: 11000, pricePerTerm: 33000, capacity: 1, availableUnits: 1 },
      ],
    },
    {
      id: 'hostel-3',
      ownerId: owner1.id,
      campusId: ku.id,
      name: 'Thika Road Suites',
      description: 'Premium male hostel 3 minutes from KU main gate. En-suite rooms, gym access, and a rooftop terrace with city views.',
      address: 'Thika Road, Nairobi',
      latitude: -1.1850, longitude: 36.9300,
      gender: 'MALE' as const,
      amenities: ['Wi-Fi', 'Gym', 'Security', 'Parking', 'Water', 'Study room'],
      verified: true,
      status: 'LIVE' as const,
      minutesToCampus: 3,
      images: [
        { url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80', isCover: true },
        { url: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80', isCover: false },
      ],
      rooms: [
        { type: 'EN_SUITE' as const, pricePerMonth: 12000, pricePerTerm: 36000, capacity: 1, availableUnits: 3 },
        { type: 'SINGLE' as const, pricePerMonth: 7500, pricePerTerm: 22500, capacity: 1, availableUnits: 4 },
        { type: 'SHARED' as const, pricePerMonth: 4000, pricePerTerm: 12000, capacity: 2, availableUnits: 8 },
      ],
    },
    {
      id: 'hostel-4',
      ownerId: owner3.id,
      campusId: ku.id,
      name: 'Kasarani Heights',
      description: 'Affordable mixed hostel near KU. Clean rooms, reliable water supply, and a communal lounge. Great for first-year students.',
      address: 'Kasarani, Nairobi',
      latitude: -1.2000, longitude: 36.9000,
      gender: 'MIXED' as const,
      amenities: ['Wi-Fi', 'Water', 'Security', 'Laundry'],
      verified: false,
      status: 'LIVE' as const,
      minutesToCampus: 12,
      images: [
        { url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80', isCover: true },
      ],
      rooms: [
        { type: 'SHARED' as const, pricePerMonth: 2800, pricePerTerm: 8400, capacity: 3, availableUnits: 10 },
        { type: 'SINGLE' as const, pricePerMonth: 4500, pricePerTerm: 13500, capacity: 1, availableUnits: 3 },
      ],
    },
    {
      id: 'hostel-5',
      ownerId: owner2.id,
      campusId: strathmore.id,
      name: 'Madaraka Executive Suites',
      description: 'Upmarket bedsitters and en-suites for Strathmore students. 6 minutes walk to campus. Fibre internet, backup power, concierge.',
      address: 'Madaraka Estate, Nairobi',
      latitude: -1.3050, longitude: 36.8100,
      gender: 'MIXED' as const,
      amenities: ['Fibre Wi-Fi', 'Generator', 'CCTV', 'Concierge', 'Water', 'Parking'],
      verified: true,
      status: 'LIVE' as const,
      minutesToCampus: 6,
      images: [
        { url: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80', isCover: true },
        { url: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80', isCover: false },
      ],
      rooms: [
        { type: 'BEDSITTER' as const, pricePerMonth: 14000, pricePerTerm: 42000, capacity: 1, availableUnits: 2 },
        { type: 'EN_SUITE' as const, pricePerMonth: 11000, pricePerTerm: 33000, capacity: 1, availableUnits: 3 },
      ],
    },
    {
      id: 'hostel-6',
      ownerId: owner3.id,
      campusId: strathmore.id,
      name: 'South C Student Lodge',
      description: 'Budget-friendly female hostel near Strathmore. Clean, safe, and well-managed. Shared kitchen and laundry facilities.',
      address: 'South C, Nairobi',
      latitude: -1.3200, longitude: 36.8200,
      gender: 'FEMALE' as const,
      amenities: ['Wi-Fi', 'Kitchen', 'Laundry', 'Security', 'Water'],
      verified: true,
      status: 'LIVE' as const,
      minutesToCampus: 10,
      images: [
        { url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80', isCover: true },
      ],
      rooms: [
        { type: 'SINGLE' as const, pricePerMonth: 5000, pricePerTerm: 15000, capacity: 1, availableUnits: 6 },
        { type: 'SHARED' as const, pricePerMonth: 3000, pricePerTerm: 9000, capacity: 2, availableUnits: 8 },
      ],
    },
  ]

  for (const h of hostelsData) {
    const { images, rooms, minutesToCampus, ...hostelData } = h
    await prisma.hostel.upsert({
      where: { id: h.id },
      update: {},
      create: {
        ...hostelData,
        images: { create: images },
        rooms: { create: rooms },
      },
    })
  }

  // ── Student + reviews ─────────────────────────────────────────────────────
  const student = await prisma.user.upsert({
    where: { email: 'student@safestay.co.ke' },
    update: {},
    create: { id: 'student-1', name: 'Amina Wanjiku', email: 'student@safestay.co.ke', passwordHash: hash, role: 'STUDENT' },
  })

  // Create a completed booking so we can attach reviews
  const room = await prisma.room.findFirst({ where: { hostelId: 'hostel-1' } })
  if (room) {
    const booking = await prisma.booking.upsert({
      where: { id: 'booking-seed-1' },
      update: {},
      create: {
        id: 'booking-seed-1',
        studentId: student.id,
        roomId: room.id,
        moveInDate: new Date('2025-01-15'),
        status: 'COMPLETED',
        amountDue: room.pricePerMonth,
        amountPaid: room.pricePerMonth,
      },
    })
    await prisma.review.upsert({
      where: { bookingId: booking.id },
      update: {},
      create: {
        hostelId: 'hostel-1',
        studentId: student.id,
        bookingId: booking.id,
        rating: 5,
        comment: 'Excellent hostel — clean, secure, and the Wi-Fi is fast. The study lounge was a lifesaver during exams.',
      },
    })
  }

  console.log('✅ Seed complete — 4 campuses, 6 hostels, 3 owners, 1 student, 1 review')
}

main().catch(console.error).finally(() => prisma.$disconnect())
