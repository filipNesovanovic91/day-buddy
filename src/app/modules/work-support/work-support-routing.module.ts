import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkSupportComponent } from './components/work-support/work-support.component';

const routes: Routes = [
  {
    path: '',
    component: WorkSupportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkSupportRoutingModule { }