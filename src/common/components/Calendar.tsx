export const scheduleReminder = (petName: string, date: string) => {
  const ms = new Date(date).getTime() - Date.now();
  if (ms > 0) {
    setTimeout(() => {
      new Notification(`Reminder: ${petName}'s appointment!`);
    }, ms);
  }
};
