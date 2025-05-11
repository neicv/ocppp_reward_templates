export class rubles {  
  words = [['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять', 'десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'], ['', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'], ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот']];

  toFloat = function(number) {
    return parseFloat(number);
  };

  plural = function(count, options) {
    let rest;
    if (options.length !== 3) {
      return false;
    }
    count = Math.abs(count) % 100;
    rest = count % 10;
    if (count > 10 && count < 20) {
      return options[2];
    }
    if (rest > 1 && rest < 5) {
      return options[1];
    }
    if (rest === 1) {
      return options[0];
    }

    return options[2];
  };

  parseNumber = function(number, count) {
    let first, numeral, second;
    numeral = '';
    if (number.length === 3) {
      first = number.substr(0, 1);
      number = number.substr(1, 3);
      numeral = "" + this.words[2][first] + " ";
    }
    if (number < 20) {
      numeral += "" + this.words[0][this.toFloat(number)] + " ";
    } else {
      first = number.substr(0, 1);
      second = number.substr(1, 2);
      numeral += "" + this.words[1][first] + " " + this.words[0][second] + " ";
    }
    if (count === 0) {
      numeral += this.plural(number, ['рубль', 'рубля', 'рублей']);
    } else if (count === 1) {
      if (numeral !== '  ') {
        numeral += this.plural(number, ['тысяча ', 'тысячи ', 'тысяч ']);
        numeral = numeral.replace('один ', 'одна ').replace('два ', 'две ');
      }
    } else if (count === 2) {
      if (numeral !== '  ') {
        numeral += this.plural(number, ['миллион ', 'миллиона ', 'миллионов ']);
      }
    } else if (count === 3) {
      numeral += this.plural(number, ['миллиард ', 'миллиарда ', 'миллиардов ']);
    }
    return numeral;
  };

  parseDecimals = function(number) {
    let text;
    text = this.plural(number, ['копейка', 'копейки', 'копеек']);
    if (number === 0) {
      number = "00";
    } else if (number < 10) {
      number = "0" + number;
    }
    return " " + number + " " + text;
  };

  number_to_string = function(number) {
    let count, decimals, digit, length, numeral, parts, _ref, _ref1;
    if (!number || ((_ref = typeof number) !== 'number' && _ref !== 'string')) {
      return false;
    }
    if (typeof number === 'string') {
      number = this.toFloat(number.replace(',', '.'));
      if (isNaN(number)) {
        return false;
      }
    }
    if (number <= 0) {
      return false;
    }
    number = number.toFixed(2);
    if (number.indexOf('.') !== -1) {
      _ref1 = number.split('.'), number = _ref1[0], decimals = _ref1[1];
    }
    numeral = '';
    length = number.length - 1;
    parts = '';
    count = 0;
    while (length >= 0) {
      digit = number.substr(length, 1);
      parts = digit + parts;
      if ((parts.length === 3 || length === 0) && !isNaN(this.toFloat(parts))) {
        numeral = this.parseNumber(parts, count) + numeral;
        parts = '';
        count++;
      }
      length--;
    }
    numeral = numeral.replace(/\s+/g, ' ');
    if (decimals) {
      numeral += this.parseDecimals(this.toFloat(decimals));
    }
    return numeral;
  };  
}

export function getShortFIO(fullFIO = '') {
  let shortFIO = '';
  const t = fullFIO.split(' ');

  if (t.length === 3) {
    shortFIO = t[0] + ' ' + t[1].charAt (0) + '.' + t[2].charAt (0) + '.';
  } else {
    shortFIO = fullFIO;
  }

  return shortFIO; 
}

export function convertDateDash(date = '') {
  if (!date) return '';

  const d = date.split ('.');
  if (d.length === 3) {
    date = d[2] + '-' + d[1] + '-' + d[0];
  }

  return date;
}

export function convertDateDot(date = '') {
  if (!date) return '';

  const d = date.split ('-');
  if (d.length === 3) {
    date = d[2] + '.' + d[1] + '.' + d[0];
  }

  return date;
}
