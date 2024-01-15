import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthenComponent } from './authen/authen.component';
import { SearchComponent } from './search/search.component';
import { SettingComponent } from './setting/setting.component';
import { UsersComponent } from './users/users.component';
import { ChatComponent } from './chat/chat.component';
import { Verified } from './guard/verified.guard';
import { chatGuard } from './guard/chatguard.guard';

export const routes: Routes = [
    {'path':'', component:HomeComponent},
    {'path':'users', canActivate: [Verified], component:UsersComponent},
    {'path':'chat', canActivate: [Verified, chatGuard], component:ChatComponent},
    {'path':'authen', component:AuthenComponent},
    {'path':'searchroom', component:SearchComponent},
    {'path':'settings', canActivate: [Verified], component:SettingComponent},
];
