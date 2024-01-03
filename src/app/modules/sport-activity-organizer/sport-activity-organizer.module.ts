import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SportActivityOrganizerComponent } from './components/sport-activity-organizer/sport-activity-organizer.component';
import { SportActivityOrganizerRoutingModule } from './sport-activity-organizer-routing.module';



@NgModule({
  declarations: [
    SportActivityOrganizerComponent
  ],
  imports: [
    CommonModule,
    SportActivityOrganizerRoutingModule
  ]
})
export class SportActivityOrganizerModule { }
