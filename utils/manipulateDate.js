import { format } from 'date-fns';

export const manipulateDate = (date) => {
  const createdAt = new Date(date);
  const formatDate = format(createdAt, 'yyyy-MM-dd HH:mm');

  return formatDate;
};
