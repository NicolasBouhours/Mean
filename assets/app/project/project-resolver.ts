import { Project } from './../shared/models/project.model';
import { ProjectService } from './../shared/services/project.service';
import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';



@Injectable()
export class ProjectResolver implements Resolve<Project> {
  constructor(
    private projectService: ProjectService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.projectService.getProject(route.params['id'])
           .catch((err) => this.router.navigateByUrl('/'));

  }
}