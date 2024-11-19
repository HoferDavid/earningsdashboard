import { Injectable, inject, signal } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { BasicWidget } from '../interfaces/basic-widget';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private firestoreService = inject(FirestoreService);
  private basicWidgetsSignal = signal<BasicWidget[]>([]);

  constructor() {
    // Daten aus Firestore laden und Signal initialisieren
    this.firestoreService.getStocks().subscribe(widgets => this.basicWidgetsSignal.set(widgets));
  }

  getBasicWidgets() {
    return this.basicWidgetsSignal.asReadonly();
  }
}
