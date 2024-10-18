import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service'; // Assuming you have a product service
import { CartService } from '../services/cart.service'; // Service for cart management
import { DiscountService } from '../services/discount.service'; // Service for discount management
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-shopping-cart',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  products: any[] = []; // List of products fetched from the API
  cartItems: any[] = []; // Items added to the cart
  discountCode: string = '';
  discountApplied: boolean = false;
  discountPercentage: number = 0;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private discountService: DiscountService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCart();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  loadCart(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
    this.loadCart(); // Refresh cart items
  }

  removeFromCart(item: any): void {
    this.cartService.removeFromCart(item);
    this.loadCart(); // Refresh cart items
  }

  updateQuantity(product: any): void {
    this.cartService.updateQuantity(product);
  }

  getTotalValue(): number {
    return this.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  applyDiscount(): void {
    this.discountService.validateDiscount(this.discountCode).subscribe(discount => {
      if (discount) {
        this.discountApplied = true;
        this.discountPercentage = discount.discountPercentage; // Assuming discount is an object with percentage
      } else {
        alert('Invalid discount code');
      }
    });
  }

  getTotalValueAfterDiscount(): number {
    const total = this.getTotalValue();
    return total - (total * this.discountPercentage);
  }
}
