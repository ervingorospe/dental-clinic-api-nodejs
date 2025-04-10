import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const doctors = [
    {
      email: 'doctor1@example.com',
      password: 'password123',
      role: 'doctor',
      userDetails: {
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '123-456-7890',
        birthDate: new Date('1980-05-15')
      }
    },
    {
      email: 'doctor2@example.com',
      password: 'password123',
      role: 'doctor',
      userDetails: {
        firstName: 'Jane',
        lastName: 'Smith',
        phoneNumber: '234-567-8901',
        birthDate: new Date('1985-10-25')
      }
    },
    {
      email: 'doctor3@example.com',
      password: 'password123',
      role: 'doctor',
      userDetails: {
        firstName: 'Alice',
        lastName: 'Brown',
        phoneNumber: '345-678-9012',
        birthDate: new Date('1990-02-10')
      }
    },
    {
      email: 'doctor4@example.com',
      password: 'password123',
      role: 'doctor',
      userDetails: {
        firstName: 'Bob',
        lastName: 'Johnson',
        phoneNumber: '456-789-0123',
        birthDate: new Date('1978-11-30')
      }
    },
    {
      email: 'doctor5@example.com',
      password: 'password123',
      role: 'doctor',
      userDetails: {
        firstName: 'Charlie',
        lastName: 'Davis',
        phoneNumber: '567-890-1234',
        birthDate: new Date('1982-08-18')
      }
    }
  ];

  const patients = [
    {
      email: 'patient1@example.com',
      password: 'password123',
      role: 'patient',
      userDetails: {
        firstName: 'Emma',
        lastName: 'Wilson',
        phoneNumber: '678-901-2345',
        birthDate: new Date('1995-03-12')
      }
    },
    {
      email: 'patient2@example.com',
      password: 'password123',
      role: 'patient',
      userDetails: {
        firstName: 'Oliver',
        lastName: 'Taylor',
        phoneNumber: '789-012-3456',
        birthDate: new Date('2000-07-24')
      }
    },
    {
      email: 'patient3@example.com',
      password: 'password123',
      role: 'patient',
      userDetails: {
        firstName: 'Liam',
        lastName: 'Anderson',
        phoneNumber: '890-123-4567',
        birthDate: new Date('1992-05-20')
      }
    },
    {
      email: 'patient4@example.com',
      password: 'password123',
      role: 'patient',
      userDetails: {
        firstName: 'Sophia',
        lastName: 'Martin',
        phoneNumber: '901-234-5678',
        birthDate: new Date('1998-01-30')
      }
    }
  ];

  // Create doctors
  for (const doctor of doctors) {
    const hashedPassword = await bcrypt.hash(doctor.password, 10);
    const createdDoctor = await prisma.users.create({
      data: {
        email: doctor.email,
        password: hashedPassword,
        role: doctor.role,
        userDetails: {
          create: doctor.userDetails
        }
      }
    });
    console.log(`Created doctor: ${createdDoctor.email}`);
  }

  // Create patients
  for (const patient of patients) {
    const hashedPassword = await bcrypt.hash(patient.password, 10);
    const createdPatient = await prisma.users.create({
      data: {
        email: patient.email,
        password: hashedPassword,
        role: patient.role,
        userDetails: {
          create: patient.userDetails
        }
      }
    });
    console.log(`Created patient: ${createdPatient.email}`);
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
