import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'billionFormat',
  standalone: true
})
@Injectable({ providedIn: 'root' })
export class BillionFormatPipe implements PipeTransform {

  transform(value: number | string): string {
    if (typeof value === 'string') {
      value = parseFloat(value.replace(/,/g, ''));
    }
    if (isNaN(value)) {
      return '-';
    }
    return `${(value / 1_000_000_000).toFixed(2)}`;
  }
}
