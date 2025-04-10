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
  startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:MM)"),
  endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:MM)"),
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

