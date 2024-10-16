import { CustomError } from '@/lib/interfaces/utilities/custom-error/custom-error';
import { TicketAnalyticsType } from '@/lib/types/layout/tickets/ticket-analytics/ticket-analytics-type';
import { useEffect, useState } from 'react';

export const useTicketAnalytics = () => {
  const [ticketsAnalyticsLoading, setTicketsAnalyticsLoading] =
    useState<boolean>(true);
  const [ticketsAnalyticsError, setTicketsAnalyticsError] =
    useState<CustomError | null>(null);

  const [ticketsPerMonth, setTicketsPerMonth] = useState<TicketAnalyticsType>(
    [],
  );
  const [ticketsByCategory, setTicketsByCategory] =
    useState<TicketAnalyticsType>([]);
  const [ticketsByStatus, setTicketsByStatus] = useState<TicketAnalyticsType>(
    [],
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          totalTicketsPerMonth,
          totalTicketsByCategory,
          totalTicketsByStatus,
        ] = await Promise.all([
          fetch('/api/tickets/analytics/total-tickets-per-month').then(res =>
            res.json(),
          ),
          fetch('/api/tickets/analytics/total-tickets-by-category').then(res =>
            res.json(),
          ),
          fetch('/api/tickets/analytics/total-tickets-by-status').then(res =>
            res.json(),
          ),
        ]);

        setTicketsPerMonth(totalTicketsPerMonth);
        setTicketsByCategory(totalTicketsByCategory);
        setTicketsByStatus(totalTicketsByStatus);
      } catch (error) {
        const customError = error as CustomError;
        setTicketsAnalyticsError(customError);
      } finally {
        setTicketsAnalyticsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    ticketsAnalyticsLoading,
    ticketsAnalyticsError,
    ticketsPerMonth,
    ticketsByCategory,
    ticketsByStatus,
  };
};
