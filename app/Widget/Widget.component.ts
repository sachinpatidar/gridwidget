import { Component, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { CalendarService} from  './Services';
import {ResizeEvent} from './resizable.directive';
import {  ContextMenuComponent } from  'angular2-contextmenu';;
import { ContextMenuService} from 'angular2-contextmenu';
import {TooltipModule} from "ng2-tooltip";
import {DatePickerModule} from "ng2-datepicker";
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'orderBy', pure: true })
export class OrderBy  implements PipeTransform  {
    //@Output() userUpdated1 = new EventEmitter();
    constructor(private obj: CalendarService) {

    }
    static _orderByComparator(a: any, b: any): number {

        if ((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))) {
            //Isn't a number so lowercase the string to properly compare
            if (a.toLowerCase() < b.toLowerCase()) return -1;
            if (a.toLowerCase() > b.toLowerCase()) return 1;
        }
        else {
            //Parse strings as numbers to compare properly
            if (parseFloat(a) < parseFloat(b)) return -1;
            if (parseFloat(a) > parseFloat(b)) return 1;
        }

        return 0; //equal each other
    }

    transform(input: any, [config = '+']): any {
       
        if (!Array.isArray(input)) return input;

        if (!Array.isArray(config) || (Array.isArray(config) && config.length == 1)) {
            var propertyToCheck: string = !Array.isArray(config) ? config : config[0];
            var desc = propertyToCheck.substr(0, 1) == '-';

            //Basic array
            if (!propertyToCheck || propertyToCheck == '-' || propertyToCheck == '+') {
                return !desc ? input.sort() : input.sort().reverse();
            }
            else {
                var property: string = propertyToCheck.substr(0, 1) == '+' || propertyToCheck.substr(0, 1) == '-'
                    ? propertyToCheck.substr(1)
                    : propertyToCheck;

                return input.sort(function (a: any, b: any) {
                    return !desc
                        ? OrderBy._orderByComparator(a[property], b[property])
                        : -OrderBy._orderByComparator(a[property], b[property]);
                });
            }
        }
        else {
            //Loop over property of the array in order and sort
            return input.sort(function (a: any, b: any) {
                for (var i: number = 0; i < config.length; i++) {
                    var desc = config[i].substr(0, 1) == '-';
                    var property = config[i].substr(0, 1) == '+' || config[i].substr(0, 1) == '-'
                        ? config[i].substr(1)
                        : config[i];

                    var comparison = !desc
                        ? OrderBy._orderByComparator(a[property], b[property])
                        : -OrderBy._orderByComparator(a[property], b[property]);

                    //Don't return 0 yet in case of needing to sort by next property
                    if (comparison != 0) return comparison;
                }

                return 0; //equal each other
            });
        }
    }
}

@Component({
  selector: 'calendar-widget',
  templateUrl: 'app/Widget/CalendarUI.html',
  styleUrls: [],
  providers: [CalendarService],
  
 
  
})
export class WidgetComponent implements OnInit {
    @Input() PropertyID: number
    @Output() userUpdated = new EventEmitter();
    @Output() splitedReservation = new EventEmitter();
NoOfRows:number
Resevation: {} = { ResidentName: '', From: '', To: '' };
calender = {};
features = [];
featuresValue: any=[];
IsDivwidth: any;
count: number = 0;
    header: string;
    show: boolean = false;
    error: string;
    indexI: number;
    indexJ: number;
    featuresMenu:any= [];
    fromDate: string;
    loader: boolean=false;
    companyId: number = 0;
    Token: string;
    Configuration: any;
    showAdd: boolean = true;
    LoginResponse: any;
    minResDate: any;
    maxResDate: any;
    orderByValue: string ='';
    initializeCalendar: string;
    public outsideValue: string = 'something';

    @ViewChild('basicMenu') public basicMenu: ContextMenuComponent;
    @ViewChild('enableAndVisible') public enableAndVisible: ContextMenuComponent;
    @ViewChild('withFunctions') public withFunctions: ContextMenuComponent;

