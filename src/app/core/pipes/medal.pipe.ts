import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'medal'
})
export class MedalPipe implements PipeTransform {

  transform(medal_code: number): { name: string, icon: string } {

    switch(medal_code){
      case 1: return { name: 'Gold', icon: 'gold-medal.svg' }
      case 2: return { name: 'Silver', icon: 'silver-medal.svg' }
      case 3: return { name: 'Bronze', icon: 'bronze-medal.svg' }
      default: return { name: '#', icon: 'non-medal.svg' }
    }

  }

}
