import { MenuService } from './../../../shared/services/menu.service';
import { DropdownItem } from './../../../shared/dropdown/dropdown-item.model';
import { NotificationService } from './../../../shared/notification/notification.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Group } from './../../../shared/models/group.model';
import { GroupService } from './../../../shared/services/group.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.css']
})
export class GroupItemComponent implements OnInit {
  @Input() group: Group;
  myForm: FormGroup;
  dropdownActions: DropdownItem[] = [
    new DropdownItem('Ajouter une carte', false, this.onOpenMenu.bind(this)),
    new DropdownItem('Copier la liste', false),
    new DropdownItem('Déplacer la liste', false),
    new DropdownItem('S\'abonner', false),
    new DropdownItem('Déplacer toutes les cartes', true),
    new DropdownItem('Archiver toutes les cartes', false),
    new DropdownItem('Archiver cette liste', true),
  ];

  constructor(private groupService: GroupService,
      private router: Router,
      private route: ActivatedRoute,
      private notificationService: NotificationService,
      private menuService: MenuService) {
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
      }
    }

    onOpenMenu() {
      this.menuService.menuGroup = this.group;
      this.router.navigate(['./add-card'],  {relativeTo: this.route});
      this.menuService.menuEvent.emit(true);
    }

}