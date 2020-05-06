import React from 'react';
import { Formik } from 'formik';
import { MTableEditRow } from 'material-table';

const TableEditRow = (props: any) => (
    <Formik
        initialValues={props.data}
        validationSchema={props.validationSchema}
        onSubmit={newData => {
            delete newData.tableData;
            props.onEditingApproved(props.mode, newData, props.data);
        }}
    >
        {({submitForm}) => (
            <MTableEditRow {...props} onEditingApproved={submitForm} />
        )}
    </Formik>
);

export default TableEditRow;
