import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge'
import { MenuComponent } from "../menu/menu.component";
@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    imports: [MatIconModule, MatBadgeModule, MenuComponent]
})
export class HeaderComponent {

}
