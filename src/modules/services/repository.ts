import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const Services = prisma.services;
export const Categories = prisma.serviceCategory;