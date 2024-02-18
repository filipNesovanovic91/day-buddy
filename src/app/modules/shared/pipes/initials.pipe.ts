import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../home/models/user.model';

@Pipe({
  name: 'initials',
})
export class InitialsPipe implements PipeTransform {
  transform(value: User): unknown {
    return `${value?.firstName[0]} ${value?.lastName[0]}`;
  }
}
