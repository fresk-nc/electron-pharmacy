import React, {useState} from 'react';
import formatISO from 'date-fns/formatISO';
import {useHistory} from 'react-router-dom';

import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import MuiTable from '@material-ui/core/Table';
import MuiTableBody from '@material-ui/core/TableBody';
import MuiTableCell from '@material-ui/core/TableCell';
import MuiTableHead from '@material-ui/core/TableHead';
import MuiTableRow from '@material-ui/core/TableRow';
import MuiGrid from '@material-ui/core/Grid';
import MuiCard from '@material-ui/core/Card';
import MuiCardContent from '@material-ui/core/CardContent';
import MuiTypography from '@material-ui/core/Typography';
import MuiTextField from '@material-ui/core/TextField';
import MuiButton from '@material-ui/core/Button';
import MuiIconButton from '@material-ui/core/IconButton';
import MuiBox from '@material-ui/core/Box';
import MuiDeleteOutline from '@material-ui/icons/DeleteOutline';
import MuiAutocomplete from '@material-ui/lab/Autocomplete';

import CurrencyFormatter from '../utils/CurrencyFormatter';
import useStoreSubscribe from '../hooks/useStoreSubscribe';
import drugsStore from '../stores/drugsStore';
import pickupPointsStore from '../stores/pickupPointsStore';
import ordersStore from '../stores/ordersStore';
import DrugRecord from '../records/DrugRecord';
import PickupPointRecord from '../records/PickupPointRecord';
import OrderRecord from '../records/OrderRecord';
import OrderItemRecord from '../records/OrderItemRecord';
import notificationsStore from '../stores/notificationsStore';
import NotificationRecord from '../records/NotificationRecord';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    countField: {
      width: '6ch',
    },
    actionCell: {
      width: '6ch',
    },
    orderDataSection: {
      marginTop: theme.spacing(2),
    },
    createButton: {
      marginTop: theme.spacing(2),
    },
  })
);

