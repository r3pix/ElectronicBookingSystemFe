import { ForbiddenComponent } from './components/shared/forbidden/forbidden.component';
import { AuthGuard } from './guards/auth.guard';
import { BookingCatalogComponent } from './components/management/booking/booking-catalog/booking-catalog.component';
import { BookRoomComponent } from './components/shopping-cart/book-room/book-room.component';
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
import { InvoiceDataComponent } from './components/invoice-data/invoice-data.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: ShoppingCartComponent },
  { path: 'management/categories/catalog',
    component: CategoryCatalogComponent,
    canActivate: [AuthGuard],
    data:{
      roles: ['Admin']
     }
  },
  { path: 'management/rooms/catalog',
    component: RoomCatalogComponent,
    canActivate: [AuthGuard],
    data:{
      roles: ['Admin']
     }
  },
  { path: 'management/decorations/catalog',
    component: DecorationCatalogComponent,
    canActivate: [AuthGuard],
    data:{
      roles: ['Admin']
     }
  },
  { path: 'management/equipment/catalog',
    component: EquipmentCatalogComponent,
    canActivate: [AuthGuard],
    data:{
      roles: ['Admin']
     }
  },
  { path: 'management/services/catalog',
    component: ServiceCatalogComponent,
    canActivate: [AuthGuard],
    data:{
      roles: ['Admin']
     }
  },
  { path: 'management/users/catalog',
    component: UserCatalogComponent,
    canActivate: [AuthGuard],
    data:{
      roles: ['Admin']
     }
  },
  { path: 'management/users/details',
    component: UserDetailsComponent,
    canActivate: [AuthGuard],
    data:{
      roles: ['Admin','User']
     }
  },
  { path: 'book',
    component: BookRoomComponent,
    canActivate: [AuthGuard],
    data:{
      roles: ['Admin', 'User']
    }
  },
  { path: 'management/booking/catalog',
    component: BookingCatalogComponent,
    canActivate: [AuthGuard],
    data:{
      roles: ['Admin','User']
     }
  },
  {
    path: 'management/booking/invoice',
    component: InvoiceDataComponent,
    canActivate: [AuthGuard],
    data:{
      roles: ['Admin', 'User']
    }
  },
  //{ path: 'management/categories/manage', component: ManageCategoryComponent},
  { path: 'help', component: HelpComponent },
  { path: 'forbidden', component: ForbiddenComponent },
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
