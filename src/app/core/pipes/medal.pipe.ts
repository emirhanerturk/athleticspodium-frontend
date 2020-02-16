import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'medal'
})
export class MedalPipe implements PipeTransform {

  transform(medal_code: number): { name: string, icon: string } {

    switch(medal_code){
      case 1: return { name: 'Gold', icon: '/assets/images/medals/gold-medal.svg' }
      case 2: return { name: 'Silver', icon: '/assets/images/medals/silver-medal.svg' }
      case 3: return { name: 'Bronze', icon: '/assets/images/medals/bronze-medal.svg' }
      default: return { name: '#', icon: '/assets/images/medals/non-medal.svg' }
    }

  }

}
