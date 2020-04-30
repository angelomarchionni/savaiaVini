import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export enum SearchType {
  all = '',
  movie = 'movie',
  series = 'series',
  episode = 'episode',
  nonso = 'nonso',
  nonso1 = 'nonso1'

}
export enum SearchTypeAll {
  all = '',
  movie = 'movie',
  series = 'series',
  episode = 'episode',
  nonso = 'nonso',
  nonso1 = 'nonso1'
}



 // era interface
export interface Product {
  id: number;
  name: string;
  price: number;
  amount: number;
  percorso: string;
  
}

export interface Prodotti {
  id: number;
  name: string;
  price: number;
  amount: number;
  percorso: string;
  
}
export interface Email {
  idApprovazione: number;
  statusApprovazione: string;
  emailApprovazione: string;
  prodottiAcquistati: Prodotti;
  
  
}



@Injectable({
  providedIn: 'root'
})
export class CartService {
  url = 'http://www.fevisrl.it/workflow/includes/estraiJsonPerColore.php';
 // url = 'http://localhost/workflow/includes/estraiJsonPerColore.php';
 // urlUtenti = 'http://www.fevisrl.it/workflow/includes/estraiUltimaConnessioneUtente.php';
 urlUtenti = 'http://localhost/workflow/includes/estraiUltimaConnessioneUtente.php';
 urlEmail = 'http://www.fevisrl.it/workflow/includes/inviaEmail.php';
  urlPerStato = 'http://www.fevisrl.it/workflow/includes/estraiJsonPerStato.php';
   apiKey = 'b25fbb24'; // <-- Enter your own key here!

  /**
   * Constructor of the Service with Dependency Injection
   * @param http The standard Angular HttpClient to make requests
   */
  constructor(private http: HttpClient) { }


  data: Product[] = [
    { id: 0, name: 'Barbera D’Alba “Monforte d’alba” DOC – Cascina Merenda | Rotwein | Piemont', price: 14.16 , percorso:'https://www.madeinitaly.berlin/wp-content/uploads/2019/02/BarberaMonfalcoCASCINAMERENDA.jpg', amount: 0 },
    { id: 1, name: 'Franciacorta Satén DOCG – Lantieri | Spumante | Lombardei', price: 27.25, percorso:'https://www.madeinitaly.berlin/wp-content/uploads/2015/10/LantieriSate%CC%80n-300x300.jpg',amount: 0 },
    { id: 2, name: 'Grillo IGT – Bacaro | Weißwein | Sizilien', price: 8.91, percorso:'https://www.madeinitaly.berlin/wp-content/uploads/2015/11/GrilloBacaroMenu-300x300.jpg',amount: 0 },
    { id: 3, name: 'Beneventano Aglianico IGT – Vesevo | Rotwein | Kampanien', price: 6.55, percorso:'https://www.madeinitaly.berlin/wp-content/uploads/2015/10/AglianicoPipoliWEB-300x300.jpg',amount: 0 }
  ];
 
  private cart = [];
  private cartItemCount = new BehaviorSubject(0);
 allNotifications: Prodotti[]; 
  //NotificationDetail: Notification;  
 
  private notificationsUrl = 'assets/data/notification.json';  // URL to web api 
  private downloadsUrl = 'assets/data/download.json';  // URL to web api 
// per default estrae ultimi 5 inseriti
 urlNuovo = this.url + "?s=";

  getNotifications(tipoVino): Observable<Prodotti[]> { 
      
       //return this.allNotifications = this.NotificationDetail.slice(0);  
     return this.http.get<Prodotti[]>

(this.urlNuovo+tipoVino).pipe(map(res => this.allNotifications = res))
      } 
   
     
  
/*
  getDetails(title: string):Observable<any>{
    return this.http.get(`${this.url}?s=${encodeURI(title)}`).pipe(
    map(results => {
      return results['Search'];
    })
    );
  }
*/


   getUtenti() {
	  alert('prendo dati utenti');
    // return this.http.get(`${this.url}?i=${id}&plot=full`);
	 return this.http.get(`${this.urlUtenti}`);
  }
  
   searchDataUtenti(title: string): Observable<any> {
    return this.http.get(`${this.urlUtenti}?s=${encodeURI(title)}`).pipe(
    map(results => results['Search'])
    );
  }


  inviaEmail(ilForm:string,ilComprato:string,id:string,status1:string,email:string,totDaPagare:string): Observable<string> { 
      
    console.log("sono proprio nella funzione");
    
    return this.http.get(`${this.urlEmail}?s=${ilComprato}&prezzo=${totDaPagare}&id=${id}&status=${status1}&apikey=${email}&ilform=${ilForm}`).pipe(
    map(results => results['Search'])
    );
  

   }


  
   searchDataStato(title: string, type: SearchType): Observable<any> {
    return this.http.get(`${this.urlPerStato}?s=${encodeURI(title)}&type=${type}&apikey=${this.apiKey}`).pipe(
    map(results => results['Search'])
    );
  }


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
