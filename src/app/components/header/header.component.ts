import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge'
import { MenuComponent } from "../menu/menu.component";
import { RouterLink } from '@angular/router';
import { CartService } from '../../Services/cart.service';
@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    imports: [MatIconModule, MatBadgeModule, MenuComponent,RouterLink]
})
export class HeaderComponent implements OnInit {

    totalQuantity: number = 0;
    constructor(private CartService:CartService) { }
    ngOnInit(): void {
        this.CartService.totalQuantity$.subscribe(totalQuantity => {
            this.totalQuantity = totalQuantity;
        });
    }


}