    constructor(private obj: CalendarService, private contextMenuService: ContextMenuService){
        this.NoOfRows = 22;
        this.SignIn();
        //this.obj.list1Event.subscribe(data => {
         
        //});
}
    ngOnInit()
    {
       
    }
   
    //public onContextMenu(data, item: any, i, j, $event: MouseEvent): void {
    //    console.log(JSON.stringify(item));
    //    var data1 = { data: data, item: item, i: i, j: j };
    //    this.contextMenuService.show.next({
    //        actions: [{
    //            html: () => 'Edit',
    //            click: (data) => {
    //                console.log(data);
    //                this.modalOpen(data.data,data.item,data.i,data.j)

    //            }
    //        }],
    //        event: $event,
    //        item: data1
    //    });
    //    $event.preventDefault();
    //    $event.stopPropagation();
    //}

    //public onContextMenu($event: MouseEvent, item: any): void {
    //    alert(JSON.stringify(item));
    //    this.contextMenuService.show.next({ event: $event, item: item });
    //    $event.preventDefault();
    //}

    public processContextMenuCloseEvent() {
        return false;
    }

    public showMessage(): void {
        console.log(this.featuresValue);
    }

    public onlyJohn(item: any): boolean {
        return item.name === 'John';
    }

    public onlyJoe(item: any): boolean {
        return item.name === 'Joe';
    }
SignIn() {
    this.obj.SignIn('GridTesting', 'JDmW2#@D').subscribe((data: any) => {
        this.LoginResponse = JSON.parse(data._body);
        //hardcoded currently need to be changed later on
        this.PropertyID = 6929;
        //propertyid end
       // console.log("signin" + this.count++);
        console.log("response", this.LoginResponse);
        this.getConfiguration();
    })

}  //Get Configuration data for grid
getConfiguration() {
    if (this.LoginResponse != null && this.LoginResponse != undefined) {
     
        this.obj.getConfiguration(this.PropertyID, this.LoginResponse.token, this.LoginResponse.companyId).subscribe((data: any) => {
            this.Configuration = JSON.parse(data._body);
            this.initializeCalendar = this.Configuration.configuration.serverDate;
            this.NoOfRows = this.Configuration.configuration.daysToShow
            this.minResDate = this.convertToDate(0, 'numformat');
            this.maxResDate = this.convertToDate(this.NoOfRows, 'numformat');
          
            this.getReservarions();
        })
    }
}
//Get filter Criterea data for reservation
getFilterCriterea(data1) {
    this.obj.getFilterCriterea(this.PropertyID, this.LoginResponse.token, this.LoginResponse.companyId).subscribe((data: any) => {
        console.log('this getfiltercriterea start');
        var dat = JSON.parse(data._body);
      
        data1.availability.spaces[0].features.map((n, j) => {
            dat.reservationCriteria.types.type.map((l, m) => {
                if (n.typeId == l.id)
                {
                    this.features.push({ display: l.display, order: l.displayOrder, id: l.id, show: true });
                    this.featuresMenu.push({ display: l.display, order: l.displayOrder, id: l.id, show: true });
                }
            })
          
        });
        var val = dat.reservationCriteria.features.feature;
       
        //for (var i = 0; i < data1.spaces.space.length; i++)
        for (var i = 0; i < 83; i++)
        {
           // console.log(i);
                var arr = []
                
                for (var j = 0; j < data1.availability.spaces[i].features.length; j++)
            {
                
                for (var k = 0; k < val.length; k++)
                {
                  
                    if (val[k].id == data1.availability.spaces[i].features[j].featureId && val[k].typeId == data1.availability.spaces[i].features[j].typeId)
                    {
                        arr.push({ featureId: val[k].id, typeId: val[k].typeId, displayOrder: val[k].displayOrder, display: val[k].display});
                    }
                }

            }
                this.featuresValue.push(arr)
               
        }
            var result = [];
            for (var i = 0; i < this.featuresValue.length; i++)
            {
                var c = {};
               
                for (var j = 0; j < this.features.length; j++)
                {
                    
                    //c['name'] = 'abc';
                    //c['wer'] = 'abc1';
                    //c['ert'] = 'abc2';
                   c[this.features[j].display] = this.featuresValue[i][j].display;
                    //c['name'] = this.featuresValue[i][j].display;
                }
                result.push(c);
                console.log('this getfiltercriterea end');
            }
            this.featuresValue = result;

           
           
        this.loader = true;
       
      //  console.log("getfiltercriterea" + this.count++);
        this.showCalendar(data1);
    })
}
//Get filter Criterea data for reservation
    getReservarions() {
   
        this.obj.getReservarions(this.PropertyID, this.LoginResponse.token, this.LoginResponse.companyId).subscribe((data: any) => {
          
         
            this.getFilterCriterea(JSON.parse(data._body));
          
    })
}

