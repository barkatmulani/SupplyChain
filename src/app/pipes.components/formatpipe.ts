import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe, DecimalPipe, DatePipe } from '@angular/common';

@Pipe({
    name: 'format'
})
export class FormatPipe implements PipeTransform {
    constructor() {

    }
    transform(text: string, format: string): string {
        switch (format) {
            case 'currency':
				!text ? '' : (new CurrencyPipe('')).transform(0 + (!text ? '' : text), 'AUD');
            case 'currencyAct':
                !text ? '$' : 0 + (!text ? '' : text);
			case 'currencyNeg':
				return text ? (((new CurrencyPipe('')).transform(text, '$', true, '1.2-2')).replace("(", "-").replace(")", "")) : (text == '0' ? '$0.00' : null);
				//parseFloat(text)
				// return amount ? ($filter('currency', '')(roundOff(amount), "$")).replace("(", "-").replace(")", "") : amount == 0 ? '$0.00' : null;
            case 'number':
				return (new DecimalPipe('')).transform(text, '1.2');
			case 'blankIfZero':
				return ((parseFloat(text) === 0) ? '' : text);
            case 'date':
                return (new DatePipe('')).transform(text, 'dd/MM/yyyy');
            case 'datetime':
                return (new DatePipe('')).transform(text, 'dd/MM/yyyy hh:mm a');
            case 'datetime2':
                return (new DatePipe('')).transform(text, 'EEEE, dd/MM/yyyy hh:mm a');
            default:
                return (text != undefined ? text : '');
        }
	}
}