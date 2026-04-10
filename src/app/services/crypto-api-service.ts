import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Crypto } from '../models/crypto.model';

@Injectable({
  providedIn: 'root',
})
export class CryptoApiService {
  private cryptoUrl =
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc'; // URL to web API

  constructor(private http: HttpClient) {}

  // consultarLista() { //jason ponerlo en el servicio
  //   this.http.get<Array<cryptoObject>>('/cryptos.json').subscribe((data) => {
  //     this.listaCryptos = data;
  //     console.log(data);
  //     this.cdr.detectChanges();
  //     console.log('this' + this.listaCryptos.length);
  //   });
  // }

  getCryptoList(): Observable<Crypto[]> {
    //return this.http.get<Crypto[]>(this.cryptoUrl);

    return this.http.get<Crypto[]>(this.cryptoUrl).pipe(
      tap((data) => {
        console.log('El servicio recibió de la API:', data);
      }),
    );
  }
}
