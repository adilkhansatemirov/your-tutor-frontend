export const filterClientOptions = (options, state) =>
  options.filter(
    (option) =>
      option.user.email.toLowerCase().includes(state.inputValue.toLowerCase()) ||
      `${option.user.first_name} ${option.user.last_name}`.toLowerCase().includes(state.inputValue.toLowerCase()),
  );

export const filterFreelancerOptions = (options, state) =>
  options.filter(
    (option) =>
      option.user.email.toLowerCase().includes(state.inputValue.toLowerCase()) ||
      `${option.user.first_name} ${option.user.last_name}`.toLowerCase().includes(state.inputValue.toLowerCase()),
  );

export const timeEntriesToInvoiceItems = (timeEntries, project) => {
  const invoiceItems = timeEntries.map((timeEntry) => ({
    time_entry_id: timeEntry.id,
    title: timeEntry.task,
    quantity: timeEntry.hours,
    price: project.student_payment_amount,
  }));
  return invoiceItems;
};
