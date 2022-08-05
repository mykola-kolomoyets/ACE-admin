import { FC, useState } from 'react';

import useUserListStore from '../../store/useUserListStore';
import useTokenStore from '../../store/useTokenStore';

import CloudIcon from '../../icons/Cloud';

import { ButtonView, ExportOption } from '../../utils/enums/button';

import Button from '../button';
import Spinner from '../../icons/Spinner';
import { delay } from '../../utils/fn';

type ExportButtonProps = {
  option: ExportOption;
};

const ExportButton: FC<ExportButtonProps> = ({ option }) => {
  const [isFetching, setIsFetching] = useState(false);

  const { exportCSV: exportUserListCSV } = useUserListStore();
  const { exportCSV: exportDashboardCSV } = useTokenStore();

  const onClick = async () => {
    await setIsFetching(true);

    if (option === ExportOption.users) await exportUserListCSV();
    if (option === ExportOption.dashboard) await exportDashboardCSV();

    delay(250).then(() => setIsFetching(false));
  };

  return (
    <Button
      view={ButtonView.ghost}
      LeftAddon={isFetching ? undefined : CloudIcon}
      onClick={onClick}
    >
      {isFetching ? <Spinner width="16" height="16" /> : 'Export'}
    </Button>
  );
};

export default ExportButton;
