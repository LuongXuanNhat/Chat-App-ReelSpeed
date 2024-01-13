import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '../ApiService/api.service';
import { ToastrService } from 'ngx-toastr';
import { SocketService } from '../ApiService/socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [MatInputModule, ReactiveFormsModule, MatIconModule, MatButtonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  constructor(private service: ApiService, private builder: FormBuilder, private socket: SocketService, private toastr: ToastrService,
    private router: Router){
      this.GetGroupInfor();
  }

  GetGroupInfor(){
    if(this.service.GetGroupId()){
      this.service.GetGroupInfo(this.service.GetGroupId()).subscribe(
        (data: any) => {
          console.log(data);
        }, (error: any) => {
          this.toastr.error(error, "Lỗi");
        }
      )
    }
  }
}
