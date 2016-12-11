import { MenuService } from './../../shared/services/menu.service';

import { Group } from './../../shared/models/group.model';
import { GroupService } from './../../shared/services/group.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from './../../shared/models/project.model';
import { ProjectService } from './../../shared/services/project.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  
  project: Project;
  formAddGroup: FormGroup;

  constructor(private projectService: ProjectService,
    private groupService: GroupService,
    private menuService: MenuService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.project = this.projectService.getSelectedProject();

    this.formAddGroup = new FormGroup({
      name: new FormControl(null, Validators.required)
    });
  }

  onCreateGroup() {
    if(this.formAddGroup.valid) {
      const group = new Group(this.formAddGroup.value.name);
      this.projectService.addGroup(group);
      this.formAddGroup.reset();
    }
  }

  onOpenMenu() {
    this.router.navigate(['./setting'],  {relativeTo: this.route});
    this.menuService.menuEvent.emit(true);
  }

}