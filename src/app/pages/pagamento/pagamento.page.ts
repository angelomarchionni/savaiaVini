import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl,FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { UsernameValidator } from '../validators/username.validator';
// import { PhoneValidator } from '../validators/phone.validator';
// import { PasswordValidator } from '../validators/password.validator';
import { CountryPhone } from './country-phone.model';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { formatCurrency } from '@angular/common';
import { ModalController, AlertController } from '@ionic/angular';
import { PayPal, PayPalPayment, PayPalConfiguration, PayPalPaymentDetails} from '@ionic-native/paypal/ngx';
import { async } from '@angular/core/testing';
import { CartService, Prodotti, SearchType } from './../../services/cart.service';





@Component({
  selector: 'app-form',
  templateUrl: './pagamento.page.html',
  styleUrls: ['./pagamento.page.scss'],
})
export class PagamentoPage implements OnInit {

  validations_form: FormGroup;
  matching_passwords_group: FormGroup;
  country_phone_group: FormGroup;
  totaleDaPagare:string;
  totaleDaPagareNumero:number;
  prezzoTrasporto:number;
  totaleCompresoTrasporto:string;
  totaleCompresoTrasportoNumero:number;
  dettagli:PayPalPaymentDetails;
  jsonConCiccia:string;
  //cartservice:CartService;
  //modalCtrl:ModalController;
// https://forum.ionicframework.com/t/solved-ionic-4-need-to-know-how-to-work-the-modal-controller/136414/4
  nomeSalvato:string;
  cognomeSalvato:string;
  indirizzoSalvato:string;
  cittaSalvata:string;
  statoSalvato:string;
  telefonoSalvato:string;
  codicePostaleSalvato:string;
  emailSalvata:string;

  paymentAmount: string = '';
  currency: string = 'EUR';
  currencyIcon: string = '€';



