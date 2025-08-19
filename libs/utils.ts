export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const formatterDate = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "long",
  });
  return formatterDate.format(date);
};

export const formatCurrency = (amount: number) => {
  const formatterCurrency = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumSignificantDigits: 3,
  });
  return formatterCurrency.format(amount);
};
