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
    this.countries = [
     new CountryPhone('DE', 'Deutschland')];
     // new CountryPhone('US', 'United States')
      // new CountryPhone('BR', 'Brasil')
      this.activatedRoute.queryParams.subscribe(params => {
        this.totaleDaPagare = params['totaleGenerale'];
        console.log(this.totaleDaPagare);
      });
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
      name: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      indirizzo: new FormControl('', Validators.required),
      citta: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      // phone: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/^-?(0|[1-9]\d*)?$/)
      ])),
      email: new FormControl('', Validators.compose([
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

  

  onSubmit(values){



    
    console.log(values);
    this.router.navigate(["/user"]);
  }

}

