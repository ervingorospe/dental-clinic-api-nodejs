export default class ServicesDTO {
  id: number;
  name: string;
  description: string;
  price: string;
  category: {
    name: string;
    description: string;
  }

  constructor(service: any) {
    this.id = service.id;
    this.name = service.name;
    this.description = service.description;
    this.price = service.price;
    this.category = {
      name: service.category.name,
      description: service.category.description
    }
  }
}
