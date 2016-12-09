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
var angular2_contextmenu_1 = require('angular2-contextmenu');
;
var angular2_contextmenu_2 = require('angular2-contextmenu');
var ContextMenuComponentCustom = (function () {
    function ContextMenuComponentCustom(contextMenuService) {
        this.contextMenuService = contextMenuService;
        this.items = [
            { name: 'John', otherProperty: 'Foo' },
            { name: 'Joe', otherProperty: 'Bar' },
        ];
        this.outsideValue = 'something';
    }
    ContextMenuComponentCustom.prototype.onContextMenu = function ($event, item) {
        this.contextMenuService.show.next({ event: $event, item: item });
        $event.preventDefault();
    };
    ContextMenuComponentCustom.prototype.showMessage = function (message) {
        console.log(message);
    };
    ContextMenuComponentCustom.prototype.onlyJohn = function (item) {
        return item.name === 'John';
    };
    ContextMenuComponentCustom.prototype.onlyJoe = function (item) {
        return item.name === 'Joe';
    };
    __decorate([
        core_1.ViewChild('basicMenu'), 
        __metadata('design:type', angular2_contextmenu_1.ContextMenuComponent)
    ], ContextMenuComponentCustom.prototype, "basicMenu", void 0);
    __decorate([
        core_1.ViewChild('enableAndVisible'), 
        __metadata('design:type', angular2_contextmenu_1.ContextMenuComponent)
    ], ContextMenuComponentCustom.prototype, "enableAndVisible", void 0);
    __decorate([
        core_1.ViewChild('withFunctions'), 
        __metadata('design:type', angular2_contextmenu_1.ContextMenuComponent)
    ], ContextMenuComponentCustom.prototype, "withFunctions", void 0);
    ContextMenuComponentCustom = __decorate([
        core_1.Component({
            selector: 'angular2-context-menu-demo',
            templateUrl: 'app/Widget/ContextMenu.html',
        }), 
        __metadata('design:paramtypes', [angular2_contextmenu_2.ContextMenuService])
    ], ContextMenuComponentCustom);
    return ContextMenuComponentCustom;
}());
exports.ContextMenuComponentCustom = ContextMenuComponentCustom;
//# sourceMappingURL=ContextMenuComponentCustom.js.map