import { MenuAddCardComponent } from './menu-add-card/menu-add-card.component';
import { RouterModule } from '@angular/router';
import { MenuSettingComponent } from './menu-setting/menu-setting.component';

const MENU_ROUTES = [
    { path: '', component: MenuSettingComponent },
    { path: 'add-card', component: MenuAddCardComponent},
    { path: 'setting', component: MenuSettingComponent  },
];

export const menuRouting = RouterModule.forChild(MENU_ROUTES);