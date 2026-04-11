import { Component, signal } from '@angular/core';
import { CryptoTableComponent } from './components/crypto-table-component/crypto-table-component';

@Component({
  selector: 'app-root',
  imports: [CryptoTableComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('ejercicioFront');
}
