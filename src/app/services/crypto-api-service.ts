import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError } from 'rxjs';
import { Crypto } from '../models/crypto.model';

@Injectable({
  providedIn: 'root',
})
export class CryptoApiService {
  private cryptoUrl =
    'https:///api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc'; // URL to web API
  private jsonRespaldo = '/cryptos.json';

  constructor(private http: HttpClient) {}

  getCryptoList(): Observable<Crypto[]> {
    //return this.http.get<Crypto[]>(this.cryptoUrl);

    return this.http.get<Crypto[]>(this.cryptoUrl).pipe(
      tap((data) => {
        console.log('El servicio recibió de la API Online:', data);
      }),
      catchError((error) => {
        return this.http.get<Crypto[]>(this.jsonRespaldo).pipe(
          tap((data) => {
            console.log('La API falló, cargando JSON local de respaldo...', data);
          }),
        );
      }),
    );
  }
}