  countries: Array<CountryPhone>;
  genders: Array<string>;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController,
    private paypal: PayPal, 
    private alertCtrl: AlertController,
   // private shippingAddress: PayPalShippingAddress
   private cartservice: CartService,
    
  ) { }

  ngOnInit() {
    //  We just use a few random countries, however, you can use the countries you need by just adding them to this list.
    // also you can use a library to get all the countries from the world.
    console.log("sono nell init " + window.localStorage.getItem('citta'));
if(window.localStorage.getItem('nome'))
    this.nomeSalvato = window.localStorage.getItem('nome');
if(window.localStorage.getItem('lastname'))   
    this.cognomeSalvato = window.localStorage.getItem('lastname');
if(window.localStorage.getItem('indirizzo'))  
    this.indirizzoSalvato = window.localStorage.getItem('indirizzo');
if(window.localStorage.getItem('citta'))  
    this.cittaSalvata = window.localStorage.getItem('citta');
if(window.localStorage.getItem('stato'))     
    this.statoSalvato = window.localStorage.getItem('stato');
if(window.localStorage.getItem('telefono'))  
    this.telefonoSalvato = window.localStorage.getItem('telefono');
if(window.localStorage.getItem('codicepostale'))  
    this.codicePostaleSalvato = window.localStorage.getItem('codicepostale');
if(window.localStorage.getItem('email'))     
    this.emailSalvata =  window.localStorage.getItem('email');
   
    if (window.localStorage.getItem('stato') =='IT')
    this.prezzoTrasporto =10.02; 
    else if 
    (window.localStorage.getItem('stato') =='DE')
    this.prezzoTrasporto =7.02;
  
      console.log("stato" + window.localStorage.getItem('stato'));
      console.log("prezzo trasp" + this.prezzoTrasporto);
      // this.totaleCompresoTrasportoNumero= this.prezzoTrasporto+this.totaleDaPagareNumero;
     
    
    
    this.totaleCompresoTrasportoNumero=0;
    this.countries = [
     new CountryPhone('DE', 'Deutschland')];
     // new CountryPhone('US', 'United States')
      // new CountryPhone('BR', 'Brasil')
      this.activatedRoute.queryParams.subscribe(params => {
        this.totaleDaPagare = params['totaleGenerale'];
        this.jsonConCiccia = params['test'];
        this.totaleDaPagareNumero = +this.totaleDaPagare;
        console.log(this.totaleDaPagare);
      });
      
      this.totaleCompresoTrasporto=(this.prezzoTrasporto+this.totaleDaPagareNumero).toFixed(2);
      this.totaleCompresoTrasportoNumero=(this.prezzoTrasporto+this.totaleDaPagareNumero);
      
      
      Number(this.totaleCompresoTrasporto).toFixed(2);
      Number(this.totaleDaPagareNumero).toFixed(2);
      

    this.genders = [
      "Male",
      "Female"
    ];
/*
    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });
*/
    let country = new FormControl(this.countries[0], Validators.required);
    /*
    let phone = new FormControl('', Validators.compose([
      Validators.required,
      //PhoneValidator.validCountryPhone(country)
    ]));
    /*
     this.country_phone_group = new FormGroup({
       country: country,
       phone: phone
     });
*/
    this.validations_form = this.formBuilder.group({
      // username: new FormControl('', Validators.compose([
      //   UsernameValidator.validUsername,
      //   Validators.maxLength(25),
      //   Validators.minLength(5),
      //   Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
      //   Validators.required
      // ])),
      /*
      window.localStorage.setItem('nome',this.validations_form.get('name').value);
 window.localStorage.setItem('lastname',this.validations_form.get('lastname').value);
 window.localStorage.setItem('indirizzo',this.validations_form.get('indirizzo').value);
 window.localStorage.setItem('codicepostale',this.validations_form.get('codicePostale').value);
 window.localStorage.setItem('citta',this.validations_form.get('citta').value);
 window.localStorage.setItem('stato',this.validations_form.get('country').value);
 window.localStorage.setItem('telefono',this.validations_form.get('phone').value);
 window.localStorage.setItem('email',this.validations_form.get('email').value);
 */
      name: new FormControl(this.nomeSalvato, Validators.required),
      lastname: new FormControl(this.cognomeSalvato, Validators.required),
      indirizzo: new FormControl(this.indirizzoSalvato, Validators.required),
      citta: new FormControl(this.cittaSalvata, Validators.required),
      country: new FormControl(this.statoSalvato, Validators.required),
      codicePostale: new FormControl(this.codicePostaleSalvato, Validators.required),
      phone: new FormControl(this.telefonoSalvato, Validators.compose([
        Validators.required,
        Validators.pattern(/^-?(0|[1-9]\d*)?$/)
      ])),
      email: new FormControl(this.emailSalvata, Validators.compose([
         Validators.required,
         Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
       ])),
      //gender: new FormControl(this.genders[0], Validators.required),
     //country_phone: this.country_phone_group,
      // matching_passwords: this.matching_passwords_group,
      terms: new FormControl(true, Validators.pattern('true'))
    });

    this.optionsFn();
  }

  validation_messages = {
    // 'username': [
    //   { type: 'required', message: 'Username is required.' },
    //   { type: 'minlength', message: 'Username must be at least 5 characters long.' },
    //   { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
    //   { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
    //   { type: 'validUsername', message: 'Your username has already been taken.' }
    // ],
    'country': [
      { type: 'required', message: 'Land is required.' }
    ],
    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'citta': [
      { type: 'required', message: 'Stadt is required.' }
    ],
    'indirizzo': [
      { type: 'required', message: 'Adress is required.' }
    ],
    'lastname': [
      { type: 'required', message: 'Last name is required.' }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please wnter a valid email.' }
    ],
    'phone': [
      { type: 'required', message: 'Phone is required.' },
      { type: 'validCountryPhone', message: 'The phone is incorrect for the selected country.' }
    ],
   
    'terms': [
      { type: 'pattern', message: 'You must accept terms and conditions.' }
    ],
  };
  optionsFn() {
    console.log("faccio il checkout e vedo paese " + this.validations_form.get('country').value);
if (this.validations_form.get('country').value=='IT')
  this.prezzoTrasporto =10.02; 
  else if 
  (this.validations_form.get('country').value=='DE')
  this.prezzoTrasporto =7.02;

    console.log(this.prezzoTrasporto);
    this.totaleCompresoTrasportoNumero= this.prezzoTrasporto+this.totaleDaPagareNumero;
    this.totaleCompresoTrasporto = this.totaleCompresoTrasportoNumero+"";
    console.log("totale che mi aspetto a paypal"  + this.totaleCompresoTrasporto);
  }
  goBack() {
    this.router.navigate(["/home"]); 
  
  }

  onSubmit(values){
if (this.validations_form.get('terms').value)
{
 window.localStorage.setItem('nome',this.validations_form.get('name').value);
 window.localStorage.setItem('lastname',this.validations_form.get('lastname').value);
 window.localStorage.setItem('indirizzo',this.validations_form.get('indirizzo').value);
 window.localStorage.setItem('codicepostale',this.validations_form.get('codicePostale').value);
 window.localStorage.setItem('citta',this.validations_form.get('citta').value);
 window.localStorage.setItem('stato',this.validations_form.get('country').value);
 window.localStorage.setItem('telefono',this.validations_form.get('phone').value);
 window.localStorage.setItem('email',this.validations_form.get('email').value);
  }
//console.log(window.localStorage.getItem('pippo'));
 // this.validations_form.get('country').value;
  // console.log(this.validations_form.get('country').value);


    //this.router.navigate(["/user"]);
  }


  async checkoutPaypal(values) {
    // Perfom PayPal or Stripe checkout process

    console.log("entro in checkout" + this.validations_form.get('name').value + "x");
    var nomeSulForm = this.validations_form.get('name').value;
    var cognomeSulForm = this.validations_form.get('lastname').value;
    var indirizzoSulForm = this.validations_form.get('indirizzo').value;
    var codicePostaleSulForm = this.validations_form.get('codicePostale').value;
    var cittaSulForm = this.validations_form.get('citta').value;
    var jsonConCiccia = this.jsonConCiccia;
// a riga successiva aggiunto il json con ciccia. In caso lo tolgo
    var stringaDiInfo = jsonConCiccia + ";" + nomeSulForm + " " + cognomeSulForm + " " + indirizzoSulForm + " " + codicePostaleSulForm + " "
+ cittaSulForm;    // next instruction fill all paymente data
    this.optionsFn();

// if I wanna save data for next time i use app just i tick the box
    if (this.validations_form.get('terms').value)
    {
      console.log("entro in if");
     window.localStorage.setItem('nome',this.validations_form.get('name').value);
     window.localStorage.setItem('lastname',this.validations_form.get('lastname').value);
     window.localStorage.setItem('indirizzo',this.validations_form.get('indirizzo').value);
     window.localStorage.setItem('codicepostale',this.validations_form.get('codicePostale').value);
     window.localStorage.setItem('citta',this.validations_form.get('citta').value);
     window.localStorage.setItem('stato',this.validations_form.get('country').value);
     window.localStorage.setItem('telefono',this.validations_form.get('phone').value);
     window.localStorage.setItem('email',this.validations_form.get('email').value);
      }
      console.log("prima di alert");
      /*
  let alert = await this.alertCtrl.create({
      header: 'Thanks for your Order!',
      message: 'E qui dovrebbe aprire paypal',
      buttons: ['OK']
    });
    alert.present().then(() => {
      // this.modalCtrl.dismiss(null, undefined);
      this.modalCtrl.dismiss(null, undefined, null);
    });
*/
    // qui comincia ciccia
   //  this.paymentAmount = this.totaleCompresoTrasporto;
    this.currency = 'EUR';
    this.currencyIcon = '€';
    // this.totaleCompresoTrasporto = "31.02";

    // console.log(`Pay pagamento????${this.paymentAmount}fff`);
    console.log("Pay tot????" + this.totaleCompresoTrasporto +"fff");
    var pippo = this.totaleCompresoTrasportoNumero+"";
    /*
    let userAddress = new PayPalShippingAddress(
      this.validations_form.get('name').value + " " + this.validations_form.get('lastname').value,
      this.validations_form.get('indirizzo').value,
      this.validations_form.get('phone').value,
      this.validations_form.get('citta').value,
      '',
      this.validations_form.get('codicePostale').value,
      this.validations_form.get('country').value
    );
    */
  

    this.paypal.init({
      PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
      PayPalEnvironmentSandbox: 'AYkTaCPT-FqkTZkm3Fx9RpzaaaeYou5fPFu3xHXM3DPVY9cTqR_vsFYg1iUMP7KpPevsBGKe-Irp1JsT'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.paypal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        payPalShippingAddressOption: 0, // PayPalShippingAddressOptionPayPal
        //acceptCreditCards : true
        //PayPalShippingAddress: userAddress
 
      
      })).then(() => {
/*
        let userAddress = new PayPalShippingAddress(
          this.validations_form.get('name').value + " " + this.validations_form.get('lastname').value,
          this.validations_form.get('indirizzo').value,
          this.validations_form.get('phone').value,
          this.validations_form.get('citta').value,
          '',
          this.validations_form.get('codicePostale').value,
          this.validations_form.get('country').value
        );
*/
        console.log("Pay sono entrato per pagare");
        // var paymentDetails = new PayPalPaymentDetails("50.00", "0.00", "0.00");
       
        // let payment = new PayPalPayment(pippo, this.currency, this.validations_form.get('name').value + " " + this.validations_form.get('lastname').value + " " + this.validations_form.get('indirizzo').value+ " " + this.validations_form.get('codicepostale').value, 'vendita');
        let payment = new PayPalPayment(pippo, this.currency, stringaDiInfo , 'vendita');
       
        
        //payment.items
        //payment.shippingAddress = userAddress;
        // this.paypal.renderSinglePaymentUI(payment).then((res) => {
          this.paypal.renderSinglePaymentUI(payment).then(async(res) => {
          console.log(res);
/*
          console.log('pagamento efetuado');
          let transactionId = res.response.id;
          console.log('Your transaction id is ', transactionId);
          //this.createCode();
          let toast = this.modalCtrl.create({ duration: 3000, position: 'bottom' });
          toast.setMessage('Pagamento efetuado com sucesso');
          toast.present();
          // fico domani provo a fare il toast
          https://ionicframework.com/docs/v3/api/components/toast/ToastController/

*/


 let alert = await this.alertCtrl.create({
      header: 'Thanks for your Order!',
      message: "ID " + res.response.id + "State " + res.response.state + "intent " + res.response.intent,
      buttons: ['OK']
    });
    alert.present().then(() => {
      // this.modalCtrl.dismiss(null, undefined);
      this.modalCtrl.dismiss(null, undefined, null);
    });
    this.cartservice.inviaEmail(jsonConCiccia,res.response.id,this.emailSalvata);

    // this.cartservice.inviaEmail("jsonciccia","identifiativo","angeloMarchionni");




          // Successfully paid

          // Example sandbox response
          //
          // {
          //   "client": {
          //     "environment": "sandbox",
          //     "product_name": "PayPal iOS SDK",
          //     "paypal_sdk_version": "2.16.0",
          //     "platform": "iOS"
          //   },
          //   "response_type": "payment",
          //   "response": {
          //     "id": "PAY-1AB23456CD789012EF34GHIJ",
          //     "state": "approved",
          //     "create_time": "2016-10-03T13:33:33Z",
          //     "intent": "sale"
          //   }
          // }
        }, () => {
          // Error or render dialog closed without being successful
          console.log("Error or render dialog closed without being successful");
        });
      }, () => {
        // Error in configuration
        console.log("Error in configuration");
      });
    }, () => {
      // Error in initialization, maybe PayPal isn't supported or something else
      console.log("Error in initialization, maybe PayPal isn't supported or something else");
    });


    // qui termina ciccia
  }

  async checkoutACasa(values) {
    // Perfom PayPal or Stripe checkout process

    console.log("entro in checkout");
    if (this.validations_form.get('terms').value)
    {
      console.log("entro in if");
    window.localStorage.setItem('nome',this.validations_form.get('name').value);
     window.localStorage.setItem('lastname',this.validations_form.get('lastname').value);
     window.localStorage.setItem('indirizzo',this.validations_form.get('indirizzo').value);
     window.localStorage.setItem('codicepostale',this.validations_form.get('codicePostale').value);
     window.localStorage.setItem('citta',this.validations_form.get('citta').value);
     window.localStorage.setItem('stato',this.validations_form.get('country').value);
     window.localStorage.setItem('telefono',this.validations_form.get('phone').value);
     window.localStorage.setItem('email',this.validations_form.get('email').value);
      }
      console.log("prima di alert");
  let alert = await this.alertCtrl.create({
      header: 'Thanks for your Order!',
      message: 'E qui dovrebbe inviare  oridine',
      buttons: ['OK']
    });
    alert.present().then(() => {
      //this.modalCtrl.dismiss();
      this.modalCtrl.dismiss(null, undefined,null);
    });
  }




}

