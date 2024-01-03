import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VirtualCoffeeBreakComponent } from './components/virtual-coffee-break/virtual-coffee-break.component';
import { VirtualCoffeeBreakRoutingModule } from './virtual-coffee-break-routing.module';



@NgModule({
  declarations: [
    VirtualCoffeeBreakComponent
  ],
  imports: [
    CommonModule,
    VirtualCoffeeBreakRoutingModule
  ]
})
export class VirtualCoffeeBreakModule { }
