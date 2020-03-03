import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringSlice'
})
export class StringSlicePipe implements PipeTransform {

  transform(value: string, end: number = 200, start: number = 0): any {
    return value.slice(start, end);
  }

}
