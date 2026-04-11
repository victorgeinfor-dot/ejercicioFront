import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Crypto } from '../../models/crypto.model';

@Component({
  selector: 'app-header-component',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss',
})
export class HeaderComponent {
  searchControl = new FormControl('');
  @Input() listaCryptos: Crypto[] = [];
  filteredCryptos: Crypto[] = [];

  constructor() {
    this.searchControl.valueChanges.subscribe((value) => {
      console.log('Usuario escribe', value);
      const cryptoSearch = value?.toLowerCase().trim() || '';

      this.filteredCryptos = this.listaCryptos
        .filter((crypto: Crypto) => crypto.name.toLocaleLowerCase().includes(cryptoSearch))
        .slice(0, 5);
      console.log('Crypto filtrada', this.filteredCryptos);
    });
  }
}
