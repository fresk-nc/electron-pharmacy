import React, {useState} from 'react';

import {createStyles, makeStyles} from '@material-ui/core/styles';
import MuiPaper from '@material-ui/core/Paper';
import MuiTypography from '@material-ui/core/Typography';
import MuiToolbar from '@material-ui/core/Toolbar';
import MuiTextField from '@material-ui/core/TextField';
import {DatePicker} from '@material-ui/pickers';

import ChartGain from './ChartGain';
import ordersStore from '../stores/ordersStore';
import ChartGainByMonthData from '../utils/ChartGainByMonthData';

const useStyles = makeStyles(() =>
  createStyles({
    options: {
      marginLeft: 'auto',
    },
  })
);

const ChartGainByMonth: React.FC = () => {
  const classes = useStyles();
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <MuiPaper>
      <MuiToolbar>
        <MuiTypography variant="h6">Статистика продаж по месяцам</MuiTypography>
        <div className={classes.options}>
          <DatePicker
            autoOk
            disableFuture
            mask="__.__.____"
            views={['year']}
            value={selectedDate}
            onChange={(date: any) => handleDateChange(date)}
            renderInput={(props) => <MuiTextField {...props} />}
          />
        </div>
      </MuiToolbar>
      <ChartGain
        data={new ChartGainByMonthData().getData(
          ordersStore.getState(),
          selectedDate
        )}
      />
    </MuiPaper>
  );
};

export default ChartGainByMonth;
