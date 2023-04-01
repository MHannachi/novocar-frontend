import {Component, OnInit} from '@angular/core';
import {Category} from "../../models/category";
import {MessageService} from "primeng/api";
import {Brand} from "../../models/brand";
import {BrandService} from "../../services/brand.service";

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  brands: Brand[] = [];
  newBrand : Brand = new Brand();
  globalFilter: string = '';
  editingRow: boolean = false;
  addingRow: boolean = false;
  removeRow: boolean = false;
  editingRowIndex: number = -1;

  constructor(private brandService: BrandService, private messageService: MessageService) { }
  ngOnInit(): void {
    this.loadData();
  }
  loadData(): void{
    this.brandService.getAllBrands().subscribe(data => {
      this.brands = data;
    });
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

  finishEditingRow(brand : Brand) {
    this.brandService.updateBrand(brand, brand.id).subscribe(data => {
        this.messageService.add({severity:'success', summary:'Update!', detail:`Brand has been successfully updated`});
      },
      error => {
        this.messageService.add({severity:'error', summary:'Error', detail:`Something went wrong!`});

      });
    this.resetButtons();
  }
  finishAddingRow(brand : Brand) {
    this.brandService.saveBrand(brand).subscribe(data => {
        this.messageService.add({severity:'success', summary:'Update!', detail:`Brand has been successfully saved`});
        this.newBrand = new Brand();
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
    this.brandService.removeBrand(id).subscribe({
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
