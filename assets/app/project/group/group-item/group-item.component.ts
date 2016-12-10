import { NotificationService } from './../../../shared/notification/notification.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Group } from './../../../shared/models/group.model';
import { GroupService } from './../../../shared/services/group.service';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.css']
})
export class GroupItemComponent implements OnInit {
  @Input() group: Group;
  myForm: FormGroup;

  constructor(private groupService: GroupService,
      private router: Router,
      private notificationService: NotificationService) {
  }

    ngOnInit() {
        this.myForm = new FormGroup({
            name: new FormControl(this.group.name, Validators.required)
        });
    }

    onChangeName() {
      if (this.myForm.valid) {
        this.group.name = this.myForm.value.name;
        this.groupService.updateGroup(this.group).subscribe();
        );
      }
    }

}