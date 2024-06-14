import { Component, OnInit } from '@angular/core';

import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { IProduct } from '../../interfaces/product';
import { CartService } from '../../Services/cart.service';
import { ICart } from '../../interfaces/cart';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [TableModule, TagModule, RatingModule, ButtonModule, CommonModule, RouterLink,MatIconModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cartItems!: ICart[];
  totalAmount: number = 0;
  constructor(private carService: CartService, private toastr: ToastrService) {}

  ngOnInit() {
    this.carService.getItemCart().subscribe((data=> {
      this.cartItems = data;
      this.calculateTotalAmount();
      this.saveCart();
    }));
  }


  getImageUrl(itemProduct:any):string{
    if(itemProduct && itemProduct.hinhAnh && itemProduct.hinhAnh.length > 0) {
      console.log(itemProduct.hinhAnh)
      let imgUrl = itemProduct.hinhAnh.trim();
      if(imgUrl.startsWith('http') || imgUrl.startsWith('/')){
        return imgUrl;
      } else {
        return 'https://localhost:7294/' + imgUrl;
      }
    }
    else {
      return 'path/to/placeholder-image.webp';
    }
  }

  removeItem(index: number) {
    this.carService.removeCartFormData(index);
    this.toastr.info('Đã xóa sản phẩm',"Thông báo", {
      timeOut:2000,
    })
    this.saveCart();
  }

  calculateTotalAmount() {
    this.totalAmount = this.cartItems.reduce(
      (total, item) => total + item.soLuong * item.gia,
      0
    );
  }

  saveCart() {
    const CartItemData = JSON.stringify({cartItems: this.cartItems});
    localStorage.setItem('check Out data ', CartItemData);
    console.log("Saved ",CartItemData)
  }

  // getSeverity(status: string) {
  //   switch (status) {
  //     case 'INSTOCK':
  //       return 'success';
  //     case 'LOWSTOCK':
  //       return 'warning';
  //     case 'OUTOFSTOCK':
  //       return 'danger';
  //   }
  // }
}
