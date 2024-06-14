import { Component, OnInit } from '@angular/core';
import { ListProductsService } from '../Services/list-products.service';
import { IProduct } from '../interfaces/product';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SkeletonModule } from 'primeng/skeleton';
import { CartService } from '../Services/cart.service';
import { ICart } from '../interfaces/cart';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule, SkeletonModule, RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  itemProduct!: IProduct;
  itemtoCart!: ICart;
  id!: number;
  soLuong: number = 1;
  isLoading: boolean = true;
  constructor(
    private ProductServices: ListProductsService,
    private cartService: CartService,
    private activateRoute: ActivatedRoute,
    private toastr:ToastrService
  ) {}
  ngOnInit(): void {
    this.activateRoute.params.subscribe((par) => {
      // lấy id thừ searchParams để gán vô id trong api
      this.id = par['idHangHoa'];
      this.getProductById(this.id);
      this.itemtoCart = par['idHangHoa'];
    });
  }

  getProductById(id: number) {
    this.ProductServices.getProductById(id).subscribe((data) => {
      // console.log("aa ", data )
      this.itemProduct = data;
      this.isLoading = false;
    });
  }

  getImageUrl(itemProduct: IProduct): string {
    if (itemProduct && itemProduct.hinhAnh && itemProduct.hinhAnh.length > 0) {
      console.log(itemProduct.hinhAnh);
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

  // tang giam
  increaseSoLuong() {
    if (this.soLuong < this.itemProduct.soLuong) {
      this.soLuong++;
    } else {
      this.soLuong = this.itemProduct.soLuong;
    }
  }
  decreaseSoLuong() {
    if (this.soLuong > 1) {
      this.soLuong--;
    }
  }
  // them san pham vao giỏ hàng
  addToCart() {
    const product: ICart = {
      idHangHoa: this.itemProduct.idHangHoa,
      tenHangHoa: this.itemProduct.tenHangHoa,
      hinhAnh: this.itemProduct.hinhAnh,
      gia: this.itemProduct.gia,
      soLuong: this.soLuong,
      mauSac: this.itemProduct.mauSac,
      size: this.itemProduct.size,
    };
    this.toastr.success("Đã thêm sản phẩm thành công","Đã thêm", {
      timeOut: 2000
    })
    this.cartService.addItemToCart(product);
  }
}
