var days = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
];

export const getDay = () => {
  var now = new Date();
  return days[now.getDay()];
};

export const getWeekOfMonth = function () {
  const date = new Date();
  var firstWeekday = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  var offsetDate = date.getDate() + firstWeekday - 1;
  return Math.floor(offsetDate / 7);
};
