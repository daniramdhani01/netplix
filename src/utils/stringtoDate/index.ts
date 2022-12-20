export const stringToDate = (string: string) => {
  const date : string[] = string.split(/[\s,-]+/);
  const months: string[] = [
    "Jan",
    "Febr",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const _date = `${months[Number(date[1])-1]} ${Number(date[2])}, ${date[0]}`
  return _date;
};
