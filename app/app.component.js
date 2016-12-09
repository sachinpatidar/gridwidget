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
var AppComponent = (function () {
    function AppComponent() {
        this.user = { abc: 'sachin', def: 'hello' };
    }
    AppComponent.prototype.userUpdated = function (user) {
        console.log(user);
        this.user = user;
    };
    AppComponent.prototype.splitedReservation = function (user) {
        console.log(user);
        this.user = user;
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "<div> hello this is parent div {{user|json}}\n   \n   <calendar-widget [PropertyID]=\"1\" (userUpdated)=\"userUpdated($event)\"></calendar-widget>\n   <div>"
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map