import { Component, OnInit } from '@angular/core';
import { CryptoApiService } from './services/crypto-api-service';
import { Observable } from 'rxjs';
import { Crypto } from './models/crypto.model';
import { CryptoTableComponent } from './components/crypto-table-component/crypto-table-component';
import { HeaderComponent } from './components/header-component/header-component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CryptoTableComponent, HeaderComponent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  listaCryptos$!: Observable<Crypto[]>;

  constructor(private cryptoApiService: CryptoApiService) {}

  ngOnInit() {
    this.listaCryptos$ = this.cryptoApiService.getCryptoList();
    // this.listaCryptos$.subscribe((datos) => {
    //   console.log('Lo que llega del servicio:', datos);
    // });
  }
}
