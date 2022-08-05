import { Period } from './enums/common';

/* eslint-disable @typescript-eslint/lines-between-class-members */
type DeltaDate = {
  days: number;
  months: number;
  years: number;
};

/**
 * Class to manipulate the date data
 */
export class DateUtils {
  /**
   * @property {@link DeltaDate} default data for adding date to some other date
   * @static
   */
  // static defaultDelta: DeltaDate = {
  //   years: 0,
  //   months: 0,
  //   days: 0
  // };

  /**
   * @property {Number} _secondsInDay the seconds in 24 hours
   * @static
   */
  static get _secondsInDay(): number {
    return 24 * 60 * 60 * 1000;
  }

  /**
   * @property {Number} _secondsInDay the seconds in 1 month (31 days)
   * @static
   */
  // static get _secondsInMonth(): number {
  //   return 31 * this._secondsInDay;
  // }

  /**
   * @property {Number} _secondsInDay the seconds in 1 year (12 months)
   * @static
   */
  // static get _secondsInYear(): number {
  //   return 12 * this._secondsInMonth;
  // }

  /**
   * @property {Date} addDeltaToDate method to add or subtract some range of date to current date
   * @static
   * @param {Date} date the current date to manipulate with
   * @param {DeltaDate} delta the parameters to manipulate with data
   * @see {@link DeltaDate}
   * @param {Boolean} increment defines to increment or decrement the delta from/to date
   * @returns {Date} result of adding/subtracting the dates
   */
  static addDeltaToDate(
    date: Date,
    delta: DeltaDate,
    increment: boolean
  ): Date {
    const numberSign = increment ? 1 : -1;
    const yearsToAdd = date.getFullYear() + delta.years * numberSign;
    const monthsToAdd = date.getMonth() + delta.months * numberSign;
    const daysToAdd = date.getDate() + delta.days * numberSign;

    return new Date(yearsToAdd, monthsToAdd, daysToAdd, date.getHours());
  }

  /**
   * @property {Date} maxDate defined the maximum date to be at datepickers
   * @static
   */
  static get maxDate(): Date {
    return new Date('12/31/9999');
  }

  /**
   * @property {Date} maxDate defined the minimum date to be at datepickers
   * @static
   */

  /**
   * @property {@link DeltaDate} filterDeltas defined the deltas to fetch data for periods relatively today
   * @static
   */
  static filterDeltas = {
    [Period.daily]: { years: 0, months: 0, days: 1 },
    [Period.weekly]: { years: 0, months: 0, days: 7 },
    [Period.monthly]: { years: 0, months: 1, days: 0 }
  };

  /**
   * @property {Date} stringToDate convert the `DD-MM-YYYY` string to `Date` object
   * @static
   * @param {String} dateString the `DD-MM-YYYY` formatted date string
   * @returns {Date} the `Date` object of the date passed
   */
  static stringToDate(dateString: string): Date {
    const [day, month, year] = dateString
      .split('-')
      .map((item) => Number(item));
    return new Date(year, month - 1, day);
  }

  /**
   * @property {Date} dateToString convert the `Date` object to `DD-MM-YYYY` or `HH:MM` string
   * @static
   * @param {Date} date the `Date` object to transform
   * @param {Boolean} withMinutes defines will it return `DD-MM-YYYY` or `HH:MM` string
   * @returns {String} `DD-MM-YYYY` or `HH:MM` string
   */
  static dateToString(date: Date | string, withMinutes?: boolean): string {
    if (typeof date === 'string') {
      const [yyyy, mm, dd] = date.split('T')[0].split('-');
      return `${dd}-${mm}-${yyyy}`;
    }

    const [dateString, timeString] = new Date(date)
      .toLocaleString()
      .split(', ');

    if (withMinutes) return timeString.slice(0, 5);
    return dateString.replaceAll('.', '-');
  }
}
