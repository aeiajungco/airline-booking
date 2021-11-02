import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookFlightComponent } from '../book-flight/book-flight.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { CreateFlightComponent } from './create-flight/create-flight.component';

const routes: Routes = [

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
