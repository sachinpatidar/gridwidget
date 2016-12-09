import { Component,Input } from '@angular/core';


@Component({
  selector: 'my-app',
   template:`<div> hello this is parent div {{user|json}}
   
   <calendar-widget [PropertyID]="1" (userUpdated)="userUpdated($event)"></calendar-widget>
   <div>`
  

})
export class AppComponent {
    user: any = {abc:'sachin',def:'hello'};
    constructor() {
       
    }
    userUpdated(user) {
        console.log(user);
        this.user = user;
    }
    splitedReservation(user)
    {
        console.log(user);
        this.user = user;
    }

}