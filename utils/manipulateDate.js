import { format, isValid } from 'date-fns';

export const manipulateDate = (date) => {
  const createdAt = new Date(date);

  if (!isValid(date)) {
    return '';
  }
  
  const formatDate = format(createdAt, 'yyyy-MM-dd HH:mm');

  return formatDate;
};
