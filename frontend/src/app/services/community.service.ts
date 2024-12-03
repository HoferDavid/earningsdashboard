import { Injectable, signal } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { CommunityPrediction } from '../interfaces/community-prediction';
import { doc, getDoc, getDocs } from 'firebase/firestore';
import { catchError, from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StockDataService {
  private stockDataSignal = signal<CommunityPrediction[]>([]);

  constructor(private firestore: Firestore) {}

  getStockDataSignal() {
    return this.stockDataSignal;
  }


  fetchStockData() {
    // Zugriff auf die gesamte Sammlung 'community'
    const usersCollectionRef = collection(this.firestore, 'communityPrediction');

    from(getDocs(usersCollectionRef)).subscribe({
      next: (querySnapshot) => {
        const allData: CommunityPrediction[] = [];

        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          console.log('community data:', data);

          // Formatierte Daten für jedes Dokument
          const formattedData: CommunityPrediction = {
            username: data['username'],
            stock: data['stock'],
            ticker: data['ticker'],
            startPrice: data['startPrice'],
            currentPrice: data['currentPrice'],
            lastUpdate: data['lastUpdated'].toDate().toISOString(), // Konvertiere Timestamp zu ISO-String
          };

          allData.push(formattedData);
        });

        // Signal mit allen Benutzerdaten setzen
        this.stockDataSignal.set(allData);
      },
      error: (err) => console.error('Error fetching stock data:', err),
    });
  }
}
