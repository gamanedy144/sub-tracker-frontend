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
import { addDays, format } from 'date-fns';
import { calendarColors, typeColors } from '../resources/theme';
import useTransactions from '../hooks/useTransactions';
import UpdateSubCard from './UpdateSubCard';
import { Transaction } from '../models/Transaction';
const Calendar = () => {
  const { sortedData: subscriptions } = useSubscriptions();
  const { sortedData: transactions } = useTransactions();

  const [isAdding, setIsAdding] = useState(false);
  const [subscriptionToEdit, setSubscriptionToEdit] = useState();
  const [selectedSubscription, setSelectedSubscription] = useState();

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
        Math.ceil((endDate - today) / (24 * 60 * 60 * 1000))
      );
      return Math.min(remainingDays, 365); // Limit to the remaining days or until the end of the year
    }

    return 365; // If there's no endDate, display events for the entire year
  };

  const generateEvents = (subscription: Subscription) => {
    const events = [];
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
        const event = {
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
    const events = [];

    transactions.forEach((transaction) => {
      const color =
        calendarColors[transaction.subscription.type.toLowerCase()] || 'gray';
      const event = {
        title: transaction.subscription.subscriptionName,
        start: new Date(transaction.timestamp),
        allDay: true,
        color, // You can set a default color
        transaction: transaction,
        subscription: transaction.subscription,
        subscriptionType: transaction.subscription.type,
      };

      events.push(event);
    });

    return events;
  };

  const transactionEvents = generateEventsFromTransactions(transactions);

  const events = subscriptions
    ? subscriptions.reduce(
        (allEvents, subscription) =>
          allEvents.concat(generateEvents(subscription)),
        []
      )
    : [];

  const allEvents = [...events, ...transactionEvents];

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

      <GridItem area="details" bg="dodgerblue">
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
