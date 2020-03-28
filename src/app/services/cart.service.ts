import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
 
export interface Product {
  id: number;
  name: string;
  price: number;
  amount: number;
  percorso: string;
  
}
@Injectable({
  providedIn: 'root'
})
export class CartService {
  data: Product[] = [
    { id: 0, name: 'Barbera D’Alba “Monforte d’alba” DOC – Cascina Merenda | Rotwein | Piemont', price: 14.16 , percorso:'https://www.madeinitaly.berlin/wp-content/uploads/2019/02/BarberaMonfalcoCASCINAMERENDA.jpg', amount: 0 },
    { id: 1, name: 'Franciacorta Satén DOCG – Lantieri | Spumante | Lombardei', price: 27.25, percorso:'https://www.madeinitaly.berlin/wp-content/uploads/2015/10/LantieriSate%CC%80n-300x300.jpg',amount: 0 },
    { id: 2, name: 'Grillo IGT – Bacaro | Weißwein | Sizilien', price: 8.91, percorso:'https://www.madeinitaly.berlin/wp-content/uploads/2015/11/GrilloBacaroMenu-300x300.jpg',amount: 0 },
    { id: 3, name: 'Beneventano Aglianico IGT – Vesevo | Rotwein | Kampanien', price: 6.55, percorso:'https://www.madeinitaly.berlin/wp-content/uploads/2015/10/AglianicoPipoliWEB-300x300.jpg',amount: 0 }
  ];
 
  private cart = [];
  private cartItemCount = new BehaviorSubject(0);
 
  constructor() {}
 
  getProducts() {
    return this.data;
  }
 
  getCart() {
    return this.cart;
  }
 
  getCartItemCount() {
    return this.cartItemCount;
  }
 
  addProduct(product) {
    let added = false;
    for (let p of this.cart) {
      if (p.id === product.id) {
        p.amount += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      product.amount = 1;
      this.cart.push(product);
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }
 
  decreaseProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        p.amount -= 1;
        if (p.amount == 0) {
          this.cart.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }
 
  removeProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        this.cartItemCount.next(this.cartItemCount.value - p.amount);
        this.cart.splice(index, 1);
      }
    }
  }
}
