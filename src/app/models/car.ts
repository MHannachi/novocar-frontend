import {Brand} from "./brand";
import {Category} from "./category";

export class Car {
  id? : string;
  model? : string;
  price? : number;
  brand? : Brand;
  category? : Category;
}
