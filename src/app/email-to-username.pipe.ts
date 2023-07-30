import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emailToUsername'
})
export class EmailToUsernamePipe implements PipeTransform {

  transform(email:string): string {
    const username = email.split('@')[0];
    const truncatedUsername = username.slice(0,6);
    return truncatedUsername;
  }

}
