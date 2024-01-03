import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmotionalSupportComponent } from './components/emotional-support/emotional-support.component';
import { EmotionalSupportRoutingModule } from './emotional-support-routing.module';



@NgModule({
  declarations: [
    EmotionalSupportComponent
  ],
  imports: [
    CommonModule,
    EmotionalSupportRoutingModule
  ]
})
export class EmotionalSupportModule { }
