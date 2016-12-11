import { MenuAddUsersComponent } from './../shared/menu/menu-add-users/menu-add-users.component';
import { MenuAddCardComponent } from './menu-add-card/menu-add-card.component';
import { MenuTitleComponent } from './../shared/menu/menu-title/menu-title.component';
import { menuRouting } from './menu.routing';
import { MenuSettingComponent } from './menu-setting/menu-setting.component';
import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  declarations: [
    MenuSettingComponent,
    MenuAddCardComponent,

    MenuTitleComponent,
    MenuAddUsersComponent
  ],
  imports: [
    SharedModule,
    menuRouting
  ]
})
export class MenuModule {

}