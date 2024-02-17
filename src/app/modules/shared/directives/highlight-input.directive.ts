import {
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Subject, debounceTime, fromEvent, takeUntil } from 'rxjs';

@Directive({
  selector: '[appHighlightInput]',
})
export class HighlightInputDirective implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    fromEvent(this.elementRef.nativeElement, 'input')
      .pipe(debounceTime(150), takeUntil(this.unsubscribe$))
      .subscribe((value: any) => {
        const inputElement = value.target as HTMLInputElement;

        if (inputElement.value.length > 0) {
          this.renderer.removeClass(
            this.elementRef.nativeElement.nextSibling,
            'send-icon'
          );
          this.renderer.addClass(
            this.elementRef.nativeElement.nextSibling,
            'highlight-send-icon'
          );
        } else {
          this.renderer.removeClass(
            this.elementRef.nativeElement.nextSibling,
            'highlight-send-icon'
          );
          this.renderer.addClass(
            this.elementRef.nativeElement.nextSibling,
            'send-icon'
          );
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
