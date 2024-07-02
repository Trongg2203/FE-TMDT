import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../Services/cart.service';
import { AuthService } from '../../Services/auth.service';
import { ICart } from '../../interfaces/cart';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    TagModule,
    RatingModule,
    ButtonModule,
    RouterModule,
    MatIconModule
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems!: ICart[];
  totalAmount: number = 0;
  totalQuantity: number = 0;

  constructor(
    private cartService: CartService,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.cartService.getItemCart().subscribe((data) => {
      this.cartItems = data;
      this.calculateTotalAmount();
      this.saveCart();
    });

    this.cartService.totalQuantity$.subscribe((totalQuantity) => {
      this.totalQuantity = totalQuantity;
    });
  }

  getImageUrl(itemProduct: any): string {
    if (itemProduct && itemProduct.hinhAnh && itemProduct.hinhAnh.length > 0) {
      let imgUrl = itemProduct.hinhAnh.trim();
      if (imgUrl.startsWith('http') || imgUrl.startsWith('/')) {
        return imgUrl;
      } else {
        return 'https://localhost:7294/' + imgUrl;
      }
    } else {
      return 'path/to/placeholder-image.webp';
    }
  }

  removeItem(index: number) {
    this.cartService.removeCartFormData(index);
    this.toastr.info('Đã xóa sản phẩm', 'Thông báo', {
      timeOut: 2000,
    });
    this.saveCart();
  }

  calculateTotalAmount() {
    this.totalAmount = this.cartItems.reduce((total, item) => total + item.soLuong * item.gia, 0);
  }

  saveCart() {
    this.cartService.saveCartToLocalStorage();
  }

  isLoggedIn() {
    const isLogged = this.authService.isLoggedIn();
    if (isLogged) {
      this.router.navigate(['/checkout']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}