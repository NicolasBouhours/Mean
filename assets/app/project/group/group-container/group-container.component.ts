import { Group } from './../group.model';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from './../group.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'app-group-container',
    templateUrl: './group-container.component.html'
})
export class GroupContainerComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    private groups: Group[] = [];

    constructor(private groupService: GroupService,
        private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.subscription = this.activatedRoute.params.subscribe(
            (param: any) => this.groupService.setProjectId(param['id'])
        );

        this.groupService.getGroups().subscribe(
            (groups: Group[]) => {
                this.groups = groups;
            }
        );
    }

    onOpenModal() {
      this.groupService.groupModalEvent.emit({
        isOpen: true,
        isAdd: true
      });
    }

    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
}