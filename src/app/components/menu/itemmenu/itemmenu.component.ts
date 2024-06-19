import { Component, OnInit } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import {MatExpansionModule} from '@angular/material/expansion';
import { ItemMenuService } from '../../../Services/item-menu.service';
import { IItemMenu } from '../../../interfaces/itemMenu';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-itemmenu',
  standalone: true,
  imports: [NgbAccordionModule,MatExpansionModule,CommonModule,RouterLink],
  templateUrl: './itemmenu.component.html',
  styleUrl: './itemmenu.component.scss'
})
export class ItemmenuComponent  implements OnInit {
  panelOpenState = false;
  
 

  nameItemService!:IItemMenu[];
  constructor(private ItemMenuServices: ItemMenuService ){}
  ngOnInit(): void {
    this.getNameItemMenu();
  }
  getNameItemMenu() {
    this.ItemMenuServices.getAllLoaiHoangHoa().subscribe((data) => {
      this.nameItemService = data;
    })
  }
}

