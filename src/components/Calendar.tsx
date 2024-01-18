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
import { typeColors } from '../resources/theme';
const Calendar = () => {
  const { data: subscriptions } = useSubscriptions();

  const [selectedSubscription, setSelectedSubscription] = useState(null);
  //   const events = subscriptions.map((subscription) => ({
  //     title: subscription.subscriptionName,
  //     start: subscription.nextOccurrenceDate,
  //     allDay: true,
  //     subscription: subscription,
  //   }));

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

      const color = typeColors[eventType] || 'gray'; // Use gray as a default color

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
          start: eventDate.toISOString(),
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

  const events = subscriptions.reduce(
    (allEvents, subscription) => allEvents.concat(generateEvents(subscription)),
    []
  );

  const handleEventClick = (info) => {
    setSelectedSubscription(info.event.extendedProps.subscription);
  };

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
          events={events}
          eventClick={handleEventClick}
        />
      </GridItem>

      <GridItem area="details" bg="dodgerblue">
        {selectedSubscription && (
          <SubscriptionDetails subscription={selectedSubscription} />
        )}
      </GridItem>
    </Grid>
  );
};

export default Calendar;
