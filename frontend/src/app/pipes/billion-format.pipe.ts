import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'billionFormat',
  standalone: true
})
export class BillionFormatPipe implements PipeTransform {

  transform(value: number | string): string {
    if (typeof value === 'string') {
      value = parseFloat(value.replace(/,/g, ''));
    }

    if (isNaN(value)) {
      return '-';
    }

    let formattedValue = (value / 1000).toFixed(2);
    return formattedValue;
  }

}
