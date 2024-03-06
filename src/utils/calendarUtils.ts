import { addDays, eachDayOfInterval, endOfMonth, endOfWeek, startOfMonth, startOfWeek } from "date-fns";

export const generateDate = (
    month: number,
    year: number
  ): Date[] => {
    const arrayOfDate: Date[] = [];
  
    const firstDate = startOfMonth(new Date(year, month));
    const firstDateOfFirstWeek = startOfWeek(firstDate);
    const lastDate = endOfMonth(new Date(year, month));
    const lastDateOfLastWeek = endOfWeek(lastDate);
  
    const dates = eachDayOfInterval({
      start: firstDateOfFirstWeek,
      end: lastDateOfLastWeek,
    });
  
    for (const date of dates) {
      arrayOfDate.push(date);
    }
  
    if (arrayOfDate.length != 42){
      for (let i=0; i < 7; i++){
        const additionalDate = addDays(lastDateOfLastWeek, i+1);
        arrayOfDate.push(additionalDate);
      }
    }
  
    return arrayOfDate;
  };



export const RupiahFormatter = Intl.NumberFormat("id-ID", {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0
})