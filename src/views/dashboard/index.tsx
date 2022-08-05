import ChartBadge from '../../components/chart-badge';
import ExportButton from '../../components/export -button';
import Filter from '../../components/filter';
import { LineChart } from '../../components/line-chart';
import Section from '../../components/section';
import SummaryItem from '../../components/summary-item';
import Table from '../../components/table';
import Typography from '../../components/typography';
import Spinner from '../../components/spinner';

import { ExportOption } from '../../utils/enums/button';
import { TitleView } from '../../utils/enums/typography';
import { hoc } from '../../utils/hoc';
import { chartBadges } from './dashboard.constants';

import useDashboard from './dashboard.hook';
import styles from './dashboard.module.scss';

const Dashboard = hoc(
  useDashboard,
  ({
    transactionsTableTitle,
    summaryLabelsData,
    activeFilter,
    transactionsTablesRows,
    dashboardTableHeader,
    onFilterChange,
    chartData,
    isFetching,
    isDataEmpty
  }) => (
    <section className={styles.dashboard}>
      <section className={styles.dashboard__title}>
        <Typography.Title view={TitleView.medium}>At a glance</Typography.Title>

        <div className={styles.dashboard__title_buttons}>
          <Filter activeFilter={activeFilter} onFilterChange={onFilterChange} />

          <ExportButton option={ExportOption.dashboard} />
        </div>
      </section>

      <section className={styles.dashboard__summary}>
        {summaryLabelsData.map((data, index) => (
          <SummaryItem
            key={data.label}
            isWithBadge={index !== 2}
            {...data}
            isFetching={isFetching}
          />
        ))}
      </section>

      {!isDataEmpty ? (
        chartData.labels.length ? (
          <Section className={styles.dashboard__chart}>
            <Typography.Title
              className={styles.dashboard__table_title}
              view={TitleView.small}
            >
              Totals
            </Typography.Title>

            <section className={styles.dashboard__chart_badges}>
              {chartBadges.map((badge) => (
                <ChartBadge key={`${badge.title}-${badge.color}`} {...badge} />
              ))}
            </section>

            <section className={styles.dashboard__chart_chart}>
              <LineChart
                chartData={chartData}
                tooltipsLabels={['Tokens issued', 'Transaction volume']}
              />
            </section>
          </Section>
        ) : null
      ) : null}

      <Section className={styles.dashboard__table}>
        <Typography.Title
          className={styles.dashboard__table_title}
          view={TitleView.small}
        >
          {transactionsTableTitle[activeFilter]}
        </Typography.Title>

        {isFetching ? (
          <Spinner />
        ) : (
          <Table
            thead={dashboardTableHeader}
            tbody={isDataEmpty ? [] : transactionsTablesRows}
            sortedFields={[0]}
            emptyState="No transactions for current period"
          />
        )}
      </Section>
    </section>
  )
);

export default Dashboard;
