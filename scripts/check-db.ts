import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  const hostels = await prisma.hostel.findMany({
    include: {
      images: { where: { isCover: true }, take: 1 },
      rooms: { orderBy: { pricePerMonth: 'asc' }, take: 1 }
    },
    orderBy: { createdAt: 'desc' },
    take: 5
  })
  console.log(JSON.stringify(hostels.map(h => ({
    name: h.name,
    minutesToCampus: h.minutesToCampus,
    img: h.images[0]?.url,
    price: h.rooms[0]?.pricePerMonth
  })), null, 2))
}

main().catch(console.error).finally(() => prisma.$disconnect())
