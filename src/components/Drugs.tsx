import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { ActionTypes } from '../ActionTypes';
import DrugRecord from '../records/DrugRecord';
import drugsStore from '../store/drugsStore';

const useStyles = makeStyles({
    table: {
        minWidth: 500,
    },
});

const Drugs: React.FC = () => {
    const classes = useStyles();
    const [ drugs, setDrugs ] = useState<DrugRecord[]>(drugsStore.drugs);

    /*
    const handleDrugsChange = (drugs: DrugRecord[]) => {
        setDrugs(drugs);
    };

    useEffect(() => {
        drugsStore.on(ActionTypes.DRUGS_UPDATED, handleDrugsChange);

        return () => {
            drugsStore.off(ActionTypes.DRUGS_UPDATED, handleDrugsChange);
        }
    });*/

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Название</TableCell>
                        <TableCell align="right">Цена</TableCell>
                        <TableCell align="right">Количество</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {drugs.map((drug) => (
                        <TableRow key={drug.name}>
                            <TableCell component="th" scope="row">{drug.name}</TableCell>
                            <TableCell align="right">{`${drug.price} ₽`}</TableCell>
                            <TableCell align="right">{`${drug.count} шт.`}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Drugs;
