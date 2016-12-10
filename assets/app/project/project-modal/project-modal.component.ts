import { Project } from './../../shared/models/project.model';
import { ProjectService } from './../../shared/services/project.service';
import { NotificationService } from './../../shared/notification/notification.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html'
})
export class ProjectModalComponent implements OnInit {
    myForm: FormGroup;
    isModalActive: string = '';
    isEdit: boolean = false;
    modalClass = 'modal';
    project: Project;

    constructor(private notificationService: NotificationService,
      private projectService: ProjectService) {}

    ngOnInit() {
        this.myForm = new FormGroup({
            name: new FormControl(null, Validators.required),
            description: new FormControl(null)
        });

        this.projectService.projectModalEvent.subscribe(
          (obj: any) => {
            if (obj.isOpen) {
              this.onOpen();
              if(!obj.isAdd) {
                this.isEdit = true;
                this.project = obj.project;
                this.myForm.controls['name'].setValue(obj.project.name);
                this.myForm.controls['description'].setValue(obj.project.description);
              }
              else {
                console.log('new form');
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
        const project = new Project(this.myForm.value.name, this.myForm.value.description);
        this.projectService.saveProject(project)
          .subscribe(
            (data) => {
              this.onClose();
              this.notificationService.handleNotification(data.message, 'primary');
              this.myForm.reset();
            },  
            (error) => this.notificationService.handleNotification(error.title, 'danger')
          );
      } else {
        const project = new Project(this.myForm.value.name, this.myForm.value.description, this.project._id);
        this.projectService.updateProject(project)
          .subscribe(
            (data) => {
              this.onClose();
              this.notificationService.handleNotification(data.message, 'primary');
              this.project.name = project.name;
              this.project.description = project.description;
              this.myForm.reset();
            },  
            (error) => this.notificationService.handleNotification(error.title, 'danger')
          );
      }
    }
}