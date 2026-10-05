import { Pipe, PipeTransform } from '@angular/core';
import { IMedalInfo, EMedalInfo, EPlacings } from '@enums/medal.enum';

@Pipe({
  name: 'medal'
})
export class MedalPipe implements PipeTransform {

  transform(value: number): IMedalInfo {

    const medal = EMedalInfo.find(m => m.id === value);
    if (medal){
      return medal;
    }

    if (EPlacings.includes(value)){
      return { id: value, name: value + '.', icon: null }
    }

    return { id: 0, name: '#', icon: '/assets/medals/non-medal.svg' }

  }

}
