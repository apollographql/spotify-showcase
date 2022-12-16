import { useMemo } from 'react';
import { parseISO, formatDistanceToNow, sub, isBefore, format } from 'date-fns';

type DateFormatFn = (date: Date) => string;

interface DateTimeProps {
  date: string;
  format: DateFormatFn;
}

const isUselessDate = (date: Date) => date.getTime() === 0;

const DateTime = ({ date: dateString, format }: DateTimeProps) => {
  const date = useMemo(() => parseISO(dateString), [dateString]);

  const formattedDate = useMemo(
    () => (isUselessDate(date) ? null : format(date)),
    [date, format]
  );

  return <>{formattedDate}</>;
};

DateTime.FORMAT = {
  timeAgo: (date: Date) => {
    const lastMonth = sub(new Date(), { months: 1 });

    return isBefore(date, lastMonth)
      ? format(date, 'MMM d, yyyy')
      : `${formatDistanceToNow(date)} ago`;
  },
} as const;

export default DateTime;
