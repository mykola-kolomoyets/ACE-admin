/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';

import useProfileStore from '../../store/useProfileStore';
import useTokenStore from '../../store/useTokenStore';

import DashboardIcon from '../../icons/Dashboard';
import UsersIcon from '../../icons/Users';
import ShieldIcon from '../../icons/Shield';

import { Period } from '../../utils/enums/common';

import {
  createDashboardRows,
  createDatasets,
  createSummaryData,
  transactionsTableHeaders,
  transactionsTableTitle
} from './dashboard.constants';
import useNavbarStore from '../../store/useNavbarStore';

const summaryLabelsIcons = [UsersIcon, DashboardIcon, ShieldIcon];

const useDashboard = () => {
  const { setProfileData, token, email } = useProfileStore();
  const { setActiveItem } = useNavbarStore();
  const {
    period,
    isFetching,
    mintedTokens,
    transactionVolume,
    activeUsers,
    transactionsTableData,
    setPeriod,
    getTransactions,
    getActiveUsers
  } = useTokenStore();

  const [isDataEmpty, setIsDataEmpty] = useState(false);

  const transactionsTablesRows = useMemo(
    () => createDashboardRows(transactionsTableData),
    [transactionsTableData]
  );

  const onFilterChange = (period: Period) => setPeriod(period);

  const summaryLabelsData = useMemo(
    () =>
      createSummaryData({
        tokensMinted: mintedTokens,
        transactionVolume,
        activeUsers
      }).map((item, index) => ({ ...item, Icon: summaryLabelsIcons[index] })),
    [mintedTokens, transactionVolume, activeUsers]
  );

  const dashboardTableHeader = useMemo(
    () => transactionsTableHeaders[period],
    [period]
  );

  const chartData = useMemo(() => {
    return {
      labels: transactionsTableData.map((transaction) => transaction.date),
      datasets: [
        createDatasets(
          transactionsTableData.map((transaction) => transaction.issuedTokens),
          'tokensIssued'
        ),
        createDatasets(
          transactionsTableData.map(
            (transaction) => transaction.transactionVolume
          ),
          'transactionVolume'
        )
      ]
    };
  }, [period, transactionsTableData]);

  useEffect(() => {
    getActiveUsers();

    setActiveItem(0);
  }, []);

  useEffect(() => {
    if (!email) setProfileData();
  }, [email, token]);

  useEffect(() => {
    getTransactions();
  }, [period, getTransactions]);

  return {
    transactionsTableTitle,
    summaryLabelsData,
    activeFilter: period,
    transactionsTablesRows,
    dashboardTableHeader,
    onFilterChange,
    chartData,
    isFetching,
    isDataEmpty
  };
};

export default useDashboard;
