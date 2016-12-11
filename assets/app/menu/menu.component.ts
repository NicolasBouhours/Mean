import { MenuService } from './../shared/services/menu.service';
import { Component, OnInit, trigger, state, transition, animate, style, ElementRef } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
    animations: [
        trigger('menuState', [
          state('hidden', style({
            display: 'none',
            transform: 'translateX(300px)'
          })),
          state('show', style({
            display: 'block',
            transform: 'translateX(0)'
          })),
          transition('hidden <=> show', animate(300)),
        ])
    ],
    host: {
       '(document:click)': 'onClick($event)',
    }
})
export class MenuComponent implements OnInit {
    isActive: boolean = false;
    isActivatedNow: boolean = false;
    state = 'hidden';
    constructor(private menuService: MenuService,
        private _eref: ElementRef) {}

    ngOnInit() {
        this.menuService.menuEvent.subscribe(
            (data: boolean) => {
                this.isActive = data;
                if(data) {
                     this.state = 'show';
                     this.isActivatedNow = true;
                     setTimeout(()=>{
                        this.isActivatedNow = false;
                    }, 50);
                } else {
                    this.state = 'hidden';
                }
            }
        );
    }

    onClose() {
        this.state = 'hidden';
        this.isActive = false;
    }

    onClick(event) {
        if (!this._eref.nativeElement.contains(event.target) && this.isActivatedNow === false ) {
            if(this.state === 'show') {
                this.state = 'hidden';
            }
        }
    }
}