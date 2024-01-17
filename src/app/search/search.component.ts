import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../ApiService/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AuthenComponent } from '../authen/authen.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Subscription } from 'rxjs';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CreateComponent } from './create/create.component';
import { SocketService } from '../ApiService/socket.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatButtonModule, MatProgressSpinnerModule, FormsModule, 
     CommonModule, MatIconModule, MatMenuModule, MatTooltipModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit, OnDestroy{
  groupName!: string;
  publicGroup!: boolean;

  groupCreated: boolean = false;
  groupId!: string;
  messages: any[] = [];

  private groupFoundSubscription!: Subscription;
  groupForm = this.builder.group({
    roomId: ['', Validators.required]
  });
  waiting!: boolean;

  constructor(private service: ApiService, private toastr: ToastrService, private router: Router, 
    private dialog: MatDialog, private builder: FormBuilder, private socket: SocketService, ){
    this.waiting = false;
  }
  ngOnInit(): void {
    this.groupFoundSubscription = this.socket.receiveGroupFound().subscribe((data) => {
      this.messages.push(data); 
    });
  }
  async Find() {
    if(await this.service.isAuthenticated()){
      if(this.groupForm.value.roomId?.trim()){
        this.waiting = !this.waiting;
        (await this.service.FindGroup(this.groupForm.value.roomId)).subscribe(
          (data: any) => {
            if(data.status === 'success'){
              this.service.SetGroupId(data.data.groupId);
              if (!data.data.public) {
                this.checkPrivateGroup(data.data.groupId);
              }
              else
                this.router.navigate(['/chat']);
            } else {
              this.toastr.info(data.message, "Lỗi");
              return;
            }
          }, (error: any) => {
            this.waiting = !this.waiting;
            this.toastr.error("Lỗi: "+ error);
            return;
          }
        )
      } else {
        this.toastr.info("Không tìm thấy phòng");
      }
    } else {
      this.toastr.info("Hãy đăng nhập trước khi vào phòng");
      this.login();
    }
  }
  checkPrivateGroup(groupId: any) {
    this.toastr.info("Đang gửi yêu cầu vào phòng","Thông báo");
    this.socket.findGroup(groupId);
  }
  createGroup() {
    if(this.service.isAuthenticated()){
      this.dialog.open(CreateComponent, {
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '600ms',
        width: '30%',
        height: '20%',
        minWidth: '300px',
        minHeight: '200px'
      });
    } else {
      this.toastr.info("Hãy đăng nhập trước khi tạo phòng");
      this.login();
    }
  }
  GetWaiting(): boolean {
    return this.waiting;
  }
  login() {
    this.dialog.open(AuthenComponent, {
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '600ms',
      width: '30%',
      height: '53%',
      minWidth: '300px',
      minHeight: '300px'
    });
  }


  ngOnDestroy(): void {
   this.groupFoundSubscription.unsubscribe();
  }
}
