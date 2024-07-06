import { Component, inject, TemplateRef } from '@angular/core';

import {
  NgbDatepickerModule,
  NgbOffcanvas,
  OffcanvasDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { ItemmenuComponent } from './itemmenu/itemmenu.component';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth.service';
import { filter } from 'rxjs';
@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  imports: [
    NgbDatepickerModule,
    MatIconModule,
    ItemmenuComponent,
    RouterLink,
    CommonModule,
  ],
})
export class MenuComponent {
  private offcanvasService = inject(NgbOffcanvas);
  private authService = inject(AuthService);
  private router = inject(Router);
  closeResult = '';
  idUser: string | null = null;
  ngOnInit() {
    this.authService.checkAuthStatus();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.authService.checkAuthStatus();
        this.idUser = this.authService.getUserDetail()?.id || null;
      });
  }

  open(content: TemplateRef<any>) {
    this.offcanvasService
      .open(content, { ariaLabelledBy: 'offcanvas-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case OffcanvasDismissReasons.ESC:
        return 'by pressing ESC';
      case OffcanvasDismissReasons.BACKDROP_CLICK:
        return 'by clicking on the backdrop';
      default:
        return `with: ${reason}`;
    }
  }

  get isLoggedIn$() {
    return this.authService.isLoggedIn$;
  }

  logout() {
    this.authService.logOut();
    this.router.navigate(['/']);
  }
}
