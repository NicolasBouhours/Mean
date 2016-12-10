import { DropdownItem } from './dropdown-item.model';
import { Component, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  host: {
    '(document:click)': 'onClick($event)',
  }
})
export class DropdownComponent {
    @Input() dropdowns: DropdownItem[] = [];
    isActive = false;

    constructor(private _eref: ElementRef) { }


    openDropdown() {
        this.isActive = true;
    }

    closeDropdown() {
        this.isActive = false;
    }

    onClick(event) {
        if (!this._eref.nativeElement.contains(event.target)) {
            this.closeDropdown();
        }
    }
}