import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ProductListComponent } from './components/shopping-cart/product-list/product-list.component';
import { ProductItemComponent } from './components/shopping-cart/product-list/product-item/product-item.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddProductComponent } from './components/shopping-cart/add-product/add-product/add-product.component';
import { OrderComponent } from './components/shopping-cart/order/order.component';
import {MatDialogModule} from '@angular/material/dialog';
import { OrderHistoryComponent } from './components/shopping-cart/order-history/order-history.component';
import { MatTableModule } from '@angular/material/table';
import { PropertiesComponent } from './components/shopping-cart/properties/properties.component';
import { OrderPropertiesComponent } from './components/shopping-cart/order-properties/order-properties.component';
import {MatButtonModule} from '@angular/material/button';
import { ChangeOrderStatusComponent } from './components/shopping-cart//change-order-status/change-order-status.component';
import { MatSelectModule } from '@angular/material/select';
import { HelpComponent } from './components/help/help.component';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { NavComponent } from './components/shared/nav/nav.component';
import { ManageCategoryComponent } from './components/management/category/manage-category/manage-category.component';
import { CategoryCatalogComponent } from './components/management/category/category-catalog/category-catalog.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ShoppingCartComponent,
    ProductListComponent,
    ProductItemComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    AddProductComponent,
    OrderComponent,
    OrderHistoryComponent,
    PropertiesComponent,
    OrderPropertiesComponent,
    ChangeOrderStatusComponent,
    HelpComponent,
    NavComponent,
    ManageCategoryComponent,
    CategoryCatalogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatDividerModule,
    MatCheckboxModule
  ],
   providers: [
    {
      provide: JWT_OPTIONS,
      useValue: JWT_OPTIONS
    },
    JwtHelperService,
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    },
   ],
   bootstrap: [AppComponent]
})
export class AppModule { }
