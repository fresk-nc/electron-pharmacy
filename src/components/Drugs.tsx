import React, { useState } from 'react';
import { Column } from 'material-table';

import DrugRecord from '../records/DrugRecord';
import drugsStore from '../stores/drugsStore';
import snackbarStore from '../stores/snackbarStore';
import useStoreSubscribe from '../hooks/useStoreSubscribe';
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
    const [state, setState] = useState<TableState>({
        columns: [
            {
                title: 'Название',
                field: 'name',
                initialEditValue: ''
            },
            {
                title: 'Цена',
                field: 'price',
                type: 'currency',
                currencySetting: {
                    locale: 'ru',
                    currencyCode: 'RUB'
                },
                initialEditValue: 0
            },
            {
                title: 'Количество',
                field: 'count',
                type: 'numeric',
                initialEditValue: 0
            }
        ],
        data: drugsStore.getState()
    });

    useStoreSubscribe(drugsStore, (drugs: DrugRecord[]) => {
        setState((prevSate) => {
            return { ...prevSate, data: drugs };
        });
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
                onRowAdd: (newData) => {
                    return drugsStore.insert(
                        new DrugRecord(newData.name, newData.count, newData.price)
                    ).then(() => {
                        snackbarStore.setState({
                            text: 'Операция выполнена успешно!',
                            type: 'success'
                        });
                    }).catch((error) => {
                        snackbarStore.setState({
                            text: 'Упс, что-то пошло не так, попробуйте ещё раз!',
                            type: 'error'
                        });
                        return Promise.reject(error);
                    });
                },
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
