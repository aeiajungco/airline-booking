import { CancelFlightComponent } from './admin/cancel-flight/cancel-flight.component';
import { CreateFlightComponent } from './admin/create-flight/create-flight.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';

import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatStepperModule } from '@angular/material/stepper';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';

import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import {
  AngularFirestore,
  AngularFirestoreModule,
} from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { FlightListComponent } from './flight-list/flight-list.component';
import { BookFlightComponent } from './book-flight/book-flight.component';
import { LogoutComponent } from './logout/logout.component';
import { MatchingFlightListComponent } from './matching-flight-list/matching-flight-list.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { LoginComponent } from './login/login.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { RegisterComponent } from './user/register/register.component';
import { BookingListComponent } from './user/booking-list/booking-list.component';
import { OnewayBookingListComponent } from './oneway-booking-list/oneway-booking-list.component';
import { TwowayBookingListComponent } from './twoway-booking-list/twoway-booking-list.component';
@NgModule({
  declarations: [
    AppComponent,
    CreateFlightComponent,
    FlightListComponent,
    BookFlightComponent,
    LoginComponent,
    LogoutComponent,
    MatchingFlightListComponent,
    AdminHomeComponent,
    UserHomeComponent,
    BookingFormComponent,
    BookingListComponent,
    CancelFlightComponent,
    RegisterComponent,
    OnewayBookingListComponent,
    TwowayBookingListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatCheckboxModule,
    MatStepperModule,
    MatProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ModalModule,
  ],
  providers: [AngularFirestore, DatePipe, BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
