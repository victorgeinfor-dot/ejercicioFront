import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoApiService } from '../../services/crypto-api-service';
import { Crypto } from '../../models/crypto.model';
import { Observable } from 'rxjs';
import { HeaderComponent } from '../header-component/header-component';

@Component({
  selector: 'app-crypto-table-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './crypto-table-component.html',
  styleUrl: './crypto-table-component.scss',
})
export class CryptoTableComponent {
  @Input() listaCryptos: Crypto[] = [];
}
