import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthenComponent } from './authen/authen.component';
import { SearchComponent } from './search/search.component';
import { SettingComponent } from './setting/setting.component';
import { UsersComponent } from './users/users.component';
import { ChatComponent } from './chat/chat.component';

export const routes: Routes = [
    {'path':'', component:HomeComponent},
    {'path':'users', component:UsersComponent},
    {'path':'chat', component:ChatComponent},
    {'path':'authen', component:AuthenComponent},
    {'path':'searchroom', component:SearchComponent},
    {'path':'settings', component:SettingComponent},
];
