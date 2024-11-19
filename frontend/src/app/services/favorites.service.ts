import { Injectable, signal, Signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  
  private readonly favoritesKey = 'favorites';
  private favoritesSignal: WritableSignal<string[]> = signal(this.loadFavorites());


  // Load Favorites
  private loadFavorites(): string[] {
    const storedFavorites = localStorage.getItem(this.favoritesKey);
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  }


  // Save Favoriten
  private saveFavorites(): void {
    localStorage.setItem(this.favoritesKey, JSON.stringify(this.favoritesSignal()));
  }


  // Access Favorites
  get favorites(): Signal<string[]> {
    return this.favoritesSignal;
  }


  // Add Stock to Favorites
  addFavorite(ticker: string): void {
    const currentFavorites = this.favoritesSignal();
    if (!currentFavorites.includes(ticker)) {
      const updatedFavorites = [...currentFavorites, ticker];
      this.favoritesSignal.set(updatedFavorites);
      this.saveFavorites();
    }
  }


  // Delete Stock from Favorites
  removeFavorite(ticker: string): void {
    const currentFavorites = this.favoritesSignal();
    const updatedFavorites = currentFavorites.filter((fav: string) => fav !== ticker);
    this.favoritesSignal.set(updatedFavorites);
    this.saveFavorites();
  }


  // Check if Stiock is in Favorites
  isFavorite(ticker: string): boolean {
    return this.favoritesSignal().includes(ticker);
  }
}
