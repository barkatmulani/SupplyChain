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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
//import { Popup } from 'ng2-opd-popup';
var InfoPopupComponent = /** @class */ (function () {
    function InfoPopupComponent(element) {
        var _this = this;
        this.element = element;
        this.header = '';
        this.body = '';
        this.closeClicked = new core_1.EventEmitter();
        this.visible = false;
        this.width = 0;
        this.mouseup = new core_1.EventEmitter();
        this.mousedown = new core_1.EventEmitter();
        this.mousemove = new core_1.EventEmitter();
        this.element.nativeElement.style.position = 'absolute';
        this.element.nativeElement.style.cursor = 'pointer';
        var diffX, diffY;
        this.mousedrag = this.mousedown.map(function (event) {
            //console.log('Mouse Drag');
            //console.log('event.clientY: ' + event.clientY + ' - event.clientX: ' + event.clientX + ' - top: ' + this.element.nativeElement.getBoundingClientRect().top + ' - left: ' + this.element.nativeElement.getBoundingClientRect().left);
            //console.log('final top: ' + (event.clientY - this.element.nativeElement.getBoundingClientRect().top) + ' - final left: ' + (event.clientX - this.element.nativeElement.getBoundingClientRect().left));
            return {
                top: _this.element.nativeElement.getBoundingClientRect().top + event.view.scrollY,
                left: _this.element.nativeElement.getBoundingClientRect().left + event.view.scrollX - 70,
            };
        })
            .flatMap(function (imageOffset) { return _this.mousemove.map(function (pos) {
            //console.log('imageOffset top: ' + imageOffset.top + ' - left: ' + imageOffset.left);
            diffY = pos.clientY - _this.clientY;
            diffX = pos.clientX - _this.clientX;
            return ({
                top: imageOffset.top + diffY,
                left: imageOffset.left + diffX,
            });
        })
            .takeUntil(_this.mouseup); });
    }
    InfoPopupComponent.prototype.onMouseup = function (event) {
        this.mouseup.emit(event);
    };
    InfoPopupComponent.prototype.onMousedown = function (event) {
        //console.log('Mouse Down');
        this.clientY = event.clientY;
        this.clientX = event.clientX;
        this.mousedown.emit(event);
        return false; // Call preventDefault() on the event
    };
    InfoPopupComponent.prototype.onMousemove = function (event) {
        //console.log('Mouse Move');
        //console.log('x: ' + event.clientX + ' - y: ' + event.clientY);
        this.mousemove.emit(event);
    };
    InfoPopupComponent.prototype.ngOnChanges = function () {
        var _this = this;
        this.mousedrag.subscribe({
            next: function (pos) {
                _this.element.nativeElement.style.top = pos.top + 'px';
                _this.element.nativeElement.style.left = pos.left + 'px';
                _this.element.nativeElement.style.width = _this.width + 'px';
                //console.log('top: ' + pos.top + ' - left: ' + pos.left);
            }
        });
    };
    InfoPopupComponent.prototype.onCloseClicked = function (e) {
        this.visible = false;
        e.preventDefault();
    };
    InfoPopupComponent.prototype.show = function (yPos) {
        if (yPos === void 0) { yPos = -1; }
        var y = ((yPos > -1) ? yPos : (((window.screen.height - this.element.nativeElement.offsetHeight) / 2) + window.scrollY));
        this.element.nativeElement.style.top = y + 'px';
        this.element.nativeElement.style.left = (((window.screen.width - this.element.nativeElement.parentElement.offsetWidth) / 2) + 70) + 'px';
        this.width = window.screen.width / 2;
        this.element.nativeElement.style.width = this.width + 'px';
        this.visible = true;
    };
    InfoPopupComponent.prototype.hide = function () {
        this.visible = false;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], InfoPopupComponent.prototype, "header", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], InfoPopupComponent.prototype, "body", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], InfoPopupComponent.prototype, "closeClicked", void 0);
    __decorate([
        core_1.HostListener('document:mouseup', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent]),
        __metadata("design:returntype", void 0)
    ], InfoPopupComponent.prototype, "onMouseup", null);
    __decorate([
        core_1.HostListener('mousedown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent]),
        __metadata("design:returntype", void 0)
    ], InfoPopupComponent.prototype, "onMousedown", null);
    __decorate([
        core_1.HostListener('document:mousemove', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent]),
        __metadata("design:returntype", void 0)
    ], InfoPopupComponent.prototype, "onMousemove", null);
    InfoPopupComponent = __decorate([
        core_1.Component({
            selector: "infopopup",
            moduleId: module.id,
            templateUrl: 'infopopup.component.html'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], InfoPopupComponent);
    return InfoPopupComponent;
}());
exports.InfoPopupComponent = InfoPopupComponent;
//# sourceMappingURL=infopopup.component.js.map