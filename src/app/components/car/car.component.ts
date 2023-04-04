import {Component, OnInit} from '@angular/core';
import {Brand} from "../../models/brand";
import {MessageService} from "primeng/api";
import {Car} from "../../models/car";
import {CarService} from "../../services/car.service";
import {BrandService} from "../../services/brand.service";
import {Category} from "../../models/category";
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit{
  brands: Brand[] = [];
  cars: any[] = [];
  newCar : Car = new Car();
  globalFilter: string = '';
  editingRow: boolean = false;
  addingRow: boolean = false;
  removeRow: boolean = false;
  editingRowIndex: number = -1;
  categories: Category[] = [];
  constructor(private carService: CarService, private categoryService : CategoryService, private brandService: BrandService, private messageService: MessageService) { }
  ngOnInit(): void {
    this.loadData();
  }
  loadData(): void{
    this.carService.getAllCars().subscribe(data => {
      this.cars = data;
    });
    this.brandService.getAllBrands().subscribe(data => {
      this.brands = data;
    })
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    })
  }

  startRemovingRow(rowIndex: number ){
    this.removeRow = true;
    this.editingRowIndex = rowIndex;
  }

  startEditingRow(rowIndex: number) {
    this.editingRowIndex = rowIndex;
    this.editingRow = true;
  }
  startAddingRow() {
    this.addingRow= true;
  }

  finishEditingRow(car : Car) {
    this.carService.updateCar(car, car.id).subscribe(data => {
        this.messageService.add({severity:'success', summary:'Update!', detail:`Brand has been successfully updated`});
      },
      error => {
        this.messageService.add({severity:'error', summary:'Error', detail:`Something went wrong!`});

      });
    this.resetButtons();
  }
  finishAddingRow(car : any) {
    this.carService.saveCar(car).subscribe(data => {
        this.messageService.add({severity:'success', summary:'Update!', detail:`Brand has been successfully saved`});
        this.newCar = new Car();
        this.loadData();
      },
      error => {
        this.messageService.add({severity:'error', summary:'Error', detail:`Something went wrong!`});

      });
    this.resetButtons();
  }

  resetButtons() {
    this.editingRowIndex = -1;
    this.editingRow = false;
    this.removeRow = false;
    this.addingRow = false;
  }

  deleteRow(id: string) {
    this.carService.removeCar(id).subscribe({
      next: () => {
        this.messageService.add({severity:'success', summary:'Update!', detail:`Brand has been successfully removed`});
        this.loadData()
      },
      error: () => {
        this.messageService.add({severity:'error', summary:'Error', detail:`Something went wrong!`});
      }
    });
    this.resetButtons();
  }
}
