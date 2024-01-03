import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatMenuModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

}
