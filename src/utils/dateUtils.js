import { EVENT_CATEGORIES } from "../data/constants.js";

const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
const getFirstDay = (y, m) => new Date(y, m, 1).getDay();
const dateKey = (y, m, d) =>
  `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
const parseKey = (k) => {
  const [y, m, d] = k.split("-").map(Number);
  return { y, m: m - 1, d };
};
const getCatById = (id) =>
  EVENT_CATEGORIES.find((c) => c.id === id) || EVENT_CATEGORIES[0];

export { getDaysInMonth, getFirstDay, dateKey, parseKey, getCatById };
