import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hidePassword',
  standalone:false
})
export class HidePasswordPipe implements PipeTransform {

  transform(value: string ,code:string,showCharnum:number=0): unknown { 
    const valueArray=value.split('');
    return showCharnum?valueArray.slice(0,showCharnum).join('')+valueArray.slice(showCharnum).fill(code).join('')
    :valueArray.fill(code).join(''); 
  }


}
