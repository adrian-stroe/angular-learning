import { Ingredient } from './../shared/ingredient.model';
export class Recipe { //model = blueprint for objects we create
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients!: Ingredient[]

    constructor(name: string, desc: string, imagePath: string, ingredients: Ingredient[]){
        this.name = name
        this.description = desc
        this.imagePath = imagePath
        this.ingredients = ingredients
    }
}
