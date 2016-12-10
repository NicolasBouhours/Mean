import { Group } from './../../../shared/models/group.model';
import { GroupService } from './../../../shared/services/group.service';
import { Router } from '@angular/router';
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

}