import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from "./product-list/product-list.component";
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { NavbarComponent } from "./navbar/navbar.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, ProductListComponent, NavbarComponent, ShoppingCartComponent]
})
export class AppComponent {
  title = 'E-Commerce-frontend';
}
