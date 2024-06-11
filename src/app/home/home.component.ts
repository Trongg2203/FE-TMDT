import { Component } from '@angular/core';
import { BannerComponent } from "./banner/banner.component";
import { ListProductsComponent } from "./list-products/list-products.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [BannerComponent, ListProductsComponent]
})
export class HomeComponent {

}
