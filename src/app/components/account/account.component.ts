import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { CommonModule } from '@angular/common';
import { CheckoutService } from '../../Services/checkout.service';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [RouterLink, CommonModule, DecimalPipe, FormsModule, NgbTypeaheadModule, NgbPaginationModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent implements OnInit {

  currentSection: string = 'orders';
  ListOrder!: any[];
  idUser = '';
  paginatedOrders: any[] = [];
  // Pagination 
  page = 1;
  pageSize = 4;
  collectionSize = 0

  constructor(
    private checkoutService: CheckoutService,
    private userService: UserService,
    private router: ActivatedRoute
  ) {}

  UserDetail$ = this.userService.getUserById();

  ngOnInit(): void {
    this.router.params.subscribe((param) => {
      this.idUser = param['idUser'];
      this.getOrder();
    });
  }

  getOrder() {
    this.checkoutService.getOrder().subscribe((data) => {
      this.ListOrder = data;
      this.PriceToTal(this.ListOrder);
      this.collectionSize = this.ListOrder.length;
      this.refreshOrders();
    });
  }

  PriceToTal(orders: any[]) {
    let total: number[] = [];
    let priceTotal = 0;
    orders.forEach((order: { thongTinXuats: any[] }) => {
      order.thongTinXuats.forEach((item: any) => {
        priceTotal += item.tongGia;
      });
      total.push(priceTotal);
    });
  }

  showSection(section: string) {
    this.currentSection = section;
  }

  refreshOrders(){
    this.paginatedOrders = this.ListOrder?.map((order,i) =>({id:i+1,...order}))
    .slice((this.page - 1) * this.pageSize,(this.page -1) * this.pageSize + this.pageSize)
  }
}
