import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkSupportComponent } from './components/work-support/work-support.component';
import { WorkSupportRoutingModule } from './work-support-routing.module';



@NgModule({
  declarations: [
    WorkSupportComponent
  ],
  imports: [
    CommonModule,
    WorkSupportRoutingModule
  ]
})
export class WorkSupportModule { }
