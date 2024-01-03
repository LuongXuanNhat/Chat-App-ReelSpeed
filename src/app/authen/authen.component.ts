import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

@Component({
    selector: 'app-authen',
    standalone: true,
    templateUrl: './authen.component.html',
    styleUrl: './authen.component.css',
    imports: [MatTabsModule, RouterModule, LoginComponent, RegisterComponent]
})
export class AuthenComponent {

}
