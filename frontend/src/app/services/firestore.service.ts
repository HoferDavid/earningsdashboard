import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, doc, getDoc } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { map, shareReplay, catchError } from 'rxjs/operators';
import { BasicWidget } from '../interfaces/basic-widget';
import { StockData } from '../interfaces/stock-data';
import { QuarterFormatPipe } from '../pipes/quarter-format.pipe';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {

  private stocksCache$: Observable<BasicWidget[]>;
  private quarterFormatPipe = new QuarterFormatPipe();


  constructor(private firestore: Firestore) {
    this.stocksCache$ = this.initializeStocksCache();
  }


  private initializeStocksCache(): Observable<BasicWidget[]> {
    const stocksCollection = collection(this.firestore, 'stocks');
    return collectionData(stocksCollection, { idField: 'id' }).pipe(
      map((data: any[]) => this.transformStocks(data)),
      shareReplay(1),
      catchError((error) => {
        console.error('Error fetching stocks:', error);
        return of([]); // Returns an empty array if error
      })
    );
  }


  getStocks(): Observable<BasicWidget[]> {
    return this.stocksCache$;
  }


  private transformStocks(data: any[]): BasicWidget[] {
    return data.map(stock => ({
      name: stock.name,
      ticker: stock.id,
      logo: `/logos/${stock.ticker}.png`,
      lastRevenue: stock.revenue ? stock.revenue[stock.revenue.length - 1] : undefined,
      lastQuarter: stock.quarter ? this.quarterFormatPipe.transform(stock.quarter[stock.quarter.length - 1]) : undefined,
    }));
  }


  getStockDetails(ticker: string): Observable<StockData> {
    const stockDoc = doc(this.firestore, 'stocks', ticker);
    return from(getDoc(stockDoc)).pipe(
      map(docSnap => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log('Firestore Data:', data);
  
          return {
            id: docSnap.id,
            name: data['name'],
            ticker: data['ticker'],
            revenue: data['revenue'],
            quarter: data['quarter']?.map((q: string) => this.quarterFormatPipe.transform(q)),
            grossmargin: data['grossMargin'],
            netIncome: data['netIncome'],
            url: data['url'],
            updatedAt: data['updatedAt'] ? data['updatedAt'].toDate() : null
          } as StockData;
        } else {
          throw new Error('Stock not found');
        }
      }),
      
      catchError(error => {
        console.error('Error fetching stock details:', error);
        throw error;
      })
    );
  }
}