import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SocketService } from '../../ApiService/socket.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ApiService } from '../../ApiService/api.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule, MatSlideToggleModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit, OnDestroy{
  creategroupform = this.builder.group({
    groupName: this.builder.control('Nhóm chat vui vẻ', [Validators.required]) ,
    publicGroup: this.builder.control(true, )
  });
  groupCreated: boolean = false;
  groupId!: string;
  groupCreatedSubscription!: Subscription;

  constructor(private builder: FormBuilder, private socket: SocketService, private toastr: ToastrService,
    private router: Router, private service: ApiService){
    
  }

  ngOnInit(): void {
    this.groupCreatedSubscription = this.socket.receiveGroupCreated().subscribe((data) => {
      this.service.SetGroupId(data.groupId);
    });
  }
  async submit(){
    if(this.creategroupform.valid){
      this.socket.createGroup(this.creategroupform.value);
      this.toastr.info("Đang vào phòng..");
      this.toastr.success("Đã tạo phòng");

      // setTimeout(() => {
      //   this.router.navigate(['/chat'])
      // }, 700)
    }
  }

  ngOnDestroy(): void {
    this.groupCreatedSubscription.unsubscribe();
  }
}
