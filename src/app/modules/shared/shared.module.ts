import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitialsPipe } from './pipes/initials.pipe';
import { FormsModule } from '@angular/forms';
import { ShortenPipe } from './pipes/shorten.pipe';
import { HighlightInputDirective } from './directives/highlight-input.directive';

@NgModule({
  declarations: [InitialsPipe, ShortenPipe, HighlightInputDirective],
  imports: [CommonModule, FormsModule],
  exports: [InitialsPipe, ShortenPipe, HighlightInputDirective],
})
export class SharedModule {}
