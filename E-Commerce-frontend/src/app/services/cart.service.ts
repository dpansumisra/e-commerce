import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];

  addToCart(product: any): void {
    const existingItem = this.cartItems.find(item => item.product.productID === product.productID);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({ product, quantity: 1 });
    }
  }

  removeFromCart(item: any): void {
    this.cartItems = this.cartItems.filter(cartItem => cartItem.product.productID !== item.product.productID);
  }

  updateQuantity(product: any): void {
    const existingItem = this.cartItems.find(item => item.product.productID === product.productID);
    if (existingItem) {
      existingItem.quantity = product.quantity;
    }
  }

  getCartItems(): any[] {
    return this.cartItems;
  }
}
