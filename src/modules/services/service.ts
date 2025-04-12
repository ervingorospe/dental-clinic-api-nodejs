import { Categories, Services } from "@modules/services/repository"
import ServicesDTO from "@modules/services/dto/services";
import CategoryDTO from '@modules/services/dto/category'

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

  static getCategories = async (limit? : string | null) => {
    const categories = await Categories.findMany({
      take: limit ? parseInt(limit, 10) : undefined,
      orderBy: {
        name: 'asc',
      },
    })

    return categories?.map((category) => new CategoryDTO(category));
  }
}