import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../app.component';
import { BookFlightComponent } from '../book-flight/book-flight.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { CreateFlightComponent } from './create-flight/create-flight.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminHomeComponent,
    children: [
      {
        path: '',
        component: AdminHomeComponent,
      },
      {
        path: 'book',
        component: BookFlightComponent,
      },
      {
        path: 'create',
        component: CreateFlightComponent,
      },
      {
        path: 'logout',
        component: AppComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