const NewOrder: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const [drugsState, setDrugsState] = useState<DrugRecord[]>(
    drugsStore.getState().filter((drug) => drug.count > 0)
  );
  const [pickupPointsState, setPickupPointsState] = useState<
    PickupPointRecord[]
  >(pickupPointsStore.getState());
  const [ordersState, setOrdersState] = useState<OrderRecord[]>(
    ordersStore.getState()
  );
  const [drugNameState, setDrugNameState] = useState('');

  useStoreSubscribe(drugsStore, setDrugsState);
  useStoreSubscribe(pickupPointsStore, setPickupPointsState);
  useStoreSubscribe(ordersStore, setOrdersState);

  const [orderState, setOrderState] = useState<OrderRecord>(
    new OrderRecord({
      id: ordersState.length ? ordersState[ordersState.length - 1].id + 1 : 100,
      datetime: formatISO(new Date()),
      status: 'Новый',
      phone: '',
      pickupPoint: '',
      drugs: [],
    })
  );

  const handleAddDrugClick = () => {
    const drug = drugsState.find((drug) => drug.name === drugNameState);

    if (!drug) {
      return;
    }
    const order: OrderRecord = new OrderRecord({...orderState});
    order.addItem(
      new OrderItemRecord({name: drug.name, count: 1, price: drug.price})
    );
    setOrderState(order);
    setDrugNameState('');
  };
  const handleRemoveDrugClick = (drug: OrderItemRecord) => {
    const order: OrderRecord = new OrderRecord({...orderState});
    order.removeItem(drug);
    setOrderState(order);
  };
  const handleDrugCountChange = (drug: OrderItemRecord, value: string) => {
    const drugFromStore = drugsState.find(({name}) => name === drug.name);

    if (!drugFromStore) {
      return;
    }
    const count = Number(value);

    if (count === 0 || count > drugFromStore.count) {
      return;
    }

    const order: OrderRecord = new OrderRecord({...orderState});
    order.updateItem(
      drug,
      new OrderItemRecord({name: drug.name, count: count, price: drug.price})
    );
    setOrderState(order);
  };
  const handlePhoneChange = (event: any) => {
    setOrderState(new OrderRecord({...orderState, phone: event.target.value}));
  };
  const handleAddressChange = (_: any, value: PickupPointRecord | null) => {
    setOrderState(
      new OrderRecord({...orderState, pickupPoint: value ? value.address : ''})
    );
  };
  const handleCreateClick = () => {
    ordersStore
      .insert(orderState)
      .then(() => {
        notificationsStore.insert(
          new NotificationRecord({
            text: 'Операция выполнена успешно!',
            type: 'success',
          })
        );
        drugsStore.reduceDrugsCount(orderState);
        history.push('/orders');
      })
      .catch((error) => {
        notificationsStore.insert(
          new NotificationRecord({
            text: 'Упс, что-то пошло не так, попробуйте ещё раз!',
            type: 'error',
          })
        );
        return Promise.reject(error);
      });
  };

  return (
    <MuiCard>
      <MuiCardContent>
        <MuiGrid container spacing={3}>
          <MuiGrid item xs={12}>
            <MuiTypography variant="h5">Создание заказа</MuiTypography>
          </MuiGrid>
          <MuiGrid item xs={12}>
            <MuiGrid container spacing={2} alignItems="center">
              <MuiGrid item xs={6}>
                <MuiAutocomplete
                  options={drugsState}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <MuiTextField
                      {...params}
                      label="Название товара"
                      margin="normal"
                    />
                  )}
                  inputValue={drugNameState}
                  onInputChange={(_: any, value: any) => {
                    setDrugNameState(value);
                  }}
                  noOptionsText="Нет такого товара"
                />
              </MuiGrid>
              <MuiGrid item xs={6}>
                <MuiButton
                  variant="contained"
                  color="primary"
                  onClick={handleAddDrugClick}
                  disabled={!drugNameState}
                >
                  Добавить товар
                </MuiButton>
              </MuiGrid>
            </MuiGrid>
          </MuiGrid>
          <MuiGrid item xs={12}>
            <MuiTypography variant="h6">Добавленные товары</MuiTypography>
          </MuiGrid>
          <MuiGrid item xs={12}>
            {orderState.drugs.length ? (
              <MuiTable>
                <MuiTableHead>
                  <MuiTableRow>
                    <MuiTableCell className={classes.actionCell}>
                      Действия
                    </MuiTableCell>
                    <MuiTableCell>Название</MuiTableCell>
                    <MuiTableCell>Количество</MuiTableCell>
                    <MuiTableCell>Цена</MuiTableCell>
                  </MuiTableRow>
                </MuiTableHead>
                <MuiTableBody>
                  {orderState.drugs.map((item) => (
                    <MuiTableRow key={item.name}>
                      <MuiTableCell component="th" scope="row" padding="none">
                        <MuiIconButton
                          color="inherit"
                          onClick={() => {
                            handleRemoveDrugClick(item);
                          }}
                        >
                          <MuiDeleteOutline />
                        </MuiIconButton>
                      </MuiTableCell>
                      <MuiTableCell>{item.name}</MuiTableCell>
                      <MuiTableCell>
                        <MuiTextField
                          className={classes.countField}
                          value={item.count}
                          onChange={(event) => {
                            handleDrugCountChange(item, event.target.value);
                          }}
                          type="number"
                        />
                      </MuiTableCell>
                      <MuiTableCell>
                        {new CurrencyFormatter(
                          item.price * item.count
                        ).format()}
                      </MuiTableCell>
                    </MuiTableRow>
                  ))}
                  <MuiTableRow>
                    <MuiTableCell colSpan={2} />
                    <MuiTableCell>Стоимость доставки</MuiTableCell>
                    <MuiTableCell>
                      {new CurrencyFormatter(
                        orderState.getDeliveryPrice()
                      ).format()}
                    </MuiTableCell>
                  </MuiTableRow>
                  <MuiTableRow>
                    <MuiTableCell colSpan={2} />
                    <MuiTableCell>Итого</MuiTableCell>
                    <MuiTableCell>
                      <MuiBox fontWeight="fontWeightBold">
                        {new CurrencyFormatter(
                          orderState.getTotalPrice()
                        ).format()}
                      </MuiBox>
                    </MuiTableCell>
                  </MuiTableRow>
                </MuiTableBody>
              </MuiTable>
            ) : (
              'Вы пока не добавили товары'
            )}
          </MuiGrid>
          <MuiGrid item xs={12} className={classes.orderDataSection}>
            <MuiTypography variant="h6">Данные заказа</MuiTypography>
          </MuiGrid>
          <MuiGrid item xs={12}>
            <MuiGrid container spacing={2} direction="column">
              <MuiGrid item xs={6}>
                <MuiTextField
                  fullWidth
                  label="Номер телефона"
                  value={orderState.phone}
                  onChange={handlePhoneChange}
                />
              </MuiGrid>
              <MuiGrid item xs={6}>
                <MuiAutocomplete
                  options={pickupPointsState}
                  getOptionLabel={(option) =>
                    `${option.pharmacyName}, ${option.address}`
                  }
                  renderInput={(params) => (
                    <MuiTextField {...params} label="Пункт доставки" />
                  )}
                  onChange={handleAddressChange}
                />
              </MuiGrid>
            </MuiGrid>
          </MuiGrid>
          <MuiGrid item xs={12}>
            <MuiButton
              className={classes.createButton}
              variant="contained"
              color="primary"
              onClick={handleCreateClick}
              disabled={
                orderState.drugs.length === 0 ||
                !orderState.phone ||
                !orderState.pickupPoint
              }
            >
              Создать
            </MuiButton>
          </MuiGrid>
        </MuiGrid>
      </MuiCardContent>
    </MuiCard>
  );
};

export default NewOrder;
