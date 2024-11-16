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

    // Patterns for different formats
    const regexExtended = /^Q(\d) (\d{4})$/; // Match "Q1 2019"
    const regexCompact = /^(\d{2})Q(\d)$/; // Match "24Q1"
    const regexDashed = /^Q(\d)-(\d{2})$/; // Match "Q1-18"
    const regexShortYear = /^Q(\d) (\d{2})$/; // Match "Q1 19"

    // "24Q1" -> Standard
    if (regexCompact.test(value)) {
      return value;
    }

    // "Q1 2019" -> "19Q1"
    if (regexExtended.test(value)) {
      const [, quarter, year] = value.match(regexExtended)!;
      return `${year.slice(2)}Q${quarter}`;
    }

    // "Q1-18" -> "18Q1"
    if (regexDashed.test(value)) {
      const [, quarter, year] = value.match(regexDashed)!;
      return `${year}Q${quarter}`;
    }

    // "Q1 19" -> "19Q1"
    if (regexShortYear.test(value)) {
      const [, quarter, year] = value.match(regexShortYear)!;
      return `${year}Q${quarter}`;
    }

    // Return Original if no case from above is true
    return value;
  }
}
