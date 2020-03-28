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