    showCalendar(data)
    {
      
      
        console.log('this calendar called services completed');
        let obj1 = []
      
        //data.spaces.space.map((v, f) => {
        //    //obj[f].res = v.reservations.reservation;
        //    //obj[f].
        //    let resResult = [];
        //    v.reservations.reservation.map((n, j) => {
        //        resResult.push({ start: new Date(date.setDate(date.getDate() + n.from)).getDate(), end: new Date(date.setDate(date.getDate() + n.to)).getDate(), residentName: n.residentName,month:})
        //    })
        //    obj1.push({ res: { start: new Date(date.setDate(date.getDate() + v.reservation)), end:,residentName:,month:,id:} , name: 'sachin', len: 10, etc: 'hello' });
        //});

      
            let head = []
            let rows = []
            let skip = false

            for (let i = 0; i <= this.NoOfRows; i++) {
             
                let color = false;
                let colspen = 0
                let ind = 0
                let date = new Date(this.initializeCalendar.substring(0,10));
              
                var newdate = new Date(date.setDate(date.getDate() + i))
            

                head.push({
                    month: newdate.getMonth()+1,
                    day: this.getweekDay(newdate.getDay()),
                    monthday: newdate.getDate()
                });

                rows.push({
                    month: newdate.getMonth(),
                    day: this.getweekDay(newdate.getDay()),
                    monthday: newdate.getDate()
                });

               

            }
           // let obj = obj1;
            let obj = data.availability.spaces;
        
            this.calender["Header"] = head;
        
            let detail = []
            console.log('calendar start injecting');
            obj.map((v, f) => {

                if(f<83){

                let d = {
                    name: v.name,
                    len: '',
                    etc: '',
                    res: v.reservations
                }
                var skip = -1
                rows = []
                for (let i = 0; i <= this.NoOfRows; i++) {

                    // let date = new Date();

                    let color = '';
                    let colspen = 1;
                    let ind = 0;
                    let from = i;
                    let to = i;
                    let id = 0;
                    let residentName = '';
                    let terminate = false
                    //  var newdate = new Date(date.setDate(date.getDate() + i))

               

                        v.reservations.map((n, j) => {


                            if (n.from == i) {

                                //  skip = skip + 1;
                                colspen = (n.to - n.from) + 1;
                                terminate = true;
                                color = n.color;
                                from = n.from;
                                to = n.to;
                                id = n.id;
                                residentName = n.residentName;


                            }

                            //from = n.start;
                            //to = n.end;
                            //id = n.id;
                            //residentName = n.residentName;


                        });
                    

                    rows.push({
                        //month: newdate.getMonth(),
                        // day: this.getweekDay(newdate.getDay()),
                        // monthday: newdate.getDate(),
                        colspen: colspen,
                        width: (colspen * 100) + '%',
                        col: color,
                        From: from,
                        To: to,
                        Id: id,
                        ResidentName: residentName
                    });

                }

                d["row"] = rows;
                detail.push(d)
               console.log('calendar end injection');
           }
            })
            this.calender["Data"] = detail;

            this.featuresValue.map((y, u) => {
                this.featuresValue[u]['reservation'] = this.calender['Data'][u];
                this.featuresValue[u]['index'] = u;
            });
          

        
    }
    toggleFeatures(toggle, show, order, id) {
        console.log('toggle  ' + toggle + 'show  ' + show + 'order    ' + order + 'id  ' + id)
        this.featuresMenu.map((n, j) => {

            if (n.display == toggle) {
                if (show) {
                    this.featuresMenu[j].show = false;
                    this.features.map((l, m) => {
                        if (l.id == id)
                        {
                            this.features.splice(m, 1);
                        }
                    });
                } else {
                    this.featuresMenu[j].show = true;
                    this.features.push({ display: toggle, order: order, id: id, show: true })
                }
                
              
            }

        })
      
    }
    iterateList(a1) {
     
        var a = [];
        this.features.map((n, m) => {
            if (n.show == true)
            {
                a.push({ display: n.display });
            }
            return a;

        })
    }
// Get wwk days
getweekDay(dayes:number){

return DayOfWeek[dayes];
  }
  getClass(d:number){

    if((d>=0 && d<=6)||(d>=14 && d<=20)||(d>=21 && d<=27)){
   
      return true;
    }
    else
    {
 
     return false
    }

  }
  drag(event, j, i, day) {
   
      event.dataTransfer.setData('dayData', JSON.stringify({ j: j, i: i, day: day }));
      event.dataTransfer.setData("text", event.target.id);
 
  }
  dropable(event){
    event.preventDefault();
  }
  dothedrop(event,j,i,day){
    
      event.preventDefault();
   
      
      var data = event.dataTransfer.getData("text");
      var dayData = JSON.parse(event.dataTransfer.getData("dayData"));
    
      var id = event.target.id;
      var val = id.substring(0, id.indexOf("_"));
      var glob = 0;
      var endDay = parseInt(day.From) + parseInt(dayData.day.To); 
      if (endDay > this.NoOfRows)
      {
          this.error = 'reservation is going out of calendar';
          document.getElementById('mod').click();
          return;
      }
      if (val == 'div2') {
          var resLength = (parseInt(dayData.day.To) - parseInt(dayData.day.From)) + 1;
          var t = parseInt(day.From) + resLength
          this.calender['Data'][j].res.map((n, k) => {
              alert(t + "      this.calender['Data'][j].res[k].from   "+ this.calender['Data'][j].res[k].from);

              if ((this.calender['Data'][j].res[k].from <= t) && (this.calender['Data'][j].res[k].to >= t)) {
                  alert('called if condition')
                  this.error = 'Reservation Already Available On Selected Date';

                  glob = 1;

              }
          });
          if (glob == 1) {
              document.getElementById('mod').click();
              return;
          }
        //  event.target.appendChild(document.getElementById(data));

          this.calender["Data"][j].row[i] = { From: day.From, Id: dayData.day.Id, ResidentName: dayData.day.ResidentName, To: day.From + dayData.day.colspen-1, col: dayData.day.col, colspen: dayData.day.colspen,  width: dayData.day.width};
       //   this.calender["Data"][j].row[i] = dayData.day;
        
        
          this.calender["Data"][dayData.j].row[dayData.i] = day;
          this.calender["Data"][dayData.j].row[dayData.i].From = dayData.day.From;
          this.calender["Data"][dayData.j].row[dayData.i].To = dayData.day.From;
          this.calender["Data"][dayData.j].res.map((v, f) => {
              if (v.from == dayData.day.From)
              {
                  this.calender["Data"][dayData.j].res[f].from = this.calender["Data"][j].row[i].From;
                  this.calender["Data"][dayData.j].res[f].to = this.calender["Data"][j].row[i].To;
     
              }
          })
         
          this.userUpdated.emit(this.calender["Data"][dayData.j].res);
      }
      else {
          this.error = "Can not drop on existing reservations";
         document.getElementById('mod').click();
      }
   
      event.dataTransfer.clearData("text");
      event.dataTransfer.clearData("dayData")
  }
  onResize(event,width){
      this.IsDivwidth = width
    
  }

