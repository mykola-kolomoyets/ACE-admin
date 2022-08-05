/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-useless-escape */
import { Transaction } from './types/transaction';
import { User } from './types/user';

/**
 * Function returns decimal number with 2-precision
 * @param {Number} number the number to transform
 * @returns {Number}      the transformed number with after-comma symbols
 */
export const getDecimalNumber = (number: number) => +number.toFixed(2);

/**
 * Function returns saldo between two values
 * @param {Number} curr the current value characteristic
 * @param {Number} prev the current value of the same characteristic
 * @returns { Number | null } the percentage of saldo
 */
export const showDeltaPercents = (
  curr: number,
  prev: number
): number | null => {
  if (!prev || !curr) return null;

  const delta = curr - prev;
  const percent = (delta / curr) * 100;
  return getDecimalNumber(percent);
};

/**
 * Function returns capitalized word
 * @param {String} str the string to capitalize
 * @returns {String} capitalized string (first letter is uppercase)
 */
export const capitalize = (str: string): string =>
  `${str?.charAt(0).toUpperCase()}${str?.slice(1).toLowerCase()}`;

/**
 * Function to create the sliced version of long string
 * @param {String} str  the long string to be sliced (length > 10)
 * @returns {String} the sliced string `{first 5 characters}...{last 5 characters}`
 */
export const createSlicedString = (str: string): string => {
  if (str.length <= 10) return str;

  return `${str.slice(0, 6)}...${str.slice(str.length - 4, str.length)}`;
};

/**
 * Function to create the cutted version of long string
 * @param {String} str the long string to be cutted
 * @param {Number} maxLength (10 by default) - the length of string to be cutted
 * @returns {String} the curred string `{first {maxLength} characters}...`
 */
export const createCuttedString = (str: string, maxLength = 10) => {
  if (str.length <= maxLength) return str;

  return `${str.slice(0, maxLength)}...`;
};

/**
 * Function to disable any scroll on webpage
 */
export const disableScroll = () => {
  document.body.classList.add('disabled');
};

/**
 * Function to enable scroll on webpage
 */
export const enableScroll = () => {
  document.body.classList.remove('disabled');
};

/**
 * Function checks is string the email string
 * @param {String} email
 * @returns {Boolean} has the email passed regexp test
 */
export const isEmail = (email: string): boolean =>
  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);

/**
 * Function gets one username string
 * @param {User} user the user data from BE
 * @returns {String} firstName + lastName
 */
export const getUserName = (user?: User) => {
  if (!user || !user?.firstName || !user?.lastName) return '';

  return `${user.firstName} ${user.lastName}`;
};

/**
 * Function creates the CSV stringed doc from array of objects
 * @param {Any[]} array the array of data to transform
 * @returns {String} data splitted by comma as csv
 */
export const convertArrayToCSV = <T>(array: T[]) => {
  let csv = '';

  let keysCounter = 0;

  for (const key in array[0]) {
    csv +=
      key + (keysCounter + 1 < Object.keys(array[0]).length ? ',' : '\r\n');
    keysCounter++;
  }

  for (let row = 0; row < array.length; row++) {
    const keysAmount = Object.keys(array[row]).length;

    for (const key in array[row]) {
      csv +=
        array[row][key] +
        (keysCounter + 1 < keysAmount || row === 0 ? ',' : '\r\n');
      keysCounter++;
    }
    if (row === 0) csv += '\r\n';

    keysCounter = 0;
  }

  return csv;
};

/**
 * Function to download the CSV file with content and filename set
 * @param {Any} data the data passed inside the file
 * @param fileName the string to name the file
 * @returns downloaded file on the computer
 */
