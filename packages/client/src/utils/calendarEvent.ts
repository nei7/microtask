export const parseHour = (data: string) => {
   const [hour, minute] = data.split(':');

   return {
      hour: parseInt(hour),
      minute: parseInt(minute),
   };
};

export const parseDate = (date: string) => {
   const [year, month, day] = date.split('-');

   return {
      year: parseInt(year),
      month: parseInt(month),
      day: parseInt(day),
   };
};

export const formatDate = ({
   year,
   month,
   day,
}: {
   year: number;
   month: number;
   day: number;
}) => {
   return `${year}-${('0' + month).slice(-2)}-${('0' + day).slice(-2)}`;
};
