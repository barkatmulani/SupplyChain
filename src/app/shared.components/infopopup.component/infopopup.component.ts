import { Component, Input, Output, ViewContainerRef, OnInit, OnChanges, EventEmitter, ViewChild, ComponentFactoryResolver, HostListener, ElementRef } from "@angular/core";
import { Observable } from "rxjs";

//import { Popup } from 'ng2-opd-popup';

@Component({
	selector: "infopopup",
    moduleId: module.id,
    templateUrl: 'infopopup.component.html'
})

export class InfoPopupComponent implements OnChanges {
	@Input() header: string = '';
    @Input() body: string = '';

    @Output() closeClicked: EventEmitter<any> = new EventEmitter();

    visible: boolean = false;
    width: number = 0;
    clientY: number;
    clientX: number;

    mouseup = new EventEmitter<MouseEvent>();
    mousedown = new EventEmitter<MouseEvent>();
    mousemove = new EventEmitter<MouseEvent>();

    mousedrag: Observable<{ top: number, left: number }>;

    @HostListener('document:mouseup', ['$event'])
    onMouseup(event: MouseEvent) {
        this.mouseup.emit(event);
    }

    @HostListener('mousedown', ['$event'])
    onMousedown(event: MouseEvent) {
        //console.log('Mouse Down');

        this.clientY = event.clientY;
        this.clientX = event.clientX;

        this.mousedown.emit(event);
        return false; // Call preventDefault() on the event
    }

    @HostListener('document:mousemove', ['$event'])
    onMousemove(event: MouseEvent) {
        //console.log('Mouse Move');
        //console.log('x: ' + event.clientX + ' - y: ' + event.clientY);
        this.mousemove.emit(event);
    }

    constructor(public element: ElementRef) {
        this.element.nativeElement.style.position = 'absolute';
        this.element.nativeElement.style.cursor = 'pointer';
        let diffX, diffY: number;
        this.mousedrag = this.mousedown.map(event => {
            //console.log('Mouse Drag');
            //console.log('event.clientY: ' + event.clientY + ' - event.clientX: ' + event.clientX + ' - top: ' + this.element.nativeElement.getBoundingClientRect().top + ' - left: ' + this.element.nativeElement.getBoundingClientRect().left);
            //console.log('final top: ' + (event.clientY - this.element.nativeElement.getBoundingClientRect().top) + ' - final left: ' + (event.clientX - this.element.nativeElement.getBoundingClientRect().left));
            return {
                top: this.element.nativeElement.getBoundingClientRect().top + event.view.scrollY,
                left: this.element.nativeElement.getBoundingClientRect().left + event.view.scrollX - 70,
            };
            })
            .flatMap(
            imageOffset => this.mousemove.map(pos => {
                //console.log('imageOffset top: ' + imageOffset.top + ' - left: ' + imageOffset.left);

                diffY = pos.clientY - this.clientY;
                diffX = pos.clientX - this.clientX;

                return ({
                    top: imageOffset.top + diffY,
                    left: imageOffset.left + diffX,
                });
            }));
    }

    ngOnChanges() {
        this.mousedrag.subscribe({
            next: pos => {
                this.element.nativeElement.style.top = pos.top + 'px';
                this.element.nativeElement.style.left = pos.left + 'px';
                this.element.nativeElement.style.width = this.width + 'px';
                //console.log('top: ' + pos.top + ' - left: ' + pos.left);
            }
        });
    }

    onCloseClicked(e: any) {
		this.visible = false;
		e.preventDefault();
    }

	public show(yPos: number = -1) {
		let y = ((yPos > -1) ? yPos : (((window.screen.height - this.element.nativeElement.offsetHeight) / 2) + window.scrollY));
		this.element.nativeElement.style.top = y + 'px';
		this.element.nativeElement.style.left = (((window.screen.width - this.element.nativeElement.parentElement.offsetWidth) / 2) + 70) + 'px';
        this.width = window.screen.width / 2;
        this.element.nativeElement.style.width = this.width + 'px';
        this.visible = true;
    }

    public hide() {
        this.visible = false;
    }
 }
