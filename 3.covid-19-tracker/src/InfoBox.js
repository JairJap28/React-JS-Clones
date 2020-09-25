import React from 'react';
import './InfoBox.css';
import { prettyPrintStat } from './util';

// MUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const InfoBox = ({ title, cases, total, active, type, ...props }) => {
    return (
        <Card 
            onClick={props.onClick}
            className={`infoBox 
            ${active && 'infoBox--selected'}
            ${ type === 1 ?
            'infoBox__active': type === 2 
                ? 'infoBox__recovered': 'infoBox__deaths' 
            }`}>
            <CardContent>
                <Typography className="infoBox__title" color="textSecondary">
                    {title}
                </Typography>
                <h2 className="infoBox__cases">{prettyPrintStat(cases)}</h2>
                <Typography  className="infoBox__total" color="textSecondary">
                    {prettyPrintStat(total)} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox;
