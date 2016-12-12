import { Injectable, EventEmitter }     from '@angular/core';
import { Http, Response,Headers } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/Rx';
@Injectable()
export class CalendarService {
    list1Event: EventEmitter<any> = new EventEmitter();
  private API_URL = 'https://svcdev.manageamerica.com/api/';  // URL to web API
  constructor (private http: Http) {}
  getConfiguration (propertyId:number,Token:string,companyId:number): Observable<any> {
    var headers = new Headers();
    let tok: string = 'MaToken ' + Token;
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append("Authorization", tok);
      var url=this.API_URL+'reservation/grid/configuration/'+propertyId+'?companyId='+companyId;
      return this.http.get(url, { headers: headers });
   
  }
SignIn(UserName:string,Password):Observable<any>{


 var url=this.API_URL+'account/signin';
 let body:string = JSON.stringify({"Login":UserName,"Password":Password}); 
//  'Login='+UserName+'&Password='+Password;
 var headers = new Headers();
 headers.append('Content-Type', 'application/json');
   headers.append('Accept', 'application/json');
//   headers.append('Access-Control-Request-Method', 'POST');
   return this.http.post(url, body, { headers: headers });
                    
}
getFilterCriterea(propertyId:number,Token:string,companyId:number):Observable<any> {
 var url=this.API_URL+'reservation/grid/criteria/'+propertyId+'?companyId='+companyId;
 var headers = new Headers();
 let tok: string = 'MaToken ' + Token;
 headers.append("Authorization", tok);
 headers.append('Content-Type', 'application/json');
   headers.append('Accept', 'application/json');
    return this.http.get(url, { headers: headers });
                   
                 

}
    getReservarions(propertyId: number, Token: string, companyId: number): Observable<any> {
 var url=this.API_URL+"reservation/grid/availability/"+propertyId+'?companyId='+companyId;
 var headers = new Headers();
 let tok: string = 'MaToken ' + Token;
 headers.append("Authorization", tok);
 headers.append('Content-Type', 'application/json');
   headers.append('Accept', 'application/json');
        return this.http.get(url, { headers: headers });
                   
                   
}

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }
  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }


  public calendarSharedData(Data)
  {
      
      this.list1Event.emit(Data);
  }
}
