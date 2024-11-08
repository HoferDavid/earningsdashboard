import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'quarterFormat',
  standalone: true,
})
export class QuarterFormatPipe implements PipeTransform {
  transform(value: string | undefined): string {
    if (!value) {
      return 'undefined';
    }

    const regexCompact = /^(\d{2})Q(\d)$/; // Match "24Q3"
    const regexExtended = /^Q(\d) (\d{4})$/; // Match "Q3 2024"

    if (regexCompact.test(value)) {
      const [, year, quarter] = value.match(regexCompact)!;
      return `Q${quarter} 20${year}`;
    }

    if (regexExtended.test(value)) {
      return value;
    }

    return value;
  }
}
