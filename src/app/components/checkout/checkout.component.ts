import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CommonModule } from '@angular/common';
import { ICart, ProductCart } from '../../interfaces/cart';
import { CartService } from '../../Services/cart.service';
import { CheckoutService } from '../../Services/checkout.service';
import { Subscription, forkJoin } from 'rxjs';
import { AuthService } from '../../Services/auth.service';
import { UserService } from '../../Services/user.service';
import { IUserDetail } from '../../interfaces/user';
import { IOrderDetails, IPostHoaDonXuat } from '../../interfaces/checkout';
import { OrderDetailRequest } from '../../interfaces/checkout-response';
import { IOrderDetailRequest } from '../../interfaces/orderDetail-request';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
    InputTextModule,
    FormsModule,
    FloatLabelModule,
    InputTextareaModule,
    ReactiveFormsModule,
  ],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  totalAmount = 0
  productService = inject(CartService);
  authService = inject(AuthService);
  orderService = inject(CheckoutService);
  fb = inject(FormBuilder);
  router = inject(Router);
  items!: Array<ProductCart>;
  UserDetail$ = this.authService.getDetail();
  addBillForm!: FormGroup;
  idNg: string = '';
  idHd: string = '';
  sanpham!: IOrderDetailRequest;
  private getCartItems: Subscription;

  constructor() {
    this.getCartItems = new Subscription();
  }

  ngOnInit(): void {
    // this.getCartItems = this.cartService.getItemCart().subscribe((data) => {
    //   this.cartItems = data;
    //   this.calculateTotalAmount();
    //   this.isEmptyCart = this.cartItems.length === 0;
    // });
    this.UserDetail$.subscribe(
      user => {
        if (user) {
          this.idNg = user.id;
          console.log("User Id : ", this.idNg);
          this.idHd = this.unique(30);
          console.log("Id HD: ", this.idHd);
          this.initializeForm();
        } else {
          console.log("User not authenticated");
          this.router.navigate(['/login']);
        }
      },
      error => {
        console.error("Error fetching user details:", error);
        if (error.status === 401) {
          this.router.navigate(['/login']);
        }
      }
    );
    // this.calculateTotalAmount();
  }

  ngOnDestroy(): void {
    this.getCartItems.unsubscribe();
  }

  unique(numchracter :number){
    let str:string='';
    const characters  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for(let i =0; i< numchracter ; i++){
      var ramdom = Math.floor(Math.random() * characters.length)
      str += characters.charAt(ramdom);
    }
    return str;
  }

  initializeForm(): void {
    this.addBillForm = this.fb.group({
      idHoaDon:[this.idHd,[Validators.required]],
      phone: ['', [Validators.required]],
      diaChi: ['', [Validators.required]],
      ghiChu: ['', [Validators.required]],
      idUser: [this.idNg, [Validators.required]],
    });
    this.items = this.productService.getCartItems();
    console.log('kkkk' ,this.items)
    console.log("Form value:", this.addBillForm.value);
  }

  addOrderDetail() {
    for (let i = 0; i < this.items.length; i++) {
      const sanpham = {
        idXuatHangHoa: this.idHd,
        idHangHoa: this.items[i].IdHangHoa,
        soLuong: this.items[i].soLuong,
        tongGia: this.items[i].TongGia,
        gia: this.items[i].gia,
      };
  
      console.log(sanpham);
  
      this.orderService.addBillinfor(this.sanpham).subscribe(
        (response: any) => {
          this.productService.remmoveCartItem(this.items[i].IdHangHoa);
          console.log(response);
        },
        (error: any) => {
          console.log(error);
        }
      );
    }

    this.productService.clearCart();
  }
  
  isOrder() {
    console.log('ẻtyeu',this.addBillForm.value);

    this.orderService.addbill(this.addBillForm.value).subscribe({
      next: Response=>{
        this.addOrderDetail();
        alert("them bill thanh cong "+Response);
        this.router.navigate(['/']);
      },
      error: error =>{
        alert("them bill that bai "+error);
        console.log("them bill that bai "+error)
        this.router.navigate(['cart']);
      }
    });
  }
  // calculateTotalAmount() {
  //   const productTotal = this.items.reduce(
  //     (total, item) => total + item.soLuong * item.gia,
  //     0
  //   );
  //   this.totalAmount = productTotal + 30000; // Adding the fixed shipping cost
  // }

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
}
