import {Component, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {Category} from "../../models/category";
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{
  categories: Category[] = [];
  newCategory : Category = new Category();
  globalFilter: string = '';
  editingRow: boolean = false;
  addingRow: boolean = false;
  removeRow: boolean = false;
  editingRowIndex: number = -1;

  constructor(private categoryService: CategoryService, private messageService: MessageService) { }
  ngOnInit(): void {
    this.loadData();
  }
  loadData(): void{
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
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

  finishEditingRow(category : Category) {
    this.categoryService.updateCategory(category, category.id).subscribe(customer => {
        this.messageService.add({severity:'success', summary:'Update!', detail:`Category has been successfully updated`});
      },
      error => {
        this.messageService.add({severity:'error', summary:'Error', detail:`Something went wrong!`});

      });
    this.resetButtons();
  }
  finishAddingRow(category : Category) {
    this.categoryService.saveCategory(category).subscribe(data => {
        this.messageService.add({severity:'success', summary:'Update!', detail:`Category has been successfully saved`});
        this.newCategory = new Category();
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
    this.categoryService.removeCategory(id).subscribe({
      next: () => {
        this.messageService.add({severity:'success', summary:'Update!', detail:`Category has been successfully removed`});
        this.loadData()
      },
      error: () => {
        this.messageService.add({severity:'error', summary:'Error', detail:`Something went wrong!`});
      }
    })
    this.resetButtons();
  }
}
