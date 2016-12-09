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
var platform_browser_1 = require('@angular/platform-browser');
var app_component_1 = require('./app.component');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var Widget_component_1 = require('./Widget/Widget.component');
var angular2_contextmenu_1 = require('angular2-contextmenu');
var ng2_tooltip_1 = require('ng2-tooltip');
var ng2_datepicker_1 = require('ng2-datepicker');
var ContextMenuComponentCustom_1 = require('./Widget/ContextMenuComponentCustom');
var Widget_component_2 = require('./Widget/Widget.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                angular2_contextmenu_1.ContextMenuModule,
                ng2_tooltip_1.TooltipModule,
                ng2_datepicker_1.DatePickerModule
            ],
            declarations: [app_component_1.AppComponent, Widget_component_1.WidgetComponent, ContextMenuComponentCustom_1.ContextMenuComponentCustom, Widget_component_2.OrderBy],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map