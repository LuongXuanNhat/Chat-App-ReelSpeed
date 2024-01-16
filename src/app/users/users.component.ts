import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { ApiService } from '../ApiService/api.service';
import { FormBuilder } from '@angular/forms';
import { SocketService } from '../ApiService/socket.service';
import { ToastrService } from 'ngx-toastr';
import { GroupInfo, User } from '../../model/model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatMenuModule, MatIconModule, MatButtonModule,
    MatTooltipModule, CommonModule, ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  userId: string = '';
  groupId: string = '';
  users!: User[];
  host: string = '';

  constructor(private service: ApiService, private builder: FormBuilder, private socket: SocketService, private toastr: ToastrService,
    private router: Router){
      this.GetGroupInfor();
      this.userId = service.GetUserId();
      this.groupId = service.GetGroupId();
  }

  GetGroupInfor(){
    if(this.service.GetGroupId()){
      this.service.GetUserGroup(this.service.GetGroupId()).subscribe(
        (data: any) => {
          if(data.status === 'success'){
            this.users = data.data;
            this.host = data.host._id;
            this.insertsPath();
          } else {
            this.toastr.error(data.message, "Lỗi");
          }
        }, (error: any) => {
          this.toastr.error(error, "Lỗi");
        }
      )
    }
  }

  insertsPath() {
    this.users.forEach(element => {
      if(element.avatar){
        element.avatar = this.service.GetApi() + element.avatar;
      }
    });
  }
}
