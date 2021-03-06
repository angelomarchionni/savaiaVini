import { CartModalPageModule } from './pages/cart-modal/cart-modal.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { ModalController, AlertController } from '@ionic/angular'; 
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
 
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PayPal } from '@ionic-native/paypal/ngx';
import { HttpClientModule } from '@angular/common/http';
 
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, CartModalPageModule,HttpClientModule],
  //imports: [ModalController, AlertController,BrowserModule, IonicModule.forRoot(), AppRoutingModule, CartModalPageModule,HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    ModalController,
    AlertController,
    PayPal,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
