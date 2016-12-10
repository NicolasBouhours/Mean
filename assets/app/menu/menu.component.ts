import { MenuService } from './menu.service';
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
    state = 'hidden';
    constructor(private menuService: MenuService,
        private _eref: ElementRef) {}

    ngOnInit() {
        this.menuService.menuEvent.subscribe(
            (data: boolean) => {
                this.isActive = data;
                if(data) {
                     this.state = 'show';
                } else {
                    this.state = 'hidden';
                }
            }
        );
    }

    onClose() {
        this.state = 'hidden';
    }

    onClick(event) {
        console.log(event.target);
        console.log(event.target.class);
        if (!this._eref.nativeElement.contains(event.target) && event.target.id.indexOf('show-menu-group') === -1 && event.target.id.indexOf('icon-show-menu-bars') === -1) {
            if(this.state === 'show') {
                this.state = 'hidden';
            }
        }
    }
}