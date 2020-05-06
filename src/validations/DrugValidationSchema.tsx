import * as Yup from 'yup';

const DrugValidationSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(140, 'Too Long!')
        .required('Required'),
    price: Yup.number()
        .min(0, 'Negative!')
        .required('Required'),
    count: Yup.number()
        .min(0, 'Negative!')
        .required('Required')
});

export default DrugValidationSchema;
