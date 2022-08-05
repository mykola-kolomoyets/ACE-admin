/* eslint-disable no-unused-vars */
import { TransactionTableData } from '../../store/useTokenStore';

import { Period } from '../../utils/enums/common';
import { TableCellTypes } from '../../utils/enums/table';
import { ChartBadgeProps } from '../../utils/types/common';
import { Summary, SummaryLabel } from '../../utils/types/summary';
import { Row } from '../../utils/types/table';

type TransactionsTableHeader = {
  [key in Period]: string[];
};
export const transactionsTableHeaders: TransactionsTableHeader = {
  [Period.daily]: ['Time', 'Tokens issued', 'Transaction volume'],
  [Period.weekly]: ['Date', 'Tokens issued', 'Transaction volume'],
  [Period.monthly]: ['Date', 'Tokens issued', 'Transaction volume']
};

export const createDashboardRows = (data: TransactionTableData[]): Row[] =>
  data.map(({ date, issuedTokens, transactionVolume }) => {
    return {
      cells: [
        {
          type: TableCellTypes.DATE,
          value: date
        },
        {
          type: TableCellTypes.AMOUNT,
          value: issuedTokens.toString()
        },
        {
          type: TableCellTypes.AMOUNT,
          value: transactionVolume.toString()
        }
      ]
    };
  });

export const createSummaryData = ({
  tokensMinted,
  transactionVolume,
  activeUsers
}: Summary): Omit<SummaryLabel, 'Icon' | 'isFetching'>[] => {
  return [
    {
      amount: tokensMinted,
      label: 'Tokens minted',
      isWithDecimalPart: true
    },
    {
      amount: transactionVolume,
      label: 'Transaction volume',
      isWithDecimalPart: true
    },
    {
      amount: activeUsers,
      label: 'Active users'
    }
  ];
};

export const transactionsTableTitle = {
  [Period.daily]: 'Per day',
  [Period.weekly]: 'Per week',
  [Period.monthly]: 'Per month'
};

const chartLineColors = {
  tokensIssued: '#28A745',
  transactionVolume: '#358ED7'
};

export const createDatasets = (
  data: number[],
  line: keyof typeof chartLineColors
) => ({
  fill: true,
  lineTension: 0,
  borderColor: chartLineColors[line],
  borderWidth: 2,
  pointBorderColor: chartLineColors[line],
  pointBackgroundColor: '#ffffff',
  backgroundColor: 'rgba(0, 0, 0, 0)',
  pointBorderWidth: 2,
  data,
  stepped: false
});

export const chartBadges: ChartBadgeProps[] = [
  {
    color: '#28A745',
    title: 'Tokens issued'
  },
  {
    color: '#358ED7',
    title: 'Transaction volume'
  }
];
