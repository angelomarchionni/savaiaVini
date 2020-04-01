/*
import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.page.html',
  styleUrls: ['./pagamento.page.scss'],
})
export class PagamentoPage implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(params => {
      const tot = params['totaleGenerale'];
      console.log(tot);
    });

  }

}

*/
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl,FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { UsernameValidator } from '../validators/username.validator';
// import { PhoneValidator } from '../validators/phone.validator';
// import { PasswordValidator } from '../validators/password.validator';
import { CountryPhone } from './country-phone.model';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { formatCurrency } from '@angular/common';



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

  nomeSalvato:string;
  cognomeSalvato:string;
  indirizzoSalvato:string;
  cittaSalvata:string;
  statoSalvato:string;
  telefonoSalvato:string;
  codicePostaleSalvato:string;
  emailSalvata:string;



  countries: Array<CountryPhone>;
  genders: Array<string>;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
    
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
        this.totaleDaPagareNumero = +this.totaleDaPagare;
        console.log(this.totaleDaPagare);
      });
      // this.prezzoTrasporto=0;
      this.totaleCompresoTrasporto=(this.prezzoTrasporto+this.totaleDaPagareNumero).toFixed(2);
      this.totaleCompresoTrasportoNumero=(this.prezzoTrasporto+this.totaleDaPagareNumero);
      
      
      Number(this.totaleCompresoTrasporto).toFixed(2);
      Number(this.totaleDaPagareNumero).toFixed(2);
      Number(this.totaleCompresoTrasporto).toFixed(2);

     // formatCurrency(value: number, locale: string, currency: string, currencyCode?: string, 
   // this.totaleCompresoTrasporto=formatCurrency(value: this.totaleCompresoTrasportoNumero,currency: EUR);
   //

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
    console.log(this.validations_form.get('country').value);
if (this.validations_form.get('country').value=='IT')
  this.prezzoTrasporto =10.02; 
  else if 
  (this.validations_form.get('country').value=='DE')
  this.prezzoTrasporto =7.02;

    console.log(this.prezzoTrasporto);
    this.totaleCompresoTrasportoNumero= this.prezzoTrasporto+this.totaleDaPagareNumero;
  }
  goBack() {
    this.router.navigate(["/home"]); 
  
  }

  onSubmit(values){

 window.localStorage.setItem('nome',this.validations_form.get('name').value);
 window.localStorage.setItem('lastname',this.validations_form.get('lastname').value);
 window.localStorage.setItem('indirizzo',this.validations_form.get('indirizzo').value);
 window.localStorage.setItem('codicepostale',this.validations_form.get('codicePostale').value);
 window.localStorage.setItem('citta',this.validations_form.get('citta').value);
 window.localStorage.setItem('stato',this.validations_form.get('country').value);
 window.localStorage.setItem('telefono',this.validations_form.get('phone').value);
 window.localStorage.setItem('email',this.validations_form.get('email').value);
 
//console.log(window.localStorage.getItem('pippo'));
 // this.validations_form.get('country').value;
  // console.log(this.validations_form.get('country').value);


    this.router.navigate(["/user"]);
  }

}

