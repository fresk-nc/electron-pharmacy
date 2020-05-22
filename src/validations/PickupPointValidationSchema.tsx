import * as Yup from 'yup';

const PickupPointValidationSchema = Yup.object().shape({
  pharmacyName: Yup.string()
    .min(2, 'Too Short!')
    .max(140, 'Too Long!')
    .required('Required'),
  address: Yup.string()
    .min(2, 'Too Short!')
    .max(140, 'Too Long!')
    .required('Required'),
  workTime: Yup.string()
    .min(2, 'Too Short!')
    .max(140, 'Too Long!')
    .required('Required'),
  deliveryPrice: Yup.number().min(0, 'Negative!').required('Required'),
});

export default PickupPointValidationSchema;
