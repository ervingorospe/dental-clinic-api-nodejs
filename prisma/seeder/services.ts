import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const categories = [
    {
      name: 'Consultation',
      services: [
        { name: 'Dental Consultation', price: 100 }
      ]
    },
    {
      name: 'Preventive Care',
      services: [
        { name: 'Dental Cleaning', price: 50 },
        { name: 'Oral Exam & Check-up', price: 40 },
        { name: 'Fluoride Treatment', price: 30 },
        { name: 'Dental Sealants', price: 60 },
        { name: 'X-rays', price: 80 }
      ]
    },
    {
      name: 'Restorative Dentistry',
      services: [
        { name: 'Fillings (Composite/Amalgam)', price: 150 },
        { name: 'Root Canal Treatment', price: 600 },
        { name: 'Dental Crowns', price: 900 },
        { name: 'Dental Bridges', price: 1200 },
        { name: 'Dentures (Partial/Full)', price: 1800 }
      ]
    },
    {
      name: 'Cosmetic Dentistry',
      services: [
        { name: 'Teeth Whitening', price: 250 },
        { name: 'Dental Veneers', price: 800 },
        { name: 'Bonding', price: 300 }
      ]
    },
    {
      name: 'Surgical Procedures',
      services: [
        { name: 'Tooth Extraction (Simple/Surgical)', price: 200 },
        { name: 'Wisdom Tooth Removal', price: 400 },
        { name: 'Dental Implants', price: 3000 }
      ]
    },
    {
      name: 'Orthodontics',
      services: [
        { name: 'Braces (Metal/Ceramic/Invisalign)', price: 5000 },
        { name: 'Retainers', price: 300 }
      ]
    }
  ];

  for (const categoryData of categories) {
    const { name, services } = categoryData;
    
    const category = await prisma.serviceCategory.upsert({
      where: { name },
      update: {},
      create: { name, description: `${name} services` }
    });

    for (const service of services) {
      await prisma.services.upsert({
        where: { name: service.name },
        update: {},
        create: {
          name: service.name,
          description: `${service.name} service`,
          price: service.price,
          categoryId: category.id
        }
      });
    }
  }

  console.log('Seeding completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
