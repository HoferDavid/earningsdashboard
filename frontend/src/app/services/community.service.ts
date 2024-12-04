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
  private lastUpdateSignal = signal<string | null>(null);

  constructor(private firestore: Firestore) {}


  getStockDataSignal() {
    return this.stockDataSignal;
  }


  getLastUpdateSignal() {
    return this.lastUpdateSignal;
  }


  fetchStockData() {
    const usersCollectionRef = collection(this.firestore, 'communityPrediction');

    from(getDocs(usersCollectionRef)).subscribe({
      next: (querySnapshot) => {
        const allData: CommunityPrediction[] = [];
        let lastUpdate: string | null = null;

        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          const formattedData: CommunityPrediction = {
            username: data['username'],
            stock: data['stock'],
            ticker: data['ticker'],
            startPrice: parseFloat(data['startPrice']),
            currentPrice: parseFloat(data['currentPrice']),
            lastUpdate: data['lastUpdated'].toDate().toISOString(),
            performance: parseFloat(data['currentPrice']) - parseFloat(data['startPrice'])
          };

          allData.push(formattedData);

          if (!lastUpdate) {
            lastUpdate = formattedData.lastUpdate;
          }
        });
        this.stockDataSignal.set(allData);
        this.lastUpdateSignal.set(lastUpdate);
      },
      error: (err) => console.error('Error fetching stock data:', err),
    });
  }
}
