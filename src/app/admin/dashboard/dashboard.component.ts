import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import { UsersComponent } from "../users/users.component";
@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [CommonModule, MatTabsModule, UsersComponent]
})
export class DashboardComponent {
  constructor(private authService: AuthService) {}
  

  
}
