import { Router } from '@angular/router';
import { GroupService } from './../group.service';
import { Group } from './../group.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.css']
})
export class GroupItemComponent {
  @Input() group: Group;

  constructor(private groupService: GroupService,
    private router: Router) {}

  onEditGroup() {
      this.groupService.groupModalEvent.emit({
        isOpen: true,
        isAdd: false,
        group: this.group
      });
  }

}