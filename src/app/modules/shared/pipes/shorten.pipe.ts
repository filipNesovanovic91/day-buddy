import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten',
})
export class ShortenPipe implements PipeTransform {
  transform(value?: any, limit: number = 100, symbol: string = ' ...') {
    return value?.length > limit
      ? `${value?.substr(0, limit)}  ${symbol}`
      : value;
  }
}
