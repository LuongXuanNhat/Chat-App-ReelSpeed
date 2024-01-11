import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from 'express';
import { ToastrService } from 'ngx-toastr';
import { SocketService } from '../../ApiService/socket.service';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@Component({
  selector: 'app-create-group',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatButtonModule, MatSlideToggleModule],
  templateUrl: './create-group.component.html',
  styleUrl: './create-group.component.css'
})
export class CreateGroupComponent implements OnInit, OnDestroy{
  crategroupform = this.builder.group({
    groupName: this.builder.control('', [Validators.required]) ,
    publicGroup: this.builder.control(true, )
  });
  groupCreated: boolean = false;
  groupId!: string;
  private groupCreatedSubscription!: Subscription;
  
  constructor(private toastr: ToastrService, private router: Router, 
    private dialog: MatDialog, private socket: SocketService, private builder: FormBuilder){

  }
  ngOnInit(): void {
    this.groupCreatedSubscription = this.socket.receiveGroupCreated().subscribe((data) => {
      this.groupCreated = true;
      this.groupId = data.groupId; 
    });
  }
  async submit(){
    if(this.crategroupform.valid){
      this.socket.createGroup(this.crategroupform.value);
      this.toastr.info("Đang vào phòng..");
      this.toastr.success("Đã tạo phòng");
    }
  }

  ngOnDestroy(): void {
    this.groupCreatedSubscription.unsubscribe();
  }
}
