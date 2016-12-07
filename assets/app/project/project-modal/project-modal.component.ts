import { NotificationService } from './../../shared/notification/notification.service';
import { ProjectService } from './../project.service';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Project } from './../project.model';

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.css']
})
export class ProjectModalComponent implements OnInit, OnChanges {
    myForm: FormGroup;
    @Input() active: string;
    @Output() closeModal = new EventEmitter<boolean>();
    isModalActive: string = '';
    modalClass = 'modal';

    constructor(private notificationService: NotificationService,
      private projectService: ProjectService) {}

    ngOnInit() {
        this.myForm = new FormGroup({
            name: new FormControl(null, Validators.required),
            description: new FormControl(null)
        });
        this.modalClass = `modal ${this.isModalActive}`;
    }

    ngOnChanges() {
      this.modalClass = `modal ${this.active}`;
    }

    onClose() {
      this.closeModal.emit(false);
    }

    onSubmit() {
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
    }
}