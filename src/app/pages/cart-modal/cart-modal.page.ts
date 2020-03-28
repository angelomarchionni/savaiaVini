import { Product, CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.page.html',
  styleUrls: ['./cart-modal.page.scss'],
  
})
export class CartModalPage implements OnInit {
 
  cart: Product[] = [];
 
   constructor(private router: Router,private cartService: CartService, private modalCtrl: ModalController, private alertCtrl: AlertController) { }
  
  ngOnInit() {
    this.cart = this.cartService.getCart();
  }
 
  decreaseCartItem(product) {
    this.cartService.decreaseProduct(product);
  }
 
  increaseCartItem(product) {
    this.cartService.addProduct(product);
  }
 
  removeCartItem(product) {
    this.cartService.removeProduct(product);
  }
 // totale come euro
  getTotal() {
     return this.cart.reduce((i, j) => i + j.price * j.amount, 0);
   
  }
 
  close() {
    this.modalCtrl.dismiss();
  }
 
  async checkout() {
    // Perfom PayPal or Stripe checkout process
     this.router.navigate(['/pagamento'],
          {queryParams: {totaleGenerale: "pippo", test: "pluto"}});
          this.modalCtrl.dismiss();
     /*    
    let alert = await this.alertCtrl.create({
      header: 'Thanks for your Order!',
      message: 'We will deliver your food as soon as possible',
      buttons: ['OK']
    });
    alert.present().then(() => {
      this.modalCtrl.dismiss();
    });
    */
  }
}
