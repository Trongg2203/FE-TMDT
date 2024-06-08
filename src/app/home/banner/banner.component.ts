import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [NgbCarouselModule,CommonModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent {

images:string[] = [
  '../../../assets/slider1.webp',
  '../../../assets/slider1-copy.webp'
]

}
