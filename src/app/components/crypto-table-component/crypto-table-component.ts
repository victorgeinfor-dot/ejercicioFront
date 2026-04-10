import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crypto-table-component',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './crypto-table-component.html',
  styleUrl: './crypto-table-component.scss',
})
export class CryptoTableComponent implements OnInit {
  listaCryptos: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.consultarLista();
  }

  consultarLista() {
    this.http.get<any[]>('/cryptos.json').subscribe((data) => {
      this.listaCryptos = data;
      console.log(data);
      console.log('this' + this.listaCryptos.length);
    });
  }
}
