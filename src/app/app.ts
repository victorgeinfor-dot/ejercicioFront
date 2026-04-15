import { Component, OnInit, signal } from '@angular/core';
import { CryptoApiService } from './services/crypto-api-service';
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
  public listaCryptos = signal<Crypto[]>([]);

  constructor(private cryptoApiService: CryptoApiService) {}

  ngOnInit() {
    this.cryptoApiService.getCryptoList().subscribe((data) => {
      this.listaCryptos.set(data);
    });
  }
}
