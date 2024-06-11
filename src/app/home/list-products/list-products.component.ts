import { Component, OnInit } from '@angular/core';
import { ListProductsService } from '../../Services/list-products.service';
import { IProduct, IProducts } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [CommonModule,MatCardModule,TooltipModule,InputTextModule,AnimateOnScrollModule],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss'
})
export class ListProductsComponent implements OnInit {

  tooltipOptions = {
    showDelay: 150,
    autoHide: false,
    tooltipEvent: 'hover',
    tooltipPosition: 'center',
};

  products: IProduct[] = [];
  
  constructor(private listProduct:ListProductsService) { }
  ngOnInit(): void {
    this.getListProducts();
  }

  getListProducts(): void {
    this.listProduct.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        console.log(">>>k ", this.products);
      },
      error: (err) => {
        console.error("Error fetching products: ", err);
      }
    });
  }
}
