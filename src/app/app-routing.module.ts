import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './modules/shared/components/not-found.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'work-support',
    loadChildren: () =>
      import('./modules/work-support/work-support.module').then(
        (m) => m.WorkSupportModule
      ),
    canActivate: [AuthGuard]
  },
  {
    path: 'emotional-support',
    loadChildren: () =>
      import('./modules/emotional-support/emotional-support.module').then(
        (m) => m.EmotionalSupportModule
      ),
    canActivate: [AuthGuard]
  },
  {
    path: 'virtual-coffee-break',
    loadChildren: () =>
      import('./modules/virtual-coffee-break/virtual-coffee-break.module').then(
        (m) => m.VirtualCoffeeBreakModule
      ),
    canActivate: [AuthGuard]
  },
  {
    path: 'sport-activity-organizer',
    loadChildren: () =>
      import(
        './modules/sport-activity-organizer/sport-activity-organizer.module'
      ).then((m) => m.SportActivityOrganizerModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/'  
  },
  {
    path: 'not-found', // Define a path for the not-found component (optional)
    component: NotFoundComponent, // Component to be displayed for not-found
  },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
