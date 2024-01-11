import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_ERROR, MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Toast, ToastrModule, ToastrService } from 'ngx-toastr';
import { ApiService } from '../../ApiService/api.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthenComponent } from '../authen.component';
import { ConfirmemailComponent } from '../confirmemail/confirmemail.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, ReactiveFormsModule, MatIconModule,
            MatInputModule, ToastrModule, CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  hide = true;
  registerform = this.builder.group({
    fullname: this.builder.control('', [Validators.required, Validators.minLength(6)]),
    email: this.builder.control('', [Validators.required, Validators.email]),
    password: this.builder.control('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/),
    ]),
    confirm: this.builder.control('', Validators.required)
  })

  constructor(private builder: FormBuilder, private toastr: ToastrService, private service: ApiService, 
    private dialog: MatDialog, private dialogRef: MatDialogRef<AuthenComponent>){

  }

  async register(){
    if(this.registerform.valid){
      if(this.registerform.value.password === this.registerform.value.confirm){
        (await this.service.Register(this.registerform.value)).subscribe(
          (res: any) => {
            if(res.status === 'success'){
              this.dialogRef.close();
              this.toastr.success('Vui lòng nhập mã xác nhận được gửi đến email của bạn', 'Đăng ký thành công');
              this.ConfirmEmail();
            }
          },
          (error: any) => {
            const message = error.error.message;
            if (message == null) {
              this.toastr.error("Lỗi kết nối đến server!");
            } else {
              this.toastr.error(message);
            }
          }
        );
      } else {
        this.toastr.warning('Mật khẩu không khớp!')
      }
      
    } else {
      const email = this.registerform.get('email') ?? null;
      const pass = this.registerform.get('password') ?? null;

      if (email && email.hasError('email')) {
        this.toastr.warning('Email không hợp lệ. Hãy nhập một địa chỉ email hợp lệ.');
      } else if (pass && pass.hasError('pattern')) {
        this.toastr.warning('Mật khẩu ít nhất phải có 6 ký tự và bao gồm: Hoa, thường, số và ký tự đặc biệt');
      } else {
        this.toastr.warning('Vui lòng nhập đầy đủ thông tin!');
      }

      
    }
  }
  ConfirmEmail() {
    this.service.SetEmail(this.registerform.get('email')?.value ?? '')
    this.dialog.open(ConfirmemailComponent, {
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '600ms',
      width: '50%',
      height: '30%',
      minWidth: '300px',
      minHeight: '300px'
    });
  }
}
