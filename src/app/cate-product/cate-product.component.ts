import { Component, OnInit } from '@angular/core';
import { CartService } from '../Services/cart.service';
import { ICart } from '../interfaces/cart';
import { IProduct } from '../interfaces/product';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';
import { CommonModule } from '@angular/common';
import { CateProductService } from '../Services/cate-product.service';

@Component({
  selector: 'app-cate-product',
  standalone: true,
  imports: [RouterLink, SkeletonModule, CommonModule],
  templateUrl: './cate-product.component.html',
  styleUrl: './cate-product.component.scss'
})
export class CateProductComponent implements OnInit {
  //truyền id vao getProductByIdCate
  id!:number;

  //tao gtri để ref den gtri lấy dc trong service
  products!:IProduct[]
  // tao gtri de lay hinh anh
  itemProduct!:IProduct
  // loading
  isLoading: boolean = true;
  
  constructor(private CateProductService:CateProductService, private activateRoute: ActivatedRoute,) { }
  ngOnInit(): void {
    // ref từ searchParams đến apiUrl
    this.activateRoute.params.subscribe((param) => {
      this.id = param['idLoaiHangHoa'];
      this.getProductByIdCate(this.id);
    });
  }

  getProductByIdCate(id:number) {
    this.CateProductService.getProductByCategories(id).subscribe(response => {
      this.products = response
      this.isLoading = false;
    })
  }
  getImgProduct(itemProduct:IProduct):string{
    if(itemProduct && itemProduct.hinhAnh && itemProduct.hinhAnh.length > 0) {
      console.log(itemProduct.hinhAnh);
      let imgUrl = itemProduct.hinhAnh.trim();
      if(imgUrl.startsWith('http') || imgUrl.startsWith('/')){
        return imgUrl;
      } else {
        return 'https://localhost:7294/' + imgUrl;
      }
    } else {
      return 'path/to/placeholder-image.webp';
    }
  }
}
