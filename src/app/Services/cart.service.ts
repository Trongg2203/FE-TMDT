import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/product';
import { BehaviorSubject } from 'rxjs';
import { ICart } from '../interfaces/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: ICart[] = [];
  private CartItemSubject = new BehaviorSubject<ICart[]>([]);

  constructor() {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
    }
    this.CartItemSubject.next(this.cartItems);
  }

  getItemCart() {
    return this.CartItemSubject.asObservable();
  }

  addItemToCart(product: ICart) {
    const existingProductIndex = this.cartItems.findIndex(
      (item) =>
        item.idHangHoa === product.idHangHoa &&
        item.mauSac === product.mauSac &&
        item.size === product.size
    );
  
    if (existingProductIndex !== -1) {
      this.cartItems[existingProductIndex].soLuong += product.soLuong;
    } else {
      this.cartItems.push(product);
    }
  
    this.CartItemSubject.next(this.cartItems);
    this.saveCartToLocalStorage();
  }

  
  removeCartFormData(index:number) {
    this.cartItems.splice(index,1);
    this.CartItemSubject.next(this.cartItems);
    this.saveCartToLocalStorage();
  }
  inCrease(index:number) {
    const product = this.cartItems[index];
    if(product.soLuong < product.soLuong) {
      product.soLuong ++;
      this.CartItemSubject.next(this.cartItems);
      this.saveCartToLocalStorage();
    }
  }
  deCrease(index:number) {
    const product = this.cartItems[index];
    if(product.soLuong > 1) {
      product.soLuong --;
      this.CartItemSubject.next(this.cartItems);
      this.saveCartToLocalStorage();
    }
  }

  private saveCartToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
}
