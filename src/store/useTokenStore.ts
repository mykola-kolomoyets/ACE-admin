/* eslint-disable no-unused-vars */
import create from 'zustand';

import TokenService from '../api/services/token.service';
import UserService from '../api/services/user.service';

import { DateUtils } from '../utils/date.utils';
import { Period } from '../utils/enums/common';
import { PeriodAmount } from '../utils/types/common';
import {
  addToObject,
  convertArrayToCSV,
  delay,
  downloadFile,
  filterTransactionsByDate,
  getFullWeeksStartAndEndInMonth,
  getPeriodSummaryValues
} from '../utils/fn';

export type TransactionTableData = {
  date: string;
  issuedTokens: number;
  transactionVolume: number;
};

interface TokenStore {
  period: Period;
  isFetching: boolean;
  mintedTokens: PeriodAmount;
  transactionVolume: PeriodAmount;
  activeUsers: PeriodAmount;

  transactionsTableData: TransactionTableData[];

  setPeriod: (period: Period) => void;
  getTransactions: () => void;
  getActiveUsers: () => void;
  exportCSV: () => void;
}

const useTokenStore = create<TokenStore>((set, get) => ({
  period: Period.daily,
  isFetching: false,
  mintedTokens: { currentValue: 0, previousValue: 0 },
  transactionVolume: { currentValue: 0, previousValue: 0 },
  activeUsers: { currentValue: 0, previousValue: 0 },
  transactionsTableData: [],

  setPeriod: (period) => {
    set({ period });
  },

  getTransactions: async () => {
    set({ isFetching: true });

    const { period } = get();
    /**
     * * SET THE DATES TO FILTER WITH
     */
    const today = DateUtils.addDeltaToDate(
      new Date(),
      { days: 1, months: 0, years: 0 },
      true
    );

    const filterMinDateForCurrent = DateUtils.addDeltaToDate(
      today,
      DateUtils.filterDeltas[period],
      false
    );

    const filterMinDateForPrevious = DateUtils.addDeltaToDate(
      new Date(filterMinDateForCurrent),
      DateUtils.filterDeltas[period],
      false
    );

    /**
     * * FETCHING ALL TRANSACTIONS
     */
    await TokenService.getTransactions('', '')
      .then((res) => {
        const { data: transactions } = res;

        /**
         * * FULL TRANSACTIONS DATA FOR
         * * CURRENT AND PREVIOUS
         * * PERIODS
         */
        const currentPeriodTransactions = filterTransactionsByDate(
          transactions,
          filterMinDateForCurrent.toISOString(),
          DateUtils.addDeltaToDate(
            today,
            { months: 0, years: 0, days: 1 },
            true
          ).toISOString()
        );

        const previousPeriodTransactions = filterTransactionsByDate(
          transactions,
          filterMinDateForPrevious.toISOString(),
          filterMinDateForCurrent.toISOString()
        );

        /**
         * * GETTING CURRENT AND PREVIOUS SUMMARY DATA
         * * SEPARATELY
         */
        const currentPeriodTransactionsValues = getPeriodSummaryValues(
          currentPeriodTransactions
        );

        const previousPeriodTransactionsValues = getPeriodSummaryValues(
          previousPeriodTransactions
        );

        set({
          mintedTokens: {
            currentValue: currentPeriodTransactionsValues.mintedTokens,
            previousValue: previousPeriodTransactionsValues.mintedTokens
          },
          transactionVolume: {
            currentValue: currentPeriodTransactionsValues.transactionVolume,
            previousValue: previousPeriodTransactionsValues.transactionVolume
          }
        });

        /**
         * * CONVERTING THE DATA TO TABLE READABLE
         */

        let transactionsTableData: TransactionTableData[] = [];

        if (period === Period.monthly) {
          const currentYear = new Date().getFullYear();
          const currentMonth = new Date().getMonth();

          /**
           * * GETTING WEEKS RANGE OF MONTH
           */

          const weeksRanges = getFullWeeksStartAndEndInMonth(
            currentMonth,
            currentYear,
            0
          );

          /**
           * * CREATING THE DEFAULT TABLE CONTENT FOR WEEKS
           */

          const defaultMonthlyCategories = weeksRanges.reduce(
            (acc, curr, index) => {
              if (curr.start > curr.end && index === 0) {
                curr.start = 1;
              }

              if (
                curr.start > curr.end &&
                index === Object.keys(weeksRanges).length - 1
              ) {
                return acc;
              }

              const currentRange = `${curr.start}-${currentMonth + 1} — ${
                curr.end
              }-${currentMonth + 1}`;

              return [
                ...acc,
                {
                  date: currentRange,
                  issuedTokens: 0,
                  transactionVolume: 0
                }
              ];
            },
            [] as TransactionTableData[]
          );

          /**
           * * FINDING THE DATA IN THE WEEKS RANGES AND PASTING
           * * THE AMOUNTS INSIDE ITEM
           */
          transactionsTableData = currentPeriodTransactions
            .filter(
              (transaction) =>
                new Date(transaction.createdAt).getMonth() === currentMonth
            )
            .reduce((acc, curr) => {
              const currDate = DateUtils.dateToString(
                new Date(curr.createdAt)
              ).split('-')[0];

              const currentCategory = defaultMonthlyCategories.find(
                (category) => {
                  const [start, end] = category.date.split(' — ');

                  return (
                    Number(currDate) >= Number(start.split('-')[0]) &&
                    Number(currDate) <= Number(end.split('-')[0])
                  );
                }
              )?.date;

              const categoryRow = acc.find(
                (row) => row.date === currentCategory
              );

              const index = categoryRow && acc.indexOf(categoryRow);

              const temp = [...acc];

              if (index != null) {
                temp[index] = {
                  ...temp[index],
                  issuedTokens: temp[index].issuedTokens + curr.amount,
                  transactionVolume: temp[index].transactionVolume + curr.amount
                };
              }

              return temp;
            }, defaultMonthlyCategories);
        }

        if (period === Period.weekly) {
          const datesList = Array.from(
            new Set(
              currentPeriodTransactions.map((transaction) =>
                DateUtils.dateToString(transaction.createdAt, false)
              )
            )
          );

          const defaultWeeklyCategories = datesList.map(
            (date) => ({
              date,
              issuedTokens: 0,
              transactionVolume: 0
            }),
            [] as TransactionTableData[]
          );

          transactionsTableData = currentPeriodTransactions.reduce(
            (acc, curr) => {
              const currentTransactionDate = DateUtils.dateToString(
                curr.createdAt,
                false
              );

              const transactionsDateRow = acc.find(
                (row) => row.date === currentTransactionDate
              );

              const index =
                transactionsDateRow && acc.indexOf(transactionsDateRow);

              const temp = [...acc];

              if (index != null) {
                temp[index] = addToObject(temp[index], {
                  issuedTokens: curr.amount,
                  transactionVolume: curr.amount
                });
              }

              return temp;
            },
            defaultWeeklyCategories
          );
        }

        if (period === Period.daily) {
          const datesList = Array.from(
            new Set(
              currentPeriodTransactions.map(
                (transaction) =>
                  `${
                    DateUtils.dateToString(
                      new Date(transaction?.createdAt),
                      true
                    ).split(':')[0]
                  }:00`
              )
            )
          );

          const defaultDailyCategories = datesList.map((date) => ({
            date,
            issuedTokens: 0,
            transactionVolume: 0
          }));

          transactionsTableData = currentPeriodTransactions.reduce(
            (acc, curr) => {
              const date = DateUtils.dateToString(
                new Date(curr?.createdAt),
                true
              );

              const transactionRow = acc.find(
                (row) => row.date.split(':')[0] === date.split(':')[0]
              );

              const index = transactionRow && acc.indexOf(transactionRow);

              const temp = [...acc];

              if (index) {
                temp[index] = addToObject(temp[index], {
                  issuedTokens: curr.amount,
                  transactionVolume: curr.amount
                });
              }

              return temp;
            },
            defaultDailyCategories
          );
        }

        set({ transactionsTableData });
      })
      .finally(() => delay(200).then(() => set({ isFetching: false })));
  },

  getActiveUsers: async () => {
    await UserService.getAllUsers().then((res) => {
      const { data: users } = res;

      const activeUsers = users.filter(
        (user) => !user.isBlocked && user.isApproved
      ).length;

      set({
        activeUsers: {
          previousValue: activeUsers,
          currentValue: activeUsers
        }
      });
    });
  },

  exportCSV: () => {
    const {
      period,
      activeUsers,
      mintedTokens,
      transactionVolume,
      transactionsTableData
    } = get();
    const summaryDataToExport = [
      { item: 'Active users', ...activeUsers },
      { item: 'Tokens Minted', ...mintedTokens },
      { item: 'Transaction Volume', ...transactionVolume }
    ];

    const csvSummary = convertArrayToCSV(summaryDataToExport);

    const csvTransactions = convertArrayToCSV(transactionsTableData);

    downloadFile(
      [csvSummary],
      `ACE-summary-${period}-${DateUtils.dateToString(new Date())}`
    );

    downloadFile(
      [csvTransactions],
      `ACE-transactions-${period}-${DateUtils.dateToString(new Date())}`
    );
  }
}));

export default useTokenStore;
