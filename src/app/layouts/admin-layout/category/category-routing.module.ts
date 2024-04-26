import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainCategoryComponent } from './main-category/main-category.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { LowerCategoryComponent } from './lower-category/lower-category.component';

const routes: Routes = [
  

      { path: 'main-category', component: MainCategoryComponent },
      { path: 'sub-category', component: SubCategoryComponent },
      { path: 'lower-category', component: LowerCategoryComponent },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule {}
