import React, {useState} from 'react';
import subWeeks from 'date-fns/subWeeks';

import {createStyles, makeStyles} from '@material-ui/core/styles';
import MuiPaper from '@material-ui/core/Paper';
import MuiTypography from '@material-ui/core/Typography';
import MuiToolbar from '@material-ui/core/Toolbar';
import MuiTextField from '@material-ui/core/TextField';
import {
  DateRangePicker,
  DateRange,
  DateRangeDelimiter,
} from '@material-ui/pickers';

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

const ChartGainByTime: React.FC = () => {
  const classes = useStyles();
  const [selectedDate, handleDateChange] = useState<DateRange>([
    subWeeks(new Date(), 1),
    new Date(),
  ]);

  return (
    <MuiPaper>
      <MuiToolbar>
        <MuiTypography variant="h6">
          Статистика продаж по времени суток
        </MuiTypography>
        <div className={classes.options}>
          <DateRangePicker
            disableFuture
            mask="__.__.____"
            calendars={1}
            startText=""
            endText=""
            value={selectedDate}
            onChange={(date: any) => handleDateChange(date)}
            renderInput={(startProps, endProps) => (
              <>
                <MuiTextField {...startProps} size="small" variant="standard" />
                <DateRangeDelimiter />
                <MuiTextField {...endProps} size="small" variant="standard" />
              </>
            )}
          />
        </div>
      </MuiToolbar>
      <ChartGain
        data={new ChartGainData().getDataByTime(
          ordersStore.getState(),
          selectedDate
        )}
      />
    </MuiPaper>
  );
};

export default ChartGainByTime;
