import React from 'react';

import MuiGrid from '@material-ui/core/Grid';

import ChartGainByTime from './ChartGainByTime';
import ChartGainByDay from './ChartGainByDay';
import ChartGainByMonth from './ChartGainByMonth';

const Statistics: React.FC = () => {
  return (
    <MuiGrid container spacing={3}>
      <MuiGrid item xs={12}>
        <ChartGainByTime />
      </MuiGrid>
      <MuiGrid item xs={12}>
        <ChartGainByDay />
      </MuiGrid>
      <MuiGrid item xs={12}>
        <ChartGainByMonth />
      </MuiGrid>
    </MuiGrid>
  );
};

export default Statistics;
