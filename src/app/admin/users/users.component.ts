import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { IUserDetail } from '../../interfaces/user';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { catchError, Subscription, throwError } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  standalone: true,
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    DialogModule,
    InputTextModule,
    ReactiveFormsModule,
  ],
})
export class UsersComponent implements OnInit, OnDestroy {
  users: IUserDetail[] = [];
  // tao để dùng ngDestroy
  createUserSubscription!: Subscription;
  visible: boolean = false;
  position: string = 'center';
  form!: FormGroup;
  idUser!: number;
  constructor(private userService: UserService, private fb: FormBuilder, private toastr: ToastrService) {}
  ngOnInit(): void {
    this.handleGetAllUsers();
    
    this.initializeForm();
  }
  ngOnDestroy(): void {
    if(this.createUserSubscription){
      this.createUserSubscription.unsubscribe();
    }
  }
  handleGetAllUsers() {
    this.userService.getAllUsersService().subscribe((users) => {
      this.users = users;
    });
  }

  handleRemove(idUser: string) {
    this.userService.removeUserService(idUser).subscribe(
      () => {
        this.toastr.success('User deleted successfully', 'Success', {
          timeOut: 3000,
        });
        this.handleGetAllUsers(); // Refresh user list after deletion
      },
      (error) => {
        console.error('Failed to delete user:', error);
        this.toastr.error('Failed to delete user', 'Error', { timeOut: 3000 });
      }
    );
  }

  ShowModal(position: string) {
    this.position = position;
    this.visible = true;
  }

  initializeForm() {
    this.form = this.fb.group({
      emailAddress: ['', [Validators.required, Validators.email]],
      fullName: ['', [Validators.required]],
      role: ['', [Validators.required]],
    });
  }

  handleCreateUser(): void {
    if (this.form.valid) {
      this.createUserSubscription = this.userService
        .createUserService(this.form.value)
        .pipe(
          catchError((error) => {
            this.toastr.error('Failed to create user', 'Error', { timeOut: 3000 });
            return throwError(error);
          })
        )
        .subscribe(() => {
          this.toastr.success('User created successfully', 'Success', { timeOut: 3000 });
          this.form.reset();
          this.visible = false;
          this.handleGetAllUsers();
        });
    }
  }
}
