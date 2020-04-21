import { CartService, Prodotti, SearchType } from './../services/cart.service';
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
  scelta:string;
  productsArray = [];
  products= [];
  public productsArray1: Prodotti[];
  responseData1:string;
  type: SearchType = SearchType.all;


  @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;
 
  constructor(private cartService: CartService, private modalCtrl: ModalController) {}
 
  ngOnInit() {
   
   // type: SearchType = SearchType.;
  // this.prodotto = this.cartService.getNotifications();
  // this.cartService.getNotifications().subscribe(data => this.productsArray = data);
  this.cartService.getNotifications('s').subscribe(data => {


  this.productsArray1 = data;
 
  });


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


  searchChanged() {
    console.log('clicco alla ricerca' + this.type);
    const tipologiaVino = this.type;
    this.cartService.getNotifications(tipologiaVino).subscribe(data => {


      this.productsArray1 = data;
     
      });
  }



}