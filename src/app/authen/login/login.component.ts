import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../ApiService/api.service';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthenComponent } from '../authen.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule,
            MatIconModule  
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  hide = true;
  loginform = this.builder.group({
    email: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  })

  constructor(private builder: FormBuilder, private toastr: ToastrService, private service: ApiService,
    private dialogRef: MatDialogRef<AuthenComponent>, private location: Location, private router: Router,
    ){

  }

  async login(){
    if(this.loginform.valid){
      (await this.service.Login(this.loginform.value)).subscribe(
        async (data: any) => {
          if(data.status === 'success'){
            const mes = data.message;
            await this.service.SetToken(data.token);
            this.dialogRef.close();
            this.toastr.success(mes,'Thông báo',{
              timeOut: 1000
            });
            var previousState = this.service.GetOldPath();
            if(previousState){
              this.service.RemoveOldPath();
            }
            this.router.navigateByUrl(previousState);
          } else {
            this.toastr.error("Lỗi: " + data.message);
          }
        }, (data: any) => {
          this.toastr.error(data.error.message, "Thông báo");
        }
      )
    }
  }
}
