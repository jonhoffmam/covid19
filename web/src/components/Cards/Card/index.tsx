import React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import CountUp from 'react-countup';
import cx from 'classnames';

import styles from './styles.module.css';

const CardComponent = (props: any) => {
	const { className, cardTitle, value, lastUpdate, cardSubtitle, spacing } = props;
	return (
  <Grid item xs={12} md={spacing} component={Card} className={cx(styles.card, className)}>
    <CardContent>
      <Typography color="textSecondary" gutterBottom>
        {cardTitle}
      </Typography>
      <Typography variant="h5" component="h2">
        <CountUp start={0} end={value} duration={2.75} separator="." />
      </Typography>
      <Typography color="textSecondary">
        {lastUpdate === '01 de janeiro de 2000' || lastUpdate === 0 ? '-' : lastUpdate}
      </Typography>
      <Typography variant="body2" component="p">
        {cardSubtitle}
      </Typography>
    </CardContent>
  </Grid>
)};

export default CardComponent;