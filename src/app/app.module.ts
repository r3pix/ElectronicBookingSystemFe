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
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import { SpacerComponent } from './components/shared/spacer/spacer.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { RoomCatalogComponent } from './components/management/room/room-catalog/room-catalog.component';
import { ManageRoomComponent } from './components/management/room/manage-room/manage-room.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { DecorationCatalogComponent } from './components/management/decoration/decoration-catalog/decoration-catalog.component';
import { ManageDecorationComponent } from './components/management/decoration/manage-decoration/manage-decoration.component';
import { ManageEquipmentComponent } from './components/management/equipment/manage-equipment/manage-equipment.component';
import { EquipmentCatalogComponent } from './components/management/equipment/equipment-catalog/equipment-catalog.component';
import { ManageServiceComponent } from './components/management/service/manage-service/manage-service.component';
import { ServiceCatalogComponent } from './components/management/service/service-catalog/service-catalog.component';
import {TextFieldModule} from '@angular/cdk/text-field';
import { UserCatalogComponent } from './components/management/user/user-catalog/user-catalog.component';
import { UserDetailsComponent } from './components/management/user/user-details/user-details.component';
import { ViewPictureComponent } from './components/shared/view-picture/view-picture.component';
import { BookRoomComponent } from './components/shopping-cart/book-room/book-room.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatMomentDateModule ,MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import { BookingCatalogComponent } from './components/management/booking/booking-catalog/booking-catalog.component';
import { CancelBookingComponent } from './components/management/booking/cancel-booking/cancel-booking.component';
import { ForbiddenComponent } from './components/shared/forbidden/forbidden.component';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { InvoiceDataComponent } from './components/invoice-data/invoice-data.component';
import {NgxPrintModule} from 'ngx-print';
import { OpinionComponent } from './components/shopping-cart/opinion/opinion.component';


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
    PropertiesComponent,
    OrderPropertiesComponent,
    ChangeOrderStatusComponent,
    HelpComponent,
    NavComponent,
    ManageCategoryComponent,
    CategoryCatalogComponent,
    SpacerComponent,
    RoomCatalogComponent,
    ManageRoomComponent,
    DecorationCatalogComponent,
    ManageDecorationComponent,
    ManageEquipmentComponent,
    EquipmentCatalogComponent,
    ManageServiceComponent,
    ServiceCatalogComponent,
    UserCatalogComponent,
    UserDetailsComponent,
    ViewPictureComponent,
    BookRoomComponent,
    BookingCatalogComponent,
    CancelBookingComponent,
    ForbiddenComponent,
    InvoiceDataComponent,
    OpinionComponent,
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
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatTooltipModule,
    MatAutocompleteModule,
    TextFieldModule,
    MatStepperModule,
    MatDatepickerModule,
    MatMomentDateModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }), // ToastrModule added
    NgxPrintModule
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
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {strict: true}}
   ],
   bootstrap: [AppComponent],
})
export class AppModule { }
