import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {createStyles, makeStyles} from '@material-ui/core/styles';

import formatCurrency from '../utils/formatCurrency';

const useStyles = makeStyles(() =>
  createStyles({
    chart: {
      width: '100%',
      height: 300,
    },
  })
);

interface ChartGainProps {
  data?: ReadonlyArray<object>;
}

const ChartGain: React.FC<ChartGainProps> = (props: ChartGainProps) => {
  const classes = useStyles();

  return (
    <div className={classes.chart}>
      <ResponsiveContainer>
        <BarChart
          data={props.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value: any) => formatCurrency(value)} />
          <Legend />
          <Bar dataKey="value" name="Выручка" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartGain;
