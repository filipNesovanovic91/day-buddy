import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmotionalSupportComponent } from './components/emotional-support/emotional-support.component';

const routes: Routes = [
  {
    path: '',
    component: EmotionalSupportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmotionalSupportRoutingModule { }