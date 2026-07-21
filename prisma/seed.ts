import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'
import pg from 'pg'

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set')

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 30000,
  idleTimeoutMillis: 30000,
})
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  // ── Campuses ──────────────────────────────────────────────────────────────
  await Promise.all([
    prisma.campus.upsert({ where: { id: 'campus-uon' }, update: {}, create: { id: 'campus-uon', name: 'University of Nairobi', city: 'Nairobi', latitude: -1.2792, longitude: 36.8172 } }),
    prisma.campus.upsert({ where: { id: 'campus-ku' }, update: {}, create: { id: 'campus-ku', name: 'Kenyatta University', city: 'Nairobi', latitude: -1.1817, longitude: 36.9356 } }),
    prisma.campus.upsert({ where: { id: 'campus-strathmore' }, update: {}, create: { id: 'campus-strathmore', name: 'Strathmore University', city: 'Nairobi', latitude: -1.3101, longitude: 36.8126 } }),
    prisma.campus.upsert({ where: { id: 'campus-mku' }, update: {}, create: { id: 'campus-mku', name: 'Mount Kenya University', city: 'Thika', latitude: -1.0332, longitude: 37.0693 } }),
    prisma.campus.upsert({ where: { id: 'campus-usiu' }, update: {}, create: { id: 'campus-usiu', name: 'USIU-Africa', city: 'Nairobi', latitude: -1.2200, longitude: 36.8900 } }),
    prisma.campus.upsert({ where: { id: 'campus-daystar' }, update: {}, create: { id: 'campus-daystar', name: 'Daystar University', city: 'Nairobi', latitude: -1.3200, longitude: 36.7800 } }),
    prisma.campus.upsert({ where: { id: 'campus-mmu' }, update: {}, create: { id: 'campus-mmu', name: 'Multimedia University of Kenya', city: 'Nairobi', latitude: -1.3050, longitude: 36.7700 } }),
    prisma.campus.upsert({ where: { id: 'campus-kisii' }, update: {}, create: { id: 'campus-kisii', name: 'Kisii University', city: 'Kisii', latitude: -0.6817, longitude: 34.7667 } }),
    prisma.campus.upsert({ where: { id: 'campus-maseno' }, update: {}, create: { id: 'campus-maseno', name: 'Maseno University', city: 'Maseno', latitude: -0.0050, longitude: 34.5980 } }),
  ])

  // ── Owners ────────────────────────────────────────────────────────────────
  const hash = await bcrypt.hash('password123', 10)
  const [o1, o2, o3, o4, o5] = await Promise.all([
    prisma.user.upsert({ where: { email: 'owner1@safestay.co.ke' }, update: {}, create: { id: 'owner-1', name: 'James Kariuki', email: 'owner1@safestay.co.ke', passwordHash: hash, role: 'OWNER', phone: '+254711000001' } }),
    prisma.user.upsert({ where: { email: 'owner2@safestay.co.ke' }, update: {}, create: { id: 'owner-2', name: 'Grace Njeri', email: 'owner2@safestay.co.ke', passwordHash: hash, role: 'OWNER', phone: '+254711000002' } }),
    prisma.user.upsert({ where: { email: 'owner3@safestay.co.ke' }, update: {}, create: { id: 'owner-3', name: 'Peter Omondi', email: 'owner3@safestay.co.ke', passwordHash: hash, role: 'OWNER', phone: '+254711000003' } }),
    prisma.user.upsert({ where: { email: 'owner4@safestay.co.ke' }, update: {}, create: { id: 'owner-4', name: 'Faith Wambui', email: 'owner4@safestay.co.ke', passwordHash: hash, role: 'OWNER', phone: '+254711000004' } }),
    prisma.user.upsert({ where: { email: 'owner5@safestay.co.ke' }, update: {}, create: { id: 'owner-5', name: 'David Mutua', email: 'owner5@safestay.co.ke', passwordHash: hash, role: 'OWNER', phone: '+254711000005' } }),
  ])

  // ── Hostels ───────────────────────────────────────────────────────────────
  const hostels = [
    // UoN
    {
      id: 'hostel-1', ownerId: o1.id, campusId: 'campus-uon',
      name: 'SafeStay Ngong Road', address: 'Ngong Road, Nairobi',
      description: 'Modern hostel 5 minutes from UoN main gate. 24/7 security, fast Wi-Fi, rooftop study lounge.',
      latitude: -1.2820, longitude: 36.8200, gender: 'MIXED' as const,
      amenities: ['Wi-Fi', 'Security', 'Water', 'Study room', 'Laundry'],
      verified: true, status: 'LIVE' as const, minutesToCampus: 5,
      images: [{ url: '/room-1.jpg', isCover: true }, { url: '/room-2.jpg', isCover: false }],
      rooms: [
        { type: 'SINGLE' as const, pricePerMonth: 6500, pricePerTerm: 19500, capacity: 1, availableUnits: 4 },
        { type: 'SHARED' as const, pricePerMonth: 3500, pricePerTerm: 10500, capacity: 2, availableUnits: 6 },
        { type: 'EN_SUITE' as const, pricePerMonth: 9500, pricePerTerm: 28500, capacity: 1, availableUnits: 2 },
      ],
    },
    {
      id: 'hostel-2', ownerId: o2.id, campusId: 'campus-uon',
      name: 'SafeStay Milimani', address: 'Milimani Road, Nairobi',
      description: 'Female-only hostel with a garden courtyard, 8 minutes from UoN. CCTV, backup generator, clean shared kitchens.',
      latitude: -1.2900, longitude: 36.8150, gender: 'FEMALE' as const,
      amenities: ['Wi-Fi', 'CCTV', 'Generator', 'Kitchen', 'Water'],
      verified: true, status: 'LIVE' as const, minutesToCampus: 8,
      images: [{ url: '/room-3.jpg', isCover: true }, { url: '/room-single.jpg', isCover: false }],
      rooms: [
        { type: 'SINGLE' as const, pricePerMonth: 5500, pricePerTerm: 16500, capacity: 1, availableUnits: 5 },
        { type: 'BEDSITTER' as const, pricePerMonth: 11000, pricePerTerm: 33000, capacity: 1, availableUnits: 1 },
      ],
    },
    {
      id: 'hostel-7', ownerId: o4.id, campusId: 'campus-uon',
      name: 'SafeStay Upper Hill', address: 'Upper Hill, Nairobi',
      description: 'Self-contained bedsitters and single rooms in Upper Hill, 7 minutes from UoN. Quiet neighbourhood, fibre internet.',
      latitude: -1.2850, longitude: 36.8100, gender: 'MIXED' as const,
      amenities: ['Fibre Wi-Fi', 'Parking', 'Water', 'Security', 'CCTV'],
      verified: true, status: 'LIVE' as const, minutesToCampus: 7,
      images: [{ url: '/room-ensuite.jpg', isCover: true }, { url: '/room-bedsitter.jpg', isCover: false }],
      rooms: [
        { type: 'BEDSITTER' as const, pricePerMonth: 12000, pricePerTerm: 36000, capacity: 1, availableUnits: 3 },
        { type: 'SINGLE' as const, pricePerMonth: 7000, pricePerTerm: 21000, capacity: 1, availableUnits: 5 },
      ],
    },
    // KU
    {
      id: 'hostel-3', ownerId: o1.id, campusId: 'campus-ku',
      name: 'SafeStay Kahawa', address: 'Kahawa West, Nairobi',
      description: 'Premium male hostel 3 minutes from KU main gate. En-suite rooms, gym access, rooftop terrace.',
      latitude: -1.1850, longitude: 36.9300, gender: 'MALE' as const,
      amenities: ['Wi-Fi', 'Gym', 'Security', 'Parking', 'Water', 'Study room'],
      verified: true, status: 'LIVE' as const, minutesToCampus: 3,
      images: [{ url: '/room-shared.jpg', isCover: true }, { url: '/room-1.jpg', isCover: false }],
      rooms: [
        { type: 'EN_SUITE' as const, pricePerMonth: 12000, pricePerTerm: 36000, capacity: 1, availableUnits: 3 },
        { type: 'SINGLE' as const, pricePerMonth: 7500, pricePerTerm: 22500, capacity: 1, availableUnits: 4 },
        { type: 'SHARED' as const, pricePerMonth: 4000, pricePerTerm: 12000, capacity: 2, availableUnits: 8 },
      ],
    },
    {
      id: 'hostel-4', ownerId: o3.id, campusId: 'campus-ku',
      name: 'SafeStay Kasarani', address: 'Kasarani, Nairobi',
      description: 'Affordable mixed hostel near KU. Clean rooms, reliable water supply, communal lounge. Great for first-years.',
      latitude: -1.2000, longitude: 36.9000, gender: 'MIXED' as const,
      amenities: ['Wi-Fi', 'Water', 'Security', 'Laundry'],
      verified: false, status: 'LIVE' as const, minutesToCampus: 12,
      images: [{ url: '/room-2.jpg', isCover: true }],
      rooms: [
        { type: 'SHARED' as const, pricePerMonth: 2800, pricePerTerm: 8400, capacity: 3, availableUnits: 10 },
        { type: 'SINGLE' as const, pricePerMonth: 4500, pricePerTerm: 13500, capacity: 1, availableUnits: 3 },
      ],
    },
    {
      id: 'hostel-8', ownerId: o5.id, campusId: 'campus-ku',
      name: 'SafeStay Roysambu', address: 'Roysambu, Nairobi',
      description: 'Female-only hostel in Roysambu, 10 minutes from KU. Homely atmosphere, shared kitchen, reliable water.',
      latitude: -1.2100, longitude: 36.8900, gender: 'FEMALE' as const,
      amenities: ['Wi-Fi', 'Kitchen', 'Water', 'Security', 'Laundry'],
      verified: true, status: 'LIVE' as const, minutesToCampus: 10,
      images: [{ url: '/room-3.jpg', isCover: true }, { url: '/room-single.jpg', isCover: false }],
      rooms: [
        { type: 'SINGLE' as const, pricePerMonth: 5000, pricePerTerm: 15000, capacity: 1, availableUnits: 7 },
        { type: 'SHARED' as const, pricePerMonth: 3000, pricePerTerm: 9000, capacity: 2, availableUnits: 6 },
      ],
    },
    // Strathmore
    {
      id: 'hostel-5', ownerId: o2.id, campusId: 'campus-strathmore',
      name: 'SafeStay Madaraka', address: 'Madaraka Estate, Nairobi',
      description: 'Upmarket bedsitters and en-suites for Strathmore students. 6 minutes walk to campus. Fibre internet, backup power.',
      latitude: -1.3050, longitude: 36.8100, gender: 'MIXED' as const,
      amenities: ['Fibre Wi-Fi', 'Generator', 'CCTV', 'Concierge', 'Water', 'Parking'],
      verified: true, status: 'LIVE' as const, minutesToCampus: 6,
      images: [{ url: '/room-ensuite.jpg', isCover: true }, { url: '/room-bedsitter.jpg', isCover: false }],
      rooms: [
        { type: 'BEDSITTER' as const, pricePerMonth: 14000, pricePerTerm: 42000, capacity: 1, availableUnits: 2 },
        { type: 'EN_SUITE' as const, pricePerMonth: 11000, pricePerTerm: 33000, capacity: 1, availableUnits: 3 },
      ],
    },
    {
      id: 'hostel-6', ownerId: o3.id, campusId: 'campus-strathmore',
      name: 'SafeStay South C', address: 'South C, Nairobi',
      description: 'Budget-friendly female hostel near Strathmore. Clean, safe, well-managed. Shared kitchen and laundry.',
      latitude: -1.3200, longitude: 36.8200, gender: 'FEMALE' as const,
      amenities: ['Wi-Fi', 'Kitchen', 'Laundry', 'Security', 'Water'],
      verified: true, status: 'LIVE' as const, minutesToCampus: 10,
      images: [{ url: '/room-1.jpg', isCover: true }],
      rooms: [
        { type: 'SINGLE' as const, pricePerMonth: 5000, pricePerTerm: 15000, capacity: 1, availableUnits: 6 },
        { type: 'SHARED' as const, pricePerMonth: 3000, pricePerTerm: 9000, capacity: 2, availableUnits: 8 },
      ],
    },
    {
      id: 'hostel-9', ownerId: o4.id, campusId: 'campus-strathmore',
      name: 'SafeStay Lang\'ata', address: 'Lang\'ata Road, Nairobi',
      description: 'Mixed hostel 9 minutes from Strathmore. Spacious rooms, study area, rooftop terrace.',
      latitude: -1.3150, longitude: 36.8050, gender: 'MIXED' as const,
      amenities: ['Wi-Fi', 'Study room', 'Water', 'Security', 'Rooftop'],
      verified: true, status: 'LIVE' as const, minutesToCampus: 9,
      images: [{ url: '/room-2.jpg', isCover: true }, { url: '/room-shared.jpg', isCover: false }],
      rooms: [
        { type: 'SINGLE' as const, pricePerMonth: 6000, pricePerTerm: 18000, capacity: 1, availableUnits: 5 },
        { type: 'EN_SUITE' as const, pricePerMonth: 10000, pricePerTerm: 30000, capacity: 1, availableUnits: 2 },
        { type: 'SHARED' as const, pricePerMonth: 3500, pricePerTerm: 10500, capacity: 2, availableUnits: 4 },
      ],
    },
    // MKU
    {
      id: 'hostel-10', ownerId: o5.id, campusId: 'campus-mku',
      name: 'SafeStay Thika', address: 'Thika Town, Thika',
      description: 'Affordable and well-located hostel 4 minutes from MKU Thika campus. Clean rooms, borehole water, 24/7 security.',
      latitude: -1.0380, longitude: 37.0720, gender: 'MIXED' as const,
      amenities: ['Wi-Fi', 'Borehole water', 'Security', 'Laundry'],
      verified: true, status: 'LIVE' as const, minutesToCampus: 4,
      images: [{ url: '/room-3.jpg', isCover: true }, { url: '/room-1.jpg', isCover: false }],
      rooms: [
        { type: 'SINGLE' as const, pricePerMonth: 4000, pricePerTerm: 12000, capacity: 1, availableUnits: 8 },
        { type: 'SHARED' as const, pricePerMonth: 2500, pricePerTerm: 7500, capacity: 2, availableUnits: 10 },
      ],
    },
    {
      id: 'hostel-11', ownerId: o1.id, campusId: 'campus-mku',
      name: 'SafeStay Makongeni', address: 'Makongeni, Thika',
      description: 'Modern en-suite and bedsitter units near MKU. Ideal for postgraduate students. Quiet, secure, fibre internet.',
      latitude: -1.0400, longitude: 37.0650, gender: 'MIXED' as const,
      amenities: ['Fibre Wi-Fi', 'Security', 'CCTV', 'Water', 'Parking'],
      verified: true, status: 'LIVE' as const, minutesToCampus: 6,
      images: [{ url: '/room-ensuite.jpg', isCover: true }, { url: '/room-bedsitter.jpg', isCover: false }],
      rooms: [
        { type: 'EN_SUITE' as const, pricePerMonth: 8500, pricePerTerm: 25500, capacity: 1, availableUnits: 4 },
        { type: 'BEDSITTER' as const, pricePerMonth: 10000, pricePerTerm: 30000, capacity: 1, availableUnits: 2 },
      ],
    },
    // USIU
    {
      id: 'hostel-13', ownerId: o2.id, campusId: 'campus-usiu',
      name: 'SafeStay Kasarani North', address: 'Kasarani North, Nairobi',
      description: 'Modern mixed hostel 5 minutes from USIU-Africa. Fibre internet, CCTV, backup generator, clean common areas.',
      latitude: -1.2180, longitude: 36.8920, gender: 'MIXED' as const,
      amenities: ['Fibre Wi-Fi', 'CCTV', 'Generator', 'Water', 'Security'],
      verified: true, status: 'LIVE' as const, minutesToCampus: 5,
      images: [{ url: '/room-2.jpg', isCover: true }, { url: '/room-single.jpg', isCover: false }],
      rooms: [
        { type: 'SINGLE' as const, pricePerMonth: 7000, pricePerTerm: 21000, capacity: 1, availableUnits: 5 },
        { type: 'EN_SUITE' as const, pricePerMonth: 11000, pricePerTerm: 33000, capacity: 1, availableUnits: 3 },
      ],
    },
    // Daystar
    {
      id: 'hostel-14', ownerId: o3.id, campusId: 'campus-daystar',
      name: 'SafeStay Athi River', address: 'Athi River, Nairobi',
      description: 'Affordable hostel near Daystar University Athi River campus. Clean, secure, with reliable water and Wi-Fi.',
      latitude: -1.3220, longitude: 36.7820, gender: 'MIXED' as const,
      amenities: ['Wi-Fi', 'Water', 'Security', 'Laundry', 'Kitchen'],
      verified: true, status: 'LIVE' as const, minutesToCampus: 7,
      images: [{ url: '/room-3.jpg', isCover: true }, { url: '/room-shared.jpg', isCover: false }],
      rooms: [
        { type: 'SINGLE' as const, pricePerMonth: 5500, pricePerTerm: 16500, capacity: 1, availableUnits: 6 },
        { type: 'SHARED' as const, pricePerMonth: 3200, pricePerTerm: 9600, capacity: 2, availableUnits: 8 },
      ],
    },
    // Kisii
    {
      id: 'hostel-15', ownerId: o4.id, campusId: 'campus-kisii',
      name: 'SafeStay Kisii Town', address: 'Kisii Town, Kisii',
      description: 'Well-managed hostel 6 minutes from Kisii University main campus. Borehole water, solar backup, study room.',
      latitude: -0.6830, longitude: 34.7680, gender: 'MIXED' as const,
      amenities: ['Wi-Fi', 'Solar power', 'Borehole water', 'Study room', 'Security'],
      verified: true, status: 'LIVE' as const, minutesToCampus: 6,
      images: [{ url: '/room-1.jpg', isCover: true }, { url: '/room-2.jpg', isCover: false }],
      rooms: [
        { type: 'SINGLE' as const, pricePerMonth: 3500, pricePerTerm: 10500, capacity: 1, availableUnits: 8 },
        { type: 'SHARED' as const, pricePerMonth: 2000, pricePerTerm: 6000, capacity: 2, availableUnits: 12 },
      ],
    },
    {
      id: 'hostel-16', ownerId: o5.id, campusId: 'campus-kisii',
      name: 'SafeStay Nyanchwa', address: 'Nyanchwa, Kisii',
      description: 'Female-only hostel near Kisii University. Safe, clean, managed by a resident caretaker. Shared kitchen.',
      latitude: -0.6800, longitude: 34.7650, gender: 'FEMALE' as const,
      amenities: ['Wi-Fi', 'Kitchen', 'Security', 'Water', 'Laundry'],
      verified: false, status: 'LIVE' as const, minutesToCampus: 9,
      images: [{ url: '/room-3.jpg', isCover: true }],
      rooms: [
        { type: 'SINGLE' as const, pricePerMonth: 3000, pricePerTerm: 9000, capacity: 1, availableUnits: 10 },
        { type: 'SHARED' as const, pricePerMonth: 1800, pricePerTerm: 5400, capacity: 2, availableUnits: 14 },
      ],
    },
    // Maseno
    {
      id: 'hostel-17', ownerId: o1.id, campusId: 'campus-maseno',
      name: 'SafeStay Maseno', address: 'Maseno Town, Maseno',
      description: 'Mixed hostel 4 minutes from Maseno University gate. Reliable water, Wi-Fi, 24/7 security guard.',
      latitude: -0.0060, longitude: 34.5990, gender: 'MIXED' as const,
      amenities: ['Wi-Fi', 'Water', 'Security', 'Laundry'],
      verified: true, status: 'LIVE' as const, minutesToCampus: 4,
      images: [{ url: '/room-2.jpg', isCover: true }, { url: '/room-1.jpg', isCover: false }],
      rooms: [
        { type: 'SINGLE' as const, pricePerMonth: 3000, pricePerTerm: 9000, capacity: 1, availableUnits: 10 },
        { type: 'SHARED' as const, pricePerMonth: 1800, pricePerTerm: 5400, capacity: 2, availableUnits: 15 },
      ],
    },
    {
      id: 'hostel-18', ownerId: o2.id, campusId: 'campus-maseno',
      name: 'SafeStay Luanda', address: 'Luanda, Maseno',
      description: 'Female-only hostel near Maseno University. Quiet, secure, with a shared kitchen and study area.',
      latitude: -0.0080, longitude: 34.5960, gender: 'FEMALE' as const,
      amenities: ['Wi-Fi', 'Kitchen', 'Study room', 'Security', 'Water'],
      verified: true, status: 'LIVE' as const, minutesToCampus: 8,
      images: [{ url: '/room-single.jpg', isCover: true }, { url: '/room-3.jpg', isCover: false }],
      rooms: [
        { type: 'SINGLE' as const, pricePerMonth: 2800, pricePerTerm: 8400, capacity: 1, availableUnits: 8 },
        { type: 'SHARED' as const, pricePerMonth: 1600, pricePerTerm: 4800, capacity: 2, availableUnits: 12 },
      ],
    },
  ]

  for (const h of hostels) {
    const { images, rooms, minutesToCampus, ...data } = h
    await prisma.hostel.upsert({
      where: { id: h.id },
      update: { name: h.name, description: h.description },
      create: { ...data, images: { create: images }, rooms: { create: rooms } },
    })
  }

  // ── Student + review ──────────────────────────────────────────────────────
  const student = await prisma.user.upsert({
    where: { email: 'student@safestay.co.ke' },
    update: {},
    create: { id: 'student-1', name: 'Amina Wanjiku', email: 'student@safestay.co.ke', passwordHash: hash, role: 'STUDENT' },
  })

  const room = await prisma.room.findFirst({ where: { hostelId: 'hostel-1' } })
  if (room) {
    const booking = await prisma.booking.upsert({
      where: { id: 'booking-seed-1' },
      update: {},
      create: { id: 'booking-seed-1', studentId: student.id, roomId: room.id, moveInDate: new Date('2025-01-15'), status: 'COMPLETED', amountDue: room.pricePerMonth, amountPaid: room.pricePerMonth },
    })
    await prisma.review.upsert({
      where: { bookingId: booking.id },
      update: {},
      create: { hostelId: 'hostel-1', studentId: student.id, bookingId: booking.id, rating: 5, comment: 'Clean, secure, and the Wi-Fi is fast. The study lounge was a lifesaver during exams.' },
    })
  }

  console.log('✅ Seed complete — 9 campuses, 18 hostels, 5 owners')
}

main().catch(console.error).finally(() => prisma.$disconnect())
