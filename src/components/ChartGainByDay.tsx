import React, {useState} from 'react';

import {createStyles, makeStyles} from '@material-ui/core/styles';
import MuiPaper from '@material-ui/core/Paper';
import MuiTypography from '@material-ui/core/Typography';
import MuiToolbar from '@material-ui/core/Toolbar';
import MuiTextField from '@material-ui/core/TextField';
import {DatePicker} from '@material-ui/pickers';

import ChartGain from './ChartGain';
import ordersStore from '../stores/ordersStore';
import ChartGainData from '../utils/ChartGainData';

const useStyles = makeStyles(() =>
  createStyles({
    options: {
      marginLeft: 'auto',
    },
  })
);

const ChartGainByDay: React.FC = () => {
  const classes = useStyles();
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <MuiPaper>
      <MuiToolbar>
        <MuiTypography variant="h6">Статистика продаж по дням</MuiTypography>
        <div className={classes.options}>
          <DatePicker
            autoOk
            disableFuture
            mask="__.__.____"
            views={['year', 'month']}
            value={selectedDate}
            onChange={(date: any) => handleDateChange(date)}
            renderInput={(props) => <MuiTextField {...props} />}
          />
        </div>
      </MuiToolbar>
      <ChartGain
        data={new ChartGainData().getDataByDay(
          ordersStore.getState(),
          selectedDate
        )}
      />
    </MuiPaper>
  );
};

export default ChartGainByDay;
