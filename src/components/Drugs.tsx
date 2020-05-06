import React, { useEffect, useState, forwardRef } from 'react';
import { Column } from 'material-table';

import { ActionTypes } from '../ActionTypes';
import DrugRecord from '../records/DrugRecord';
import drugsStore from '../stores/drugsStore';
import DrugValidationSchema from '../validations/DrugValidationSchema';
import Table from './Table';
import TableEditField from './TableEditField';
import TableEditRow from './TableEditRow';

interface Row extends DrugRecord {}

interface TableState {
    columns: Array<Column<Row>>;
    data: Row[];
}

const Drugs: React.FC = () => {
    /*
    const handleDrugsChange = (drugs: DrugRecord[]) => {
        setDrugs(drugs);
    };

    useEffect(() => {
        drugsStore.on(ActionTypes.DRUGS_UPDATED, handleDrugsChange);

        return () => {
            drugsStore.off(ActionTypes.DRUGS_UPDATED, handleDrugsChange);
        }
    });
    */

    const [state, setState] = React.useState<TableState>({
        columns: [
            {
                title: 'Название',
                field: 'name'
            },
            {
                title: 'Цена',
                field: 'price',
                type: 'currency',
                currencySetting: {
                    locale: 'ru',
                    currencyCode: 'RUB'
                }
            },
            {
                title: 'Количество',
                field: 'count',
                type: 'numeric'
            }
        ],
        data: drugsStore.getData(),
    });

    return (
        <Table
            title="Лекарства"
            columns={state.columns}
            data={state.data}
            components={{
                EditRow: (props: any) => (
                    <TableEditRow
                        {...props}
                        validationSchema={DrugValidationSchema}
                    />
                ),
                EditField: TableEditField
            }}
            editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            setState((prevState) => {
                                const data = [...prevState.data];
                                data.push(newData);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                setState((prevState) => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            setState((prevState) => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
            }}
        />
    );
};

export default Drugs;
