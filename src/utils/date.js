import dayjs from "dayjs";

export const calculateDueDate = (borrowDate = new Date(), loanDays = 14) =>
  dayjs(borrowDate).add(loanDays, "day").toDate();

export const isOverdue = (dueDate) => dayjs().isAfter(dayjs(dueDate), "day");

