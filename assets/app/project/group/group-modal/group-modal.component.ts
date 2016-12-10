import { Group } from './../../../shared/models/group.model';
import { GroupService } from './../../../shared/services/group.service';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from './../../../shared/notification/notification.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-group-modal',
  templateUrl: './group-modal.component.html'
})
export class GroupModalComponent implements OnInit {
    myForm: FormGroup;
    isModalActive: string = '';
    modalClass = 'modal';
    group: Group;

    constructor(private notificationService: NotificationService,
      private groupService: GroupService,
      private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.myForm = new FormGroup({
            name: new FormControl(null, Validators.required)
        });

        this.groupService.groupModalEvent.subscribe(
          (obj: any) => {
            if (obj.isOpen) {
              this.onOpen();
            } else {
              this.onClose();
            }
          }
        );
    }


    onClose() {
      this.modalClass = 'modal';
    }

    onOpen() {
      this.modalClass = 'modal is-active';
    }

    onSubmit() {
      const group = new Group(this.myForm.value.name);
      this.groupService.saveGroup(group)
        .subscribe(
          (data) => {
            this.onClose();
            this.notificationService.handleNotification(data.message, 'primary');
            this.myForm.reset();
          },  
          (error) => this.notificationService.handleNotification(error.title, 'danger')
        );
    }

}