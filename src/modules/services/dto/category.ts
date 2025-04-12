export default class CategoryDTO {
  id: number;
  name: string;
  description: string;

  constructor(category: any) {
    this.id = category.id;
    this.name = category.name;
    this.description = category.description;
  }
}
