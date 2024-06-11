import { Component, OnInit } from '@angular/core';
import { ListProductsService } from '../Services/list-products.service';
import { IProduct } from '../interfaces/product';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule, SkeletonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  itemProduct!: IProduct;
  id!: number;
  soLuong:number = 1 ;
  isLoading: boolean = true;
  constructor(private ProductServices: ListProductsService, private activateRoute: ActivatedRoute,) {}
  ngOnInit(): void {
    this.activateRoute.params.subscribe((par)=>{
      // lấy id thừ searchParams để gán vô id trong api
      this.id = par['idHangHoa'];
      this.getProductById(this.id);

    })
  }

  getProductById(id: number) {
    this.ProductServices.getProductById(id).subscribe((data) => {
      this.itemProduct = data;
      this.isLoading = false;
    });
  }

  getImageUrl(itemProduct:IProduct):string{
    if(itemProduct && itemProduct.hinhAnh && itemProduct.hinhAnh.url ){
      let imgUrl = itemProduct.hinhAnh.url.trim();
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

  // tang giam 
  increaseSoLuong(){
    if(this.soLuong < this.itemProduct.soLuong){
      this.soLuong++;
    }else {
      this.soLuong = this.itemProduct.soLuong;
    }
  }
  decreaseSoLuong(){
    if(this.soLuong > 1){
      this.soLuong--;
    }
  }
}
