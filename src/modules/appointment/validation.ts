import { z } from "zod";
import { AppointmentStatus } from '@prisma/client';

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
tomorrow.setHours(0, 0, 0, 0);

export const createAppointmentSchema = z.object({
  date: z
    .string()
    .transform((val) => new Date(val))
    .refine((date) => !isNaN(date.getTime()), { message: "Invalid date format" })
    .refine((date) => date >= tomorrow, { message: "Appointment date must be at least 1 day ahead." }),
  startTime: z.string(),
  endTime: z.string(),
  status:  z.nativeEnum(AppointmentStatus).default(AppointmentStatus.CONFIRMED),
  serviceId: z.number().default(1),
  patientId: z.number().int().positive(),
  doctorId: z.number().int().positive(),
})
.superRefine((data, ctx) => {
  if (data.patientId === data.doctorId) {
    ctx.addIssue({
      code: "custom",
      path: ["patientId"],
      message: "Patient and Doctor cannot be the same person.",
    });
  }
});

export const cancelAppointmentSchema = z.object({
  reason: z.string().optional(),
  userId: z.number()
})

export const completeAppointmentSchema = z.object({
  notes: z.string().optional(),
  userId: z.number()
})