export const downloadFile = (data: BlobPart[], fileName: string) => {
  const blob = new Blob(data, { type: 'text/csv;charset=utf-8;' });

  const link = document.createElement('a');
  if (!link.download !== undefined) {
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', fileName);

    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

/**
 * Function to get the transactions by range of date
 * @param {Transaction[]} transactions the list of transactions from BE
 * @param {String} startDate the start date range (DD-MM-YYY) format
 * @param {String} endDate the end date range (DD-MM-YYY) format
 * @see {@link DateUtils}
 * @returns {{Transaction[]}} the slice of array with passed creation date range
 */
export const filterTransactionsByDate = (
  transactions: Transaction[],
  startDate: string,
  endDate: string
) =>
  transactions.filter((transaction) => {
    const transactionCreatedAt = new Date(transaction.createdAt).getTime();

    const minDate = new Date(startDate).getTime();

    const maxDate = new Date(endDate).getTime();

    return transactionCreatedAt >= minDate && transactionCreatedAt <= maxDate;
  });

/**
 * Function returns if the transaction from `ZERO`-address (`0x000...000`)
 * @param {Transaction} transaction the transaction object to take the data from
 * @returns {Boolean} if the `from` field of transaction equals  `ZERO`-address
 */
export const isFromZeroAddress = (transaction: Transaction) =>
  transaction.from === '0x0000000000000000000000000000000000000000';

/**
 *
 * @param {Transaction[]} transactions the array of transactions
 * @returns amount of minted tokens ans total transactions volume
 */
export const getPeriodSummaryValues = (transactions: Transaction[]) =>
  transactions.reduce(
    (acc, curr) => {
      const isTransactionFromZeroAddress = isFromZeroAddress(curr);
      const transactionVolume = curr.amount;

      return {
        ...acc,
        mintedTokens: isTransactionFromZeroAddress
          ? acc.mintedTokens + 1
          : acc.mintedTokens,
        transactionVolume: acc.transactionVolume + transactionVolume
      };
    },
    {
      mintedTokens: 0,
      transactionVolume: 0
    }
  );

/**
 * Function returns the array of ranges of days of the weeks of month
 * range is represented as mondays-to-fridays ranges
 * @param {Number} month the index of month to investigate (0: Jan, 11: Dec)
 * @param {Number} year the number of year to gat calendar per month of this year
 * @param {Number} _start the number of the first day of month
 * @returns array of objects with numbers of start and end day of weeks of current month
 */
export const getFullWeeksStartAndEndInMonth = (
  month: number,
  year: number,
  _start: number
) => {
  const weeks = [],
    firstDate = new Date(year, month, 1),
    lastDate = new Date(year, month + 1, 0),
    numDays = lastDate.getDate();

  let start = 1;
  let end: number;

  if (firstDate.getDay() === _start) end = 7;
  else {
    const preMonthEndDay = new Date(year, month, 0);

    start = preMonthEndDay.getDate() + 1 - firstDate.getDay() + _start;
    end = 7 - firstDate.getDay() + _start;

    weeks.push({ start: start + 1, end: end - 1 });

    start = end + 1;
    end = end + 7;
  }

  while (start <= numDays) {
    weeks.push({ start: start + 1, end: end - 1 });

    start = end + 1;
    end = end + 7;

    if (end > numDays) {
      end = end - numDays + _start;

      weeks.push({ start: start + 1, end: end - 1 });

      break;
    }
  }

  return weeks;
};

/**
 * Function to update the object by adding some values to existing values
 * @param {Object} obj - the start object we want to update
 * @param values - the object with partial fields of original object
 * @returns {Object} return updated original objects by adding values from `values`
 */
export const addToObject = <T extends { [key: string]: string | number }>(
  obj: T,
  values: Partial<T>
): T => {
  Object.entries(values).forEach(([key, value]) => {
    obj[key as keyof T] += value;
  });

  return obj;
};

export const convertImageToBase64 = (file: File) =>
  new Promise<string | ArrayBuffer | null>((res, rej) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => res(reader.result);

    reader.onerror = (err) => rej(err);
  });

export const createSeparatorsNumber = (value: string) => {
  return `${Number(value).toLocaleString('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getFileSizeInMB = (file: File): number =>
  Math.round(file.size / 1024 ** 2);
