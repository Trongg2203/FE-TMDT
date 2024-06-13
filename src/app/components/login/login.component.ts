import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatIconModule, ReactiveFormsModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr:ToastrService
  ) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }


  login() {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe({
        next: (response) => {
          if (response.statusCode === 200) {
            this.toastr.success('Đăng nhập thành công', 'Thành Công', {
              timeOut: 2000
            });
            this.router.navigate(['/']);
          } else {
            this.toastr.error('Sai tài khoản hoặc mật khẩu', 'Lỗi', {
              timeOut: 2000
            });
          }
        },
        error: (err) => {
          this.toastr.error('Sai tài khoản hoặc mật khẩu', 'Lỗi', {
            timeOut: 2000
          });
          console.log(err);
        }
      });
    } else {
      this.toastr.error('Vui lòng điền đầy đủ thông tin', 'Lỗi', {
        timeOut: 2000
      });
    }
  }
}
