import { UserDetailsComponent } from './components/management/user/user-details/user-details.component';
import { UserCatalogComponent } from './components/management/user/user-catalog/user-catalog.component';
import { ServiceCatalogComponent } from './components/management/service/service-catalog/service-catalog.component';
import { EquipmentCatalogComponent } from './components/management/equipment/equipment-catalog/equipment-catalog.component';
import { RoomCatalogComponent } from './components/management/room/room-catalog/room-catalog.component';
import { ManageCategoryComponent } from './components/management/category/manage-category/manage-category.component';
import { CategoryCatalogComponent } from './components/management/category/category-catalog/category-catalog.component';
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component'
import { LoginComponent } from './components/login/login.component'
import { RegisterComponent } from './components/register/register.component'
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component'
import { HelpComponent } from './components/help/help.component'
import { DecorationCatalogComponent } from './components/management/decoration/decoration-catalog/decoration-catalog.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: ShoppingCartComponent },
  { path: 'management/categories/catalog', component: CategoryCatalogComponent},
  { path: 'management/rooms/catalog', component: RoomCatalogComponent},
  { path: 'management/decorations/catalog', component: DecorationCatalogComponent},
  { path: 'management/equipment/catalog', component: EquipmentCatalogComponent},
  { path: 'management/services/catalog', component: ServiceCatalogComponent},
  { path: 'management/users/catalog', component: UserCatalogComponent},
  { path: 'management/users/details', component: UserDetailsComponent},
  //{ path: 'management/categories/manage', component: ManageCategoryComponent},
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