  onResizeUp(event, width, item, id, j, i) {
      if (this.IsDivwidth != width) {

     

     
      var c = (Math.ceil(event.target.offsetWidth / event.target.parentNode.offsetWidth)) * event.target.parentNode.offsetWidth;
   
      var cols = (c / parseInt(event.target.parentNode.offsetWidth) - item.colspen);
      document.getElementById(id).style.width = c + 'px';
   
      this.calender["Data"][j].row[i] = { From: item.From, Id: item.Id, ResidentName: item.ResidentName, To: parseInt(item.To) + cols, col: "#eeddff", colspen: item.colspen + cols, width: c + 'px' };
      this.calender["Data"][j].res.map((n, k) => {

          if (n.id == this.calender["Data"][j].row[i].Id) {


              this.calender["Data"][j].res[k] = { from: this.calender["Data"][j].row[i].From, id: this.calender["Data"][j].row[i].Id, to: parseInt(item.To) + cols, residentName: this.calender["Data"][j].row[i].ResidentName, color: "#EEDDFF" };

              this.userUpdated.emit(this.calender["Data"][j].res[k]);
          }

      });
  }
    //if(this.IsDivwidth!=width){
      
     
    //   let w = event.currentTarget.style.width.replace("px", "")
      
    //   let n = (Number(w) / Number(event.currentTarget.parentElement.clientWidth)).toString();
   
    //   let dec = parseInt(n)
    //   console.log("dec", dec, "n", n, ' w  ' + w);
       
    //   let newwith = Number(n) > dec ? dec + 1 : dec;
    //   console.log(this.calender);
    //  // event.currentTarget.style.width = newwith * 100+'%'
    // //  console.log("current",newwith * 100+'%')
    //  }
  }
  removeClass() {
      document.getElementById('tr_0').className = '';
  }
  over(event, i, j) {
     
      var data = this.calender["Data"][j].row[i];
      document.getElementById('tr_0').className = 'border_bottom';
   
      this.Resevation['ResidentName'] = data.ResidentName;
      this.Resevation['To'] = this.convertToDate(data.To, 'numformat');
      
      this.Resevation['From'] = this.convertToDate(data.From, 'numformat');
     
      //this.Resevation['From'] ='12/6/2016';
    
  }
  convertToDate(dat, format): any {
      var date = new Date(this.initializeCalendar.substring(0, 10));
      
   
      var newdate = new Date(date.setDate(date.getDate() + parseInt(dat)));
     
    
      if (format == 'numformat') {
        
          //return newdate.toISOString().substring(0, 10)
         // var month = newdate.getMonth() + 1;
          return newdate.toISOString().substring(0, 10);
      }
      else {
          newdate = new Date(dat)

      
          return newdate.toISOString().substring(0, 10);

      }
      
  }
  getTimeDifference(date12)
  {
      var date1 = new Date(this.initializeCalendar.substring(0,10));
      var date2 = new Date(date12);
      var timeDiff = Math.abs(date2.getTime() - date1.getTime());
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
     

   

      return diffDays;
  }
  setContextMenuItem(day,i,j) {
      var res = { day: day, i: i, j: j };
      return res;
  }
  modalOpen(data: any, d, i, j) {
     
      this.indexI = i;
      this.indexJ = j;
      console.log('modal open');
    //  this.fromDate = this.convertToDate(this.calender["Data"][this.indexJ].row[this.indexI].From,'');
      
      if (d == 'divFunc') {

     
          this.show = true;
          this.showAdd = false;
          this.header = 'About';
          this.Resevation['ResidentName'] = data.ResidentName;
          this.Resevation['To'] = this.convertToDate(data.To, 'numformat');
          this.Resevation['From'] = this.convertToDate(data.From, 'numformat');
        
          document.getElementById('mod1').click();
          this.count++;
       //   console.log("divfunc   count" + this.count);
      }
      else {
          if (typeof (data) == 'object' && this.count == 0) {
           //   console.log('object           ' + this.count);
              this.show = true;
              this.showAdd = true;
              this.header = 'Add';
              this.Resevation['ResidentName']  = data.ResidentName;
              this.Resevation['To'] = this.convertToDate(data.To,'numformat');
              this.Resevation['From'] = this.convertToDate(data.From,'numformat');


              document.getElementById('mod1').click();

          }
          this.count = 0;
      }
      if (data == 'contextmenu')
      {
         
          this.show = false;
          this.header = 'Edit';
                  this.showAdd = false;
                  this.Resevation['ResidentName'] = d.ResidentName;
                  this.Resevation['To'] = this.convertToDate(d.To, 'numformat');
                  this.Resevation['From'] = this.convertToDate(d.From, 'numformat');
                  document.getElementById('mod1').click();
      }
  } 
    //split reservation when split button is clicked on modal popup for this to date will be the split from date
  SplitReservation(resiName, fromDate, toDate)
  {
    
      var colspen = (this.getTimeDifference(toDate) - parseInt(this.calender["Data"][this.indexJ].row[this.indexI].From))+1;
    
    var toDate1 = this.calender["Data"][this.indexJ].row[this.indexI].To;
 
   ////   console.log("toDate1" + this.getTimeDifference( this.convertToDate(toDate1, 'numformat')));
    this.calender["Data"][this.indexJ].row[this.indexI] = { From: this.calender["Data"][this.indexJ].row[this.indexI].From, Id: this.calender["Data"][this.indexJ].row[this.indexI].Id, ResidentName: resiName, To: this.getTimeDifference(toDate), col: "#eeddff", colspen: colspen, width: '' + (colspen * 100) + '%' };
    this.calender["Data"][this.indexJ].res.map((n, j) => {
       
        if (n.id == this.calender["Data"][this.indexJ].row[this.indexI].Id) {
           
           
            this.calender["Data"][this.indexJ].res[j] = { from: this.calender["Data"][this.indexJ].row[this.indexI].From, id: this.calender["Data"][this.indexJ].row[this.indexI].Id, to: this.getTimeDifference(toDate), residentName: resiName, color: "#EEDDFF" };
        
            this.userUpdated.emit(this.calender["Data"][this.indexJ].res[j]);
        }

    });

    var diff = this.getTimeDifference(toDate) - this.getTimeDifference(fromDate);
 
   
    colspen = (parseInt(toDate1) - this.getTimeDifference(toDate));
 
    this.calender["Data"][this.indexJ].row[this.indexI + diff+1] = { From: this.getTimeDifference(toDate)+1, Id: 2, ResidentName: resiName, To: toDate1, col: "#EEDDFF", colspen: colspen, width: '' + (colspen * 100) + '%' };
   
    this.calender["Data"][this.indexJ].res.push({ from: this.getTimeDifference(toDate) + 1, to: toDate1, residentName: resiName, color: "#EEDDFF" });
    console.log(this.calender);
    this.splitedReservation.emit({ from: this.getTimeDifference(toDate), id: this.calender["Data"][this.indexJ].res[this.indexI].Id, to: toDate1, residentName: resiName, color: "#EEDDFF" });
   
      //this.userUpdated.emit(this.calender["Data"][this.indexJ].row[this.indexI]);
  }
    //update reservation when existing reservation is clicked
  //checkHeaderShow()
  //{
  //    this.features = this.features;
  //    return this.features;
  
