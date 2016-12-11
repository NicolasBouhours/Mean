import { MenuService } from './../../shared/services/menu.service';
import { Group } from './../../shared/models/group.model';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-menu-add-card',
    templateUrl: './menu-add-card.component.html',
    styleUrls: ['./menu-add-card.component.css']
})
export class MenuAddCardComponent implements OnInit {
    group: Group = new Group('');

    constructor(private menuService: MenuService) {
        this.group = this.menuService.menuGroup;
    }
    
    ngOnInit() {
        
    }
}