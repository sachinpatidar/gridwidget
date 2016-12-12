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
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/Rx");
var CalendarService = (function () {
    function CalendarService(http) {
        this.http = http;
        this.list1Event = new core_1.EventEmitter();
        this.API_URL = 'https://svcdev.manageamerica.com/api/'; // URL to web API
    }
    CalendarService.prototype.getConfiguration = function (propertyId, Token, companyId) {
        var headers = new http_1.Headers();
        var tok = 'MaToken ' + Token;
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append("Authorization", tok);
        var url = this.API_URL + 'reservation/grid/configuration/' + propertyId + '?companyId=' + companyId;
        return this.http.get(url, { headers: headers })
            .catch(this.handleError);
    };
    CalendarService.prototype.SignIn = function (UserName, Password) {
        var url = this.API_URL + 'account/signin';
        var body = JSON.stringify({ "Login": UserName, "Password": Password });
        //  'Login='+UserName+'&Password='+Password;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        //   headers.append('Access-Control-Request-Method', 'POST');
        return this.http.post(url, body, { headers: headers })
            .catch(this.handleError);
    };
    CalendarService.prototype.getFilterCriterea = function (propertyId, Token, companyId) {
        var url = this.API_URL + 'reservation/grid/criteria/' + propertyId + '?companyId=' + companyId;
        var headers = new http_1.Headers();
        var tok = 'MaToken ' + Token;
        headers.append("Authorization", tok);
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        return this.http.get(url, { headers: headers })
            .catch(this.handleError);
    };
    CalendarService.prototype.getReservarions = function (propertyId, Token, companyId) {
        var url = this.API_URL + "reservation/grid/availability/" + propertyId + '?companyId=' + companyId;
        var headers = new http_1.Headers();
        var tok = 'MaToken ' + Token;
        headers.append("Authorization", tok);
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        return this.http.get(url, { headers: headers })
            .catch(this.handleError);
    };
    CalendarService.prototype.extractData = function (res) {
        var body = res.json();
        return body.data || {};
    };
    CalendarService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    CalendarService.prototype.calendarSharedData = function (Data) {
        this.list1Event.emit(Data);
    };
    return CalendarService;
}());
CalendarService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], CalendarService);
exports.CalendarService = CalendarService;
//# sourceMappingURL=Services.js.map