import React from 'react';
import {Formik} from 'formik';
import {MTableEditRow} from 'material-table';

type Column = {
  field: string;
  initialEditValue: any;
};

const TableEditRow = (props: any) => {
  const initialValues =
    props.data ||
    props.columns.reduce((acc: Record<string, any>, column: Column) => {
      return {...acc, [column.field]: column.initialEditValue};
    }, {});

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={props.validationSchema}
      onSubmit={(values, actions) => {
        if (props.mode !== 'delete') {
          delete values.tableData;
        }

        props.onEditingApproved(props.mode, values, props.data);
      }}
    >
      {({submitForm}) => (
        <MTableEditRow {...props} onEditingApproved={submitForm} />
      )}
    </Formik>
  );
};

export default TableEditRow;
