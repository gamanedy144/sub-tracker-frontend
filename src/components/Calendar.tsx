import {
  Card,
  CardBody,
  CardHeader,
  Grid,
  GridItem,
  Heading,
  Text,
} from '@chakra-ui/react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import useSubscriptions from '../hooks/useSubscriptions';
import { useState } from 'react';
import SubscriptionDetails from './SubscriptionDetails';
import { Subscription } from '../models/Subscription';
import { addDays } from 'date-fns';
import { calendarColors } from '../resources/theme';
import useTransactions from '../hooks/useTransactions';
import UpdateSubCard from './UpdateSubCard';
import { Transaction } from '../models/Transaction';
import { SubscriptionTypeEnum } from '../utils/subscriptionEnums';
interface Event {
  title: string;
  start: Date;
  allDay: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  color: any;
  transaction?: Transaction;
  subscriptionType: SubscriptionTypeEnum;
  subscription: Subscription;
}
const Calendar = () => {
  const { sortedData: subscriptions } = useSubscriptions();
  const { sortedData: transactions } = useTransactions();

  const [isAdding, setIsAdding] = useState(false);
  const [subscriptionToEdit, setSubscriptionToEdit] =
    useState<Subscription | null>();
  const [selectedSubscription, setSelectedSubscription] =
    useState<Subscription | null>();

  const handleClickEdit = (subscription: Subscription) => {
    setIsAdding(true);
    setSubscriptionToEdit(subscription);
  };

  const handleEventClick = (info) => {
    setSelectedSubscription(info.event.extendedProps.subscription);
    console.log(info.event.extendedProps.transaction);
    setIsAdding(false);
  };
  const onClickHandle = () => {
    setIsAdding(!isAdding);
    setSelectedSubscription(null);
  };

  const calculateDaysToDisplay = (endDate: Date | null) => {
    if (endDate) {
      const today = new Date();
      const remainingDays = Math.max(
        0,
        Math.ceil((endDate.valueOf() - today.valueOf()) / (24 * 60 * 60 * 1000))
      );
      return Math.min(remainingDays, 365); // Limit to the remaining days or until the end of the year
    }

    return 365; // If there's no endDate, display events for the entire year
  };

  const generateEvents = (subscription: Subscription) => {
    const events: Event[] = [];
    const endDate = subscription.endDate
      ? new Date(subscription.endDate)
      : null;
    const daysToDisplay = calculateDaysToDisplay(endDate); // Number of days to display events

    for (let i = 0; i < daysToDisplay; i++) {
      const eventDate = addDays(subscription.nextOccurrenceDate, i);
      const eventType = subscription.type.toLowerCase(); // Ensure lowercase for matching

      const color = calendarColors[eventType] || 'gray'; // Use gray as a default color

      // Customize the event based on subscription type
      if (
        (eventType === 'daily' && i % 1 === 0) ||
        (eventType === 'weekly' && i % 7 === 0) ||
        (eventType === 'bimonthly' && i % 14 === 0) ||
        (eventType === 'monthly' && i % 30 === 0) ||
        (eventType === 'yearly' && i % 365 === 0)
      ) {
        const event: Event = {
          title: subscription.subscriptionName,
          start: eventDate,
          allDay: true,
          color,
          subscriptionType: subscription.type, // Custom property to store subscription type
          subscription: subscription,
        };

        events.push(event);
      }
    }

    return events;
  };
  const generateEventsFromTransactions = (transactions: Transaction[]) => {
    const events: Event[] = [];

    transactions.forEach((transaction) => {
      const color =
        calendarColors[transaction.subscription.type.toLowerCase()] || 'gray';
      const event: Event = {
        title: transaction.subscription.subscriptionName,
        start: new Date(transaction.timestamp),
        allDay: true,
        color,
        transaction: transaction,
        subscription: transaction.subscription,
        subscriptionType: transaction.subscription.type,
      };

      events.push(event);
    });

    return events;
  };

  const transactionEvents = transactions
    ? generateEventsFromTransactions(transactions)
    : null;

  const events = subscriptions
    ? subscriptions.reduce((allEvents: Event[], subscription) => {
        return (allEvents = [...allEvents, ...generateEvents(subscription)]);
      }, [])
    : [];

  const allEvents = transactionEvents
    ? [...events, ...transactionEvents]
    : [...events];

  return (
    <Grid
      templateAreas={` "calendar details"`}
      templateColumns={{
        sm: '1fr',
        lg: '3fr 1fr',
      }}
      paddingX={10}
      paddingY={5}
      gap={5}
      height="90%"
    >
      <GridItem area="calendar" overflowY="auto">
        <FullCalendar
          height="100%"
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={allEvents}
          eventClick={handleEventClick}
        />
      </GridItem>

      <GridItem area="details">
        {!isAdding &&
          subscriptions &&
          subscriptions.length > 0 &&
          (selectedSubscription ? (
            <SubscriptionDetails
              subscription={selectedSubscription}
              handleEditClick={handleClickEdit}
            />
          ) : (
            <Card width="100%">
              <CardHeader mb={-5}>
                <Heading fontSize={32}>Details</Heading>
              </CardHeader>
              <CardBody>
                <Text>Click on any subscription to show details</Text>
              </CardBody>
            </Card>
          ))}
        <UpdateSubCard
          clicked={isAdding}
          onClickHandle={onClickHandle}
          subscriptionToUpdate={subscriptionToEdit}
        />
      </GridItem>
    </Grid>
  );
};

export default Calendar;
