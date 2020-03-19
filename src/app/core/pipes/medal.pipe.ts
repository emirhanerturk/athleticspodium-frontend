import { Pipe, PipeTransform } from '@angular/core';
import { EMedal, IMedalInfo, EMedalInfo } from '@enums/medal.enum';

@Pipe({
  name: 'medal'
})
export class MedalPipe implements PipeTransform {

  transform(value: EMedal): IMedalInfo {

    const medal = EMedalInfo.find(m => m.id === value);
    if (medal){
      return medal;
    }

    return { id: 0, name: '#', icon: '/assets/medals/non-medal.svg' }

  }

}
