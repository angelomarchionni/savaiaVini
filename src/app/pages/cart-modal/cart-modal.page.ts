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
    // metto in una stringa unica il contenuto del carrello che poi passero' come parametro

    var obj = {};
    
    //var jsonString= JSON.stringify(obj);




    
var i;
for ( i=0; i<this.cart.length; i++)
{
  
   obj [i]= { nomeVino: this.cart[i].name, numeroVino: this.cart[i].amount }; 

}
var jsonString= JSON.stringify(obj);
console.log(JSON.parse(jsonString));



    // Perfom PayPal or Stripe checkout process
     this.router.navigate(['/pagamento'],
          {queryParams: {totaleGenerale: this.getTotal(), test: jsonString}});
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
