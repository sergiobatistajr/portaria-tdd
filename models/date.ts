function formatDateToLocal(dateStr: string, locale: string = "pt-BR") {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
}

export default Object.freeze({
  formatDateToLocal,
});
