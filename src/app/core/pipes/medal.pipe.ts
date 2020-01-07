import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'medal'
})
export class MedalPipe implements PipeTransform {

  transform(medal_code: number): any {

    switch(medal_code){
      case 1: return { name: 'Gold' }
      case 2: return { name: 'Silver' }
      case 3: return { name: 'Bronze' }
      default: return { name: '#' }
    }

  }

}
