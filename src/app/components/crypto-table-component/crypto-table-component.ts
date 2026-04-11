import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoApiService } from '../../services/crypto-api-service';
import { Crypto } from '../../models/crypto.model';
import { Observable } from 'rxjs';
import { HeaderComponent } from '../header-component/header-component';

@Component({
  selector: 'app-crypto-table-component',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './crypto-table-component.html',
  styleUrl: './crypto-table-component.scss',
})
export class CryptoTableComponent implements OnInit {
  listaCryptos$!: Observable<Crypto[]>;

  constructor(private cryptoApiService: CryptoApiService) {}

  ngOnInit() {
    this.listaCryptos$ = this.cryptoApiService.getCryptoList();
    // this.listaCryptos$.subscribe((datos) => {
    //   console.log('Lo que llega del servicio:', datos);
    // });
  }
}
