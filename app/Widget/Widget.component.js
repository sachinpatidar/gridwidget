"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var Services_1 = require('./Services');
var angular2_contextmenu_1 = require('angular2-contextmenu');
;
var angular2_contextmenu_2 = require('angular2-contextmenu');
var core_2 = require('@angular/core');
var OrderBy = (function () {
    //@Output() userUpdated1 = new EventEmitter();
    function OrderBy(obj) {
        this.obj = obj;
    }
    OrderBy._orderByComparator = function (a, b) {
        if ((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))) {
            //Isn't a number so lowercase the string to properly compare
            if (a.toLowerCase() < b.toLowerCase())
                return -1;
            if (a.toLowerCase() > b.toLowerCase())
                return 1;
        }
        else {
            //Parse strings as numbers to compare properly
            if (parseFloat(a) < parseFloat(b))
                return -1;
            if (parseFloat(a) > parseFloat(b))
                return 1;
        }
        return 0; //equal each other
    };
    OrderBy.prototype.transform = function (input, _a) {
        var _b = _a[0], config = _b === void 0 ? '+' : _b;
        if (!Array.isArray(input))
            return input;
        if (!Array.isArray(config) || (Array.isArray(config) && config.length == 1)) {
            var propertyToCheck = !Array.isArray(config) ? config : config[0];
            var desc = propertyToCheck.substr(0, 1) == '-';
            //Basic array
            if (!propertyToCheck || propertyToCheck == '-' || propertyToCheck == '+') {
                return !desc ? input.sort() : input.sort().reverse();
            }
            else {
                var property = propertyToCheck.substr(0, 1) == '+' || propertyToCheck.substr(0, 1) == '-'
                    ? propertyToCheck.substr(1)
                    : propertyToCheck;
                return input.sort(function (a, b) {
                    return !desc
                        ? OrderBy._orderByComparator(a[property], b[property])
                        : -OrderBy._orderByComparator(a[property], b[property]);
                });
            }
        }
        else {
            //Loop over property of the array in order and sort
            return input.sort(function (a, b) {
                for (var i = 0; i < config.length; i++) {
                    var desc = config[i].substr(0, 1) == '-';
                    var property = config[i].substr(0, 1) == '+' || config[i].substr(0, 1) == '-'
                        ? config[i].substr(1)
                        : config[i];
                    var comparison = !desc
                        ? OrderBy._orderByComparator(a[property], b[property])
                        : -OrderBy._orderByComparator(a[property], b[property]);
                    //Don't return 0 yet in case of needing to sort by next property
                    if (comparison != 0)
                        return comparison;
                }
                return 0; //equal each other
            });
        }
    };
    OrderBy = __decorate([
        core_2.Pipe({ name: 'orderBy', pure: true }), 
        __metadata('design:paramtypes', [Services_1.CalendarService])
    ], OrderBy);
    return OrderBy;
}());
exports.OrderBy = OrderBy;
var WidgetComponent = (function () {
    function WidgetComponent(obj, contextMenuService) {
        this.obj = obj;
        this.contextMenuService = contextMenuService;
        this.userUpdated = new core_1.EventEmitter();
        this.splitedReservation = new core_1.EventEmitter();
        this.Resevation = { ResidentName: '', From: '', To: '' };
        this.calender = {};
        this.features = [];
        this.featuresValue = [];
        this.count = 0;
        this.show = false;
        this.featuresMenu = [];
        this.loader = false;
        this.companyId = 0;
        this.showAdd = true;
        this.orderByValue = '';
        this.outsideValue = 'something';
        this.NoOfRows = 22;
        this.SignIn();
        //this.obj.list1Event.subscribe(data => {
        //});
    }
    WidgetComponent.prototype.ngOnInit = function () {
    };
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
    WidgetComponent.prototype.processContextMenuCloseEvent = function () {
        return false;
    };
    WidgetComponent.prototype.showMessage = function () {
        console.log(this.featuresValue);
    };
    WidgetComponent.prototype.onlyJohn = function (item) {
        return item.name === 'John';
    };
    WidgetComponent.prototype.onlyJoe = function (item) {
        return item.name === 'Joe';
    };
    WidgetComponent.prototype.SignIn = function () {
        var _this = this;
        this.obj.SignIn('GridTesting', 'JDmW2#@D').subscribe(function (data) {
            _this.LoginResponse = JSON.parse(data._body);
            //hardcoded currently need to be changed later on
            _this.PropertyID = 6929;
            //propertyid end
            // console.log("signin" + this.count++);
            console.log("response", _this.LoginResponse);
            _this.getConfiguration();
        });
    }; //Get Configuration data for grid
    WidgetComponent.prototype.getConfiguration = function () {
        var _this = this;
        if (this.LoginResponse != null && this.LoginResponse != undefined) {
            this.obj.getConfiguration(this.PropertyID, this.LoginResponse.token, this.LoginResponse.companyId).subscribe(function (data) {
                _this.Configuration = JSON.parse(data._body);
                _this.initializeCalendar = _this.Configuration.configuration.serverDate;
                _this.NoOfRows = _this.Configuration.configuration.daysToShow;
                _this.minResDate = _this.convertToDate(0, 'numformat');
                _this.maxResDate = _this.convertToDate(_this.NoOfRows, 'numformat');
                _this.getReservarions();
            });
        }
    };
    //Get filter Criterea data for reservation
    WidgetComponent.prototype.getFilterCriterea = function (data1) {
        var _this = this;
        this.obj.getFilterCriterea(this.PropertyID, this.LoginResponse.token, this.LoginResponse.companyId).subscribe(function (data) {
            console.log('this getfiltercriterea start');
            var dat = JSON.parse(data._body);
            data1.availability.spaces[0].features.map(function (n, j) {
                dat.reservationCriteria.types.type.map(function (l, m) {
                    if (n.typeId == l.id) {
                        _this.features.push({ display: l.display, order: l.displayOrder, id: l.id, show: true });
                        _this.featuresMenu.push({ display: l.display, order: l.displayOrder, id: l.id, show: true });
                    }
                });
            });
            var val = dat.reservationCriteria.features.feature;
            //for (var i = 0; i < data1.spaces.space.length; i++)
            for (var i = 0; i < 83; i++) {
                // console.log(i);
                var arr = [];
                for (var j = 0; j < data1.availability.spaces[i].features.length; j++) {
                    for (var k = 0; k < val.length; k++) {
                        if (val[k].id == data1.availability.spaces[i].features[j].featureId && val[k].typeId == data1.availability.spaces[i].features[j].typeId) {
                            arr.push({ featureId: val[k].id, typeId: val[k].typeId, displayOrder: val[k].displayOrder, display: val[k].display });
                        }
                    }
                }
                _this.featuresValue.push(arr);
            }
            var result = [];
            for (var i = 0; i < _this.featuresValue.length; i++) {
                var c = {};
                for (var j = 0; j < _this.features.length; j++) {
                    //c['name'] = 'abc';
                    //c['wer'] = 'abc1';
                    //c['ert'] = 'abc2';
                    c[_this.features[j].display] = _this.featuresValue[i][j].display;
                }
                result.push(c);
                console.log('this getfiltercriterea end');
            }
            _this.featuresValue = result;
            _this.loader = true;
            //  console.log("getfiltercriterea" + this.count++);
            _this.showCalendar(data1);
        });
    };
    //Get filter Criterea data for reservation
    WidgetComponent.prototype.getReservarions = function () {
        var _this = this;
        this.obj.getReservarions(this.PropertyID, this.LoginResponse.token, this.LoginResponse.companyId).subscribe(function (data) {
            _this.getFilterCriterea(JSON.parse(data._body));
        });
    };
    WidgetComponent.prototype.showCalendar = function (data) {
        var _this = this;
        console.log('this calendar called services completed');
        var obj1 = [];
        //data.spaces.space.map((v, f) => {
        //    //obj[f].res = v.reservations.reservation;
        //    //obj[f].
        //    let resResult = [];
        //    v.reservations.reservation.map((n, j) => {
        //        resResult.push({ start: new Date(date.setDate(date.getDate() + n.from)).getDate(), end: new Date(date.setDate(date.getDate() + n.to)).getDate(), residentName: n.residentName,month:})
        //    })
        //    obj1.push({ res: { start: new Date(date.setDate(date.getDate() + v.reservation)), end:,residentName:,month:,id:} , name: 'sachin', len: 10, etc: 'hello' });
        //});
        var head = [];
        var rows = [];
        var skip = false;
        for (var i = 0; i <= this.NoOfRows; i++) {
            var color = false;
            var colspen = 0;
            var ind = 0;
            var date = new Date(this.initializeCalendar.substring(0, 10));
            var newdate = new Date(date.setDate(date.getDate() + i));
            head.push({
                month: newdate.getMonth() + 1,
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
        var obj = data.availability.spaces;
        this.calender["Header"] = head;
        var detail = [];
        console.log('calendar start injecting');
        obj.map(function (v, f) {
            if (f < 83) {
                var d = {
                    name: v.name,
                    len: '',
                    etc: '',
                    res: v.reservations
                };
                var skip = -1;
                rows = [];
                var _loop_1 = function(i) {
                    // let date = new Date();
                    var color = '';
                    var colspen = 1;
                    var ind = 0;
                    var from = i;
                    var to = i;
                    var id = 0;
                    var residentName = '';
                    var terminate = false;
                    //  var newdate = new Date(date.setDate(date.getDate() + i))
                    v.reservations.map(function (n, j) {
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
                };
                for (var i = 0; i <= _this.NoOfRows; i++) {
                    _loop_1(i);
                }
                d["row"] = rows;
                detail.push(d);
                console.log('calendar end injection');
            }
        });
        this.calender["Data"] = detail;
        this.featuresValue.map(function (y, u) {
            _this.featuresValue[u]['reservation'] = _this.calender['Data'][u];
            _this.featuresValue[u]['index'] = u;
        });
    };
    WidgetComponent.prototype.toggleFeatures = function (toggle, show, order, id) {
        var _this = this;
        console.log('toggle  ' + toggle + 'show  ' + show + 'order    ' + order + 'id  ' + id);
        this.featuresMenu.map(function (n, j) {
            if (n.display == toggle) {
                if (show) {
                    _this.featuresMenu[j].show = false;
                    _this.features.map(function (l, m) {
                        if (l.id == id) {
                            _this.features.splice(m, 1);
                        }
                    });
                }
                else {
                    _this.featuresMenu[j].show = true;
                    _this.features.push({ display: toggle, order: order, id: id, show: true });
                }
            }
        });
    };
    WidgetComponent.prototype.iterateList = function (a1) {
        var a = [];
        this.features.map(function (n, m) {
            if (n.show == true) {
                a.push({ display: n.display });
            }
            return a;
        });
    };
    // Get wwk days
    WidgetComponent.prototype.getweekDay = function (dayes) {
        return DayOfWeek[dayes];
    };
    WidgetComponent.prototype.getClass = function (d) {
        if ((d >= 0 && d <= 6) || (d >= 14 && d <= 20) || (d >= 21 && d <= 27)) {
            return true;
        }
        else {
            return false;
        }
    };
    WidgetComponent.prototype.drag = function (event, j, i, day) {
        event.dataTransfer.setData('dayData', JSON.stringify({ j: j, i: i, day: day }));
        event.dataTransfer.setData("text", event.target.id);
    };
    WidgetComponent.prototype.dropable = function (event) {
        event.preventDefault();
    };
    WidgetComponent.prototype.dothedrop = function (event, j, i, day) {
        var _this = this;
        event.preventDefault();
        var data = event.dataTransfer.getData("text");
        var dayData = JSON.parse(event.dataTransfer.getData("dayData"));
        var id = event.target.id;
        var val = id.substring(0, id.indexOf("_"));
        var glob = 0;
        var endDay = parseInt(day.From) + parseInt(dayData.day.To);
        if (endDay > this.NoOfRows) {
            this.error = 'reservation is going out of calendar';
            document.getElementById('mod').click();
            return;
        }
        if (val == 'div2') {
            var resLength = (parseInt(dayData.day.To) - parseInt(dayData.day.From)) + 1;
            var t = parseInt(day.From) + resLength;
            this.calender['Data'][j].res.map(function (n, k) {
                alert(t + "      this.calender['Data'][j].res[k].from   " + _this.calender['Data'][j].res[k].from);
                if ((_this.calender['Data'][j].res[k].from <= t) && (_this.calender['Data'][j].res[k].to >= t)) {
                    alert('called if condition');
                    _this.error = 'Reservation Already Available On Selected Date';
                    glob = 1;
                }
            });
            if (glob == 1) {
                document.getElementById('mod').click();
                return;
            }
            //  event.target.appendChild(document.getElementById(data));
            this.calender["Data"][j].row[i] = { From: day.From, Id: dayData.day.Id, ResidentName: dayData.day.ResidentName, To: day.From + dayData.day.colspen - 1, col: dayData.day.col, colspen: dayData.day.colspen, width: dayData.day.width };
            //   this.calender["Data"][j].row[i] = dayData.day;
            this.calender["Data"][dayData.j].row[dayData.i] = day;
            this.calender["Data"][dayData.j].row[dayData.i].From = dayData.day.From;
            this.calender["Data"][dayData.j].row[dayData.i].To = dayData.day.From;
            this.calender["Data"][dayData.j].res.map(function (v, f) {
                if (v.from == dayData.day.From) {
                    _this.calender["Data"][dayData.j].res[f].from = _this.calender["Data"][j].row[i].From;
                    _this.calender["Data"][dayData.j].res[f].to = _this.calender["Data"][j].row[i].To;
                }
            });
            this.userUpdated.emit(this.calender["Data"][dayData.j].res);
        }
        else {
            this.error = "Can not drop on existing reservations";
            document.getElementById('mod').click();
        }
        event.dataTransfer.clearData("text");
        event.dataTransfer.clearData("dayData");
    };
    WidgetComponent.prototype.onResize = function (event, width) {
        this.IsDivwidth = width;
    };
    WidgetComponent.prototype.onResizeUp = function (event, width, item, id, j, i) {
        var _this = this;
        if (this.IsDivwidth != width) {
            var c = (Math.ceil(event.target.offsetWidth / event.target.parentNode.offsetWidth)) * event.target.parentNode.offsetWidth;
            var cols = (c / parseInt(event.target.parentNode.offsetWidth) - item.colspen);
            document.getElementById(id).style.width = c + 'px';
            this.calender["Data"][j].row[i] = { From: item.From, Id: item.Id, ResidentName: item.ResidentName, To: parseInt(item.To) + cols, col: "#eeddff", colspen: item.colspen + cols, width: c + 'px' };
            this.calender["Data"][j].res.map(function (n, k) {
                if (n.id == _this.calender["Data"][j].row[i].Id) {
                    _this.calender["Data"][j].res[k] = { from: _this.calender["Data"][j].row[i].From, id: _this.calender["Data"][j].row[i].Id, to: parseInt(item.To) + cols, residentName: _this.calender["Data"][j].row[i].ResidentName, color: "#EEDDFF" };
                    _this.userUpdated.emit(_this.calender["Data"][j].res[k]);
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
    };
    WidgetComponent.prototype.removeClass = function () {
        document.getElementById('tr_0').className = '';
    };
    WidgetComponent.prototype.over = function (event, i, j) {
        var data = this.calender["Data"][j].row[i];
        document.getElementById('tr_0').className = 'border_bottom';
        this.Resevation['ResidentName'] = data.ResidentName;
        this.Resevation['To'] = this.convertToDate(data.To, 'numformat');
        this.Resevation['From'] = this.convertToDate(data.From, 'numformat');
        //this.Resevation['From'] ='12/6/2016';
    };
    WidgetComponent.prototype.convertToDate = function (dat, format) {
        var date = new Date(this.initializeCalendar.substring(0, 10));
        var newdate = new Date(date.setDate(date.getDate() + parseInt(dat)));
        if (format == 'numformat') {
            //return newdate.toISOString().substring(0, 10)
            // var month = newdate.getMonth() + 1;
            return newdate.toISOString().substring(0, 10);
        }
        else {
            newdate = new Date(dat);
            return newdate.toISOString().substring(0, 10);
        }
    };
    WidgetComponent.prototype.getTimeDifference = function (date12) {
        var date1 = new Date(this.initializeCalendar.substring(0, 10));
        var date2 = new Date(date12);
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return diffDays;
    };
    WidgetComponent.prototype.setContextMenuItem = function (day, i, j) {
        var res = { day: day, i: i, j: j };
        return res;
    };
    WidgetComponent.prototype.modalOpen = function (data, d, i, j) {
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
        }
        else {
            if (typeof (data) == 'object' && this.count == 0) {
                //   console.log('object           ' + this.count);
                this.show = true;
                this.showAdd = true;
                this.header = 'Add';
                this.Resevation['ResidentName'] = data.ResidentName;
                this.Resevation['To'] = this.convertToDate(data.To, 'numformat');
                this.Resevation['From'] = this.convertToDate(data.From, 'numformat');
                document.getElementById('mod1').click();
            }
            this.count = 0;
        }
        if (data == 'contextmenu') {
            this.show = false;
            this.header = 'Edit';
            this.showAdd = false;
            this.Resevation['ResidentName'] = d.ResidentName;
            this.Resevation['To'] = this.convertToDate(d.To, 'numformat');
            this.Resevation['From'] = this.convertToDate(d.From, 'numformat');
            document.getElementById('mod1').click();
        }
    };
    //split reservation when split button is clicked on modal popup for this to date will be the split from date
    WidgetComponent.prototype.SplitReservation = function (resiName, fromDate, toDate) {
        var _this = this;
        var colspen = (this.getTimeDifference(toDate) - parseInt(this.calender["Data"][this.indexJ].row[this.indexI].From)) + 1;
        var toDate1 = this.calender["Data"][this.indexJ].row[this.indexI].To;
        ////   console.log("toDate1" + this.getTimeDifference( this.convertToDate(toDate1, 'numformat')));
        this.calender["Data"][this.indexJ].row[this.indexI] = { From: this.calender["Data"][this.indexJ].row[this.indexI].From, Id: this.calender["Data"][this.indexJ].row[this.indexI].Id, ResidentName: resiName, To: this.getTimeDifference(toDate), col: "#eeddff", colspen: colspen, width: '' + (colspen * 100) + '%' };
        this.calender["Data"][this.indexJ].res.map(function (n, j) {
            if (n.id == _this.calender["Data"][_this.indexJ].row[_this.indexI].Id) {
                _this.calender["Data"][_this.indexJ].res[j] = { from: _this.calender["Data"][_this.indexJ].row[_this.indexI].From, id: _this.calender["Data"][_this.indexJ].row[_this.indexI].Id, to: _this.getTimeDifference(toDate), residentName: resiName, color: "#EEDDFF" };
                _this.userUpdated.emit(_this.calender["Data"][_this.indexJ].res[j]);
            }
        });
        var diff = this.getTimeDifference(toDate) - this.getTimeDifference(fromDate);
        colspen = (parseInt(toDate1) - this.getTimeDifference(toDate));
        this.calender["Data"][this.indexJ].row[this.indexI + diff + 1] = { From: this.getTimeDifference(toDate) + 1, Id: 2, ResidentName: resiName, To: toDate1, col: "#EEDDFF", colspen: colspen, width: '' + (colspen * 100) + '%' };
        this.calender["Data"][this.indexJ].res.push({ from: this.getTimeDifference(toDate) + 1, to: toDate1, residentName: resiName, color: "#EEDDFF" });
        console.log(this.calender);
        this.splitedReservation.emit({ from: this.getTimeDifference(toDate), id: this.calender["Data"][this.indexJ].res[this.indexI].Id, to: toDate1, residentName: resiName, color: "#EEDDFF" });
        //this.userUpdated.emit(this.calender["Data"][this.indexJ].row[this.indexI]);
    };
    //update reservation when existing reservation is clicked
    //checkHeaderShow()
    //{
    //    this.features = this.features;
    //    return this.features;
    //}
    WidgetComponent.prototype.updateReservation = function (resiName, fromDate, toDate) {
        var _this = this;
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
        if (this.indexI != this.getTimeDifference(fromDate)) {
            this.calender["Data"][this.indexJ].row[this.indexI] = { From: this.calender["Data"][this.indexJ].row[this.indexI].From, Id: '', ResidentName: '', To: this.calender["Data"][this.indexJ].row[this.indexI].From, col: "", colspen: 1, width: '' };
        }
        this.calender["Data"][this.indexJ].res.map(function (n, j) {
            if (n.id == _this.calender["Data"][_this.indexJ].row[_this.indexI].Id) {
                glob = j;
                _this.calender["Data"][_this.indexJ].res[j] = { from: _this.getTimeDifference(fromDate), id: _this.calender["Data"][_this.indexJ].row[_this.indexI].Id, to: _this.getTimeDifference(toDate), residentName: resiName, color: "#EEDDFF" };
            }
        });
        //  this.calender["Data"][this.indexJ].row[this.indexI] = { From: fromDate, Id: 2, ResidentName: resiName, To: toDate, col: "#72A2D3", colspen: colspen, day: this.calender["Data"][this.indexJ].row[this.indexI].day, width: '' + (colspen * 100) + '%', monthday: this.calender["Data"][this.indexJ].row[this.indexI].monthday, month: this.calender["Data"][this.indexJ].row[this.indexI].month };
        //console.log(' this.calender["Data"][this.indexJ].res[j]');
        //console.log(this.calender["Data"][this.indexJ].res[glob]);
        //console.log(' this.calender["Data"][this.indexJ].row[this.getTimeDifference(fromDate)]');
        //console.log(this.calender["Data"][this.indexJ].row[this.getTimeDifference(fromDate)]);
        //console.log(this.calender);
        this.userUpdated.emit(this.calender["Data"][this.indexJ].res[glob]);
    };
    //Add reservation when clicking on any date
    WidgetComponent.prototype.addReservation = function (resiName, fromDate, toDate) {
        var _this = this;
        var k = 0;
        this.calender['Data'][this.indexJ].res.map(function (n, j) {
            if ((_this.calender['Data'][_this.indexJ].res[j].from <= _this.getTimeDifference(toDate)) && (_this.calender['Data'][_this.indexJ].res[j].to >= _this.getTimeDifference(fromDate))) {
                _this.error = 'Reservation Already Available On Selected Date';
                k = 1;
            }
        });
        if (k == 1) {
            document.getElementById('mod').click();
            return;
        }
        // console.log("resiName " + resiName + "fromDate " + fromDate + "toDate " + toDate);
        this.calender["Data"][this.indexJ].res.push({ from: this.getTimeDifference(fromDate), to: this.getTimeDifference(toDate), residentName: resiName, color: "#EEDDFF" });
        var colspen = (this.getTimeDifference(toDate) - this.getTimeDifference(fromDate)) + 1;
        this.calender["Data"][this.indexJ].row[this.indexI] = { From: this.getTimeDifference(fromDate), Id: '', ResidentName: resiName, To: this.getTimeDifference(toDate), col: "#eeddff", colspen: colspen, width: '' + (colspen * 100) + '%' };
        this.userUpdated.emit({ from: this.getTimeDifference(fromDate), to: this.getTimeDifference(toDate), residentName: resiName, color: "#eeddff" });
    };
    WidgetComponent.prototype.orderByFunc = function (val) {
        this.orderByValue = val;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], WidgetComponent.prototype, "PropertyID", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], WidgetComponent.prototype, "userUpdated", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], WidgetComponent.prototype, "splitedReservation", void 0);
    __decorate([
        core_1.ViewChild('basicMenu'), 
        __metadata('design:type', angular2_contextmenu_1.ContextMenuComponent)
    ], WidgetComponent.prototype, "basicMenu", void 0);
    __decorate([
        core_1.ViewChild('enableAndVisible'), 
        __metadata('design:type', angular2_contextmenu_1.ContextMenuComponent)
    ], WidgetComponent.prototype, "enableAndVisible", void 0);
    __decorate([
        core_1.ViewChild('withFunctions'), 
        __metadata('design:type', angular2_contextmenu_1.ContextMenuComponent)
    ], WidgetComponent.prototype, "withFunctions", void 0);
    WidgetComponent = __decorate([
        core_1.Component({
            selector: 'calendar-widget',
            templateUrl: 'app/Widget/CalendarUI.html',
            styleUrls: [],
            providers: [Services_1.CalendarService],
        }), 
        __metadata('design:paramtypes', [Services_1.CalendarService, angular2_contextmenu_2.ContextMenuService])
    ], WidgetComponent);
    return WidgetComponent;
}());
exports.WidgetComponent = WidgetComponent;
//Enum for WeekDays
(function (DayOfWeek) {
    DayOfWeek[DayOfWeek["Mon"] = 1] = "Mon";
    DayOfWeek[DayOfWeek["Tue"] = 2] = "Tue";
    DayOfWeek[DayOfWeek["Wed"] = 3] = "Wed";
    DayOfWeek[DayOfWeek["Thi"] = 4] = "Thi";
    DayOfWeek[DayOfWeek["Fri"] = 5] = "Fri";
    DayOfWeek[DayOfWeek["Sat"] = 6] = "Sat";
    DayOfWeek[DayOfWeek["Sun"] = 0] = "Sun";
})(exports.DayOfWeek || (exports.DayOfWeek = {}));
var DayOfWeek = exports.DayOfWeek;
(function (monthOfYear) {
    monthOfYear[monthOfYear["Jan"] = 0] = "Jan";
    monthOfYear[monthOfYear["Feb"] = 1] = "Feb";
    monthOfYear[monthOfYear["Mar"] = 2] = "Mar";
    monthOfYear[monthOfYear["Apr"] = 3] = "Apr";
    monthOfYear[monthOfYear["May"] = 4] = "May";
    monthOfYear[monthOfYear["Jun"] = 5] = "Jun";
    monthOfYear[monthOfYear["Jul"] = 6] = "Jul";
    monthOfYear[monthOfYear["Aug"] = 7] = "Aug";
    monthOfYear[monthOfYear["Sep"] = 8] = "Sep";
    monthOfYear[monthOfYear["Oct"] = 9] = "Oct";
    monthOfYear[monthOfYear["Nov"] = 10] = "Nov";
    monthOfYear[monthOfYear["Dec"] = 11] = "Dec";
})(exports.monthOfYear || (exports.monthOfYear = {}));
var monthOfYear = exports.monthOfYear;
//# sourceMappingURL=Widget.component.js.map