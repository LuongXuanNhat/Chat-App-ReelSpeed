import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../ApiService/api.service';
import { Dialog } from '@angular/cdk/dialog';
import { AuthenComponent } from '../authen.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmemail',
  standalone: true,
  imports: [ ReactiveFormsModule, MatInputModule, FormsModule, MatButtonModule, CommonModule],
  templateUrl: './confirmemail.component.html',
  styleUrl: './confirmemail.component.css'
})
export class ConfirmemailComponent {
  confirm: any;

  confirmform = this.builder.group({
    email: this.builder.control('', Validators.required),
    otp: this.builder.control('', [Validators.required, Validators.minLength(6), Validators.maxLength(6) ])
  })
  constructor(private toastr: ToastrService, private service: ApiService, private builder: FormBuilder,
     private dialogRef: MatDialogRef<ConfirmemailComponent>, private dialog: MatDialog){

  }
  async ConfirmEmail() {
    this.confirmform.patchValue({
      email: this.service.GetEmail(),
      otp: this.confirm
    })
    if(this.confirmform.valid){
      (await this.service.ConfirmEmail(this.confirmform.value)).subscribe(
        (data: any) => {
          console.log(data);
          if(data.status === 'success'){
            this.service.SetToken(data.token);
            this.dialogRef.close();
            this.toastr.success(data.message);
            this.toastr.success("Đăng nhập thành công");

          } else {
            this.toastr.error("Lỗi: " + data.message);
          }
        }, (error: any) => {
          this.toastr.error("Lỗi: "+ error);
        }
      )
    } else {
      this.toastr.warning("Lỗi thiếu thông tin xác thực! Vui lòng thử lại");
    }
  }
}