  //}
  updateReservation(resiName, fromDate, toDate)
  {
      var glob = 0;
      //this.calender['Data'][this.indexJ].res.map((n, j) => {
      //    if ((this.calender['Data'][this.indexJ].res[j].from <= this.getTimeDifference(toDate)) && (this.calender['Data'][this.indexJ].res[j].to >= this.getTimeDifference(fromDate))) {
      //        this.error = 'Reservation Already Available On Selected Date';
            
      //        glob = 1;
              
      //    }
      //});
      //if (glob == 1)
      //{
      //    document.getElementById('mod').click();
      //    return;
      //}
      var colspen = (this.getTimeDifference(toDate) - this.getTimeDifference(fromDate)) + 1;
    
      this.calender["Data"][this.indexJ].row[this.getTimeDifference(fromDate)] = { From: this.getTimeDifference(fromDate), Id: this.calender["Data"][this.indexJ].row[this.indexI].Id, ResidentName: resiName, To: this.getTimeDifference(toDate), col: "#eeddff", colspen: colspen, width: '' + (colspen * 100) + '%' };
      if (this.indexI != this.getTimeDifference(fromDate))
      {
          this.calender["Data"][this.indexJ].row[this.indexI] = { From: this.calender["Data"][this.indexJ].row[this.indexI].From, Id: '', ResidentName: '', To: this.calender["Data"][this.indexJ].row[this.indexI].From, col: "", colspen: 1, width: '' };
      }
      
      this.calender["Data"][this.indexJ].res.map((n, j) => {
          if (n.id == this.calender["Data"][this.indexJ].row[this.indexI].Id)
          {
             
              glob = j
              this.calender["Data"][this.indexJ].res[j] = { from: this.getTimeDifference(fromDate), id: this.calender["Data"][this.indexJ].row[this.indexI].Id, to: this.getTimeDifference(toDate), residentName: resiName, color: "#EEDDFF" };
              //console.log(this.calender["Data"][this.indexJ].res[j]);
             
          }
      })
      //  this.calender["Data"][this.indexJ].row[this.indexI] = { From: fromDate, Id: 2, ResidentName: resiName, To: toDate, col: "#72A2D3", colspen: colspen, day: this.calender["Data"][this.indexJ].row[this.indexI].day, width: '' + (colspen * 100) + '%', monthday: this.calender["Data"][this.indexJ].row[this.indexI].monthday, month: this.calender["Data"][this.indexJ].row[this.indexI].month };
      //console.log(' this.calender["Data"][this.indexJ].res[j]');
      //console.log(this.calender["Data"][this.indexJ].res[glob]);
      //console.log(' this.calender["Data"][this.indexJ].row[this.getTimeDifference(fromDate)]');
      //console.log(this.calender["Data"][this.indexJ].row[this.getTimeDifference(fromDate)]);
      //console.log(this.calender);
      this.userUpdated.emit(this.calender["Data"][this.indexJ].res[glob]);
  }
    //Add reservation when clicking on any date
  addReservation(resiName, fromDate, toDate)
  {
 
      var k = 0;
      this.calender['Data'][this.indexJ].res.map((n, j) => {
          if ((this.calender['Data'][this.indexJ].res[j].from <= this.getTimeDifference(toDate)) && (this.calender['Data'][this.indexJ].res[j].to >= this.getTimeDifference(fromDate)))
          {
             
              this.error = 'Reservation Already Available On Selected Date';
             
           
              k = 1;
          }
      })
      if (k == 1)
      {
          document.getElementById('mod').click();
          return;
      }
      // console.log("resiName " + resiName + "fromDate " + fromDate + "toDate " + toDate);
      this.calender["Data"][this.indexJ].res.push({ from: this.getTimeDifference(fromDate), to: this.getTimeDifference(toDate), residentName: resiName, color: "#EEDDFF" });
    
      var colspen = (this.getTimeDifference(toDate) - this.getTimeDifference(fromDate)) + 1;
      this.calender["Data"][this.indexJ].row[this.indexI] = { From: this.getTimeDifference(fromDate), Id: '', ResidentName: resiName, To: this.getTimeDifference(toDate), col: "#eeddff", colspen: colspen, width: '' + (colspen * 100) + '%' };
      this.userUpdated.emit({ from: this.getTimeDifference(fromDate), to: this.getTimeDifference(toDate), residentName: resiName, color: "#eeddff" });
     
  }
  orderByFunc(val: any) {

      this.orderByValue = val;
  }
     
  
}


//Enum for WeekDays
export enum DayOfWeek {
    Mon = 1,
    Tue=2,
    Wed=3,
    Thi=4,
    Fri=5,
    Sat=6,
    Sun=0
}
export enum monthOfYear {
    Jan=0,
    Feb=1,
    Mar=2,
    Apr=3,
    May=4,
    Jun=5,
    Jul=6,
    Aug=7,
    Sep=8,
    Oct=9,
    Nov =10,
    Dec=11

}