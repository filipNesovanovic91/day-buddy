import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VirtualCoffeeBreakComponent } from './components/virtual-coffee-break/virtual-coffee-break.component';

const routes: Routes = [
  {
    path: '',
    component: VirtualCoffeeBreakComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VirtualCoffeeBreakRoutingModule { }