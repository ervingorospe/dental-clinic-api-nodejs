import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const Users = prisma.users;
export const UserDetails = prisma.userDetails;