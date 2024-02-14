import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitialsPipe } from './pipes/initials.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [InitialsPipe],
  imports: [CommonModule, FormsModule],
  exports: [InitialsPipe],
})
export class SharedModule {}
