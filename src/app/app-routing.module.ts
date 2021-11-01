import { CreateFlightComponent } from './admin/create-flight/create-flight.component';
import { BookFlightComponent } from './book-flight/book-flight.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
  },
  {
    path: 'book',
    component: BookFlightComponent,
  },
  {
    path: 'create',
    component: CreateFlightComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
