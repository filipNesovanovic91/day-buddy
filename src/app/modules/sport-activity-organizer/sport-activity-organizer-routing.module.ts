import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SportActivityOrganizerComponent } from './components/sport-activity-organizer/sport-activity-organizer.component';

const routes: Routes = [
  {
    path: '',
    component: SportActivityOrganizerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SportActivityOrganizerRoutingModule { }