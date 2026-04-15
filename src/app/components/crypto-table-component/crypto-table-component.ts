import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Crypto } from '../../models/crypto.model';

@Component({
  selector: 'app-crypto-table-component',
  imports: [CommonModule],
  templateUrl: './crypto-table-component.html',
  styleUrl: './crypto-table-component.scss',
})
export class CryptoTableComponent {
  //@Input() listaCryptos: Crypto[] = [];
  listaCryptos = input<Crypto[]>([]);
}
