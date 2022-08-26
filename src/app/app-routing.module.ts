import { ManageCategoryComponent } from './components/management/category/manage-category/manage-category.component';
import { CategoryCatalogComponent } from './components/management/category/category-catalog/category-catalog.component';
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component'
import { LoginComponent } from './components/login/login.component'
import { RegisterComponent } from './components/register/register.component'
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component'
import { AddProductComponent } from './components/shopping-cart/add-product/add-product/add-product.component'
import { OrderHistoryComponent } from './components/shopping-cart/order-history/order-history.component'
import { HelpComponent } from './components/help/help.component'

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: ShoppingCartComponent },
  { path: 'addProduct', component: AddProductComponent },
  { path: 'orderHistory', component: OrderHistoryComponent },
  { path: 'management/categories/catalog', component: CategoryCatalogComponent},
  { path: 'management/categories/manage', component: ManageCategoryComponent},
  { path: 'help', component: HelpComponent },
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
