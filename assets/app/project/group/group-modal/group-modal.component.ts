import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from './../../../shared/notification/notification.service';
import { GroupService } from './../group.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Group } from './../group.model';

@Component({
  selector: 'app-group-modal',
  templateUrl: './group-modal.component.html'
})
export class GroupModalComponent implements OnInit {
    myForm: FormGroup;
    isModalActive: string = '';
    isEdit: boolean = false;
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
              if(!obj.isAdd) {
                this.isEdit = true;
                this.group = obj.group;
                this.myForm.controls['name'].setValue(obj.group.name);
              }
              else {
                this.isEdit = false;
                this.myForm.reset();
              }
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
      if(!this.isEdit) {
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
      } else {
        const group = new Group(this.myForm.value.name, this.group.id);
        this.groupService.updateGroup(group)
          .subscribe(
            (data) => {
              this.onClose();
              this.notificationService.handleNotification(data.message, 'primary');
              this.group.name = group.name;
              this.myForm.reset();
            },  
            (error) => this.notificationService.handleNotification(error.title, 'danger')
          );
      }
    }

}