import { CartService, Prodotti } from './../services/cart.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartModalPage } from '../pages/cart-modal/cart-modal.page';
import { BehaviorSubject, Observable } from 'rxjs';
 
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  cart = [];
  //products = [];
  cartItemCount: BehaviorSubject<number>;
  prodotto: Observable<Prodotti>;
 
  productsArray = [];
  products= [];
  public productsArray1: Prodotti[];
  responseData1:string;


  @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;
 
  constructor(private cartService: CartService, private modalCtrl: ModalController) {}
 
  ngOnInit() {
   

  // this.prodotto = this.cartService.getNotifications();
  // this.cartService.getNotifications().subscribe(data => this.productsArray = data);
  this.cartService.getNotifications().subscribe(data => {


 // console.log("xx" + data[0].id);
  // this.responseData2 = data[1];
  this.productsArray1 = data;
  // alert(this.productsArray1[0].name);
  // this.responseData3 = data[2];
  });

  
   
   //console.log("test" + this.this.responseData1);
  
  // console.log("test" + this.productsArray1.length);
  //for (var product of this.productsArray1) {
    //console.log(product.id)
//}
    //this.products = this.cartService.getProductsA("ALL");
    this.cart = this.cartService.getCart();
    this.cartItemCount = this.cartService.getCartItemCount();
  }
 
  addToCart(product) {
    this.cartService.addProduct(product);
    this.animateCSS('tada');
  }
 
  async openCart() {
    this.animateCSS('bounceOutLeft', true);
 
    let modal = await this.modalCtrl.create({
      component: CartModalPage,
      cssClass: 'cart-modal'
    });
    modal.onWillDismiss().then(() => {
      this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft')
      this.animateCSS('bounceInLeft');
    });
    modal.present();
  }
 
  animateCSS(animationName, keepAnimated = false) {
    const node = this.fab.nativeElement;
    node.classList.add('animated', animationName)
    
    //https://github.com/daneden/animate.css
    function handleAnimationEnd() {
      if (!keepAnimated) {
        node.classList.remove('animated', animationName);
      }
      node.removeEventListener('animationend', handleAnimationEnd)
    }
    node.addEventListener('animationend', handleAnimationEnd)
  }
}