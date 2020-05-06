import React from 'react';
import { Field, FieldProps, getIn } from 'formik';
import { MTableEditField } from 'material-table';

const TableEditField: React.FC = (props: any) => (
    <Field name={props.columnDef.field}>
        {(fieldProps: FieldProps) => {
            const { name } = fieldProps.field;
            const { errors, setFieldValue } = fieldProps.form;
            const showError = !!getIn(errors, name);

            return (
                <MTableEditField
                    {...props}
                    {...fieldProps.field}
                    error={showError}
                    onChange={(newValue: any) => setFieldValue(name, newValue)}
                />
            );
        }}
    </Field>
);

export default TableEditField;
