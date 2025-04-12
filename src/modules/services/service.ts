import { Services } from "@modules/services/repository"
import ServicesDTO from "@modules/services/dto/services";

export class DentalService {
  static getServices = async (limit? : string | null) => {
    const services = await Services.findMany({
      take: limit ? parseInt(limit, 10) : undefined,
      include:{
        category: true
      },
      orderBy: {
        category: {
          name: 'asc',
        },
      },
    })

    return services?.map((service) => new ServicesDTO(service));
  }
}