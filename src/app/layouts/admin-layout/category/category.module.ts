import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ComponentsModule } from 'app/components/components.module';
import { MainCategoryComponent } from './main-category/main-category.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { LowerCategoryComponent } from './lower-category/lower-category.component';
import { AddCategoryComponent } from './main-category/add-category/add-category.component';
import { CategoryRoutingModule} from '../category/category-routing.module'
import { RouterModule } from '@angular/router';
import { AddSubCategoryComponent } from './sub-category/add-sub-category/add-sub-category.component';
import { AddLowerCategoryComponent } from './lower-category/add-lower-category/add-lower-category.component';
import { MatSelectModule } from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [ MainCategoryComponent, SubCategoryComponent, LowerCategoryComponent, AddCategoryComponent, AddSubCategoryComponent, AddLowerCategoryComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    RouterModule,
    CategoryRoutingModule,
    MatSnackBarModule
  ]
})
export class CategoryModule {
  constructor(){
    console.log('I am being loaded');
  }
 }
