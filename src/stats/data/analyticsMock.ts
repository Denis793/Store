export type Period = 'week' | 'month' | 'year';

export const lineDataWeek = [
  { name: 'Mon', orders: 120, buyers: 210 },
  { name: 'Tue', orders: 160, buyers: 250 },
  { name: 'Wed', orders: 150, buyers: 230 },
  { name: 'Thu', orders: 300, buyers: 420 },
  { name: 'Fri', orders: 210, buyers: 320 },
  { name: 'Sat', orders: 250, buyers: 360 },
  { name: 'Sun', orders: 170, buyers: 210 },
];

export const lineDataMonth = [
  { name: 'W1', orders: 1020, buyers: 1650 },
  { name: 'W2', orders: 1230, buyers: 1890 },
  { name: 'W3', orders: 1310, buyers: 1980 },
  { name: 'W4', orders: 1560, buyers: 2280 },
];

export const lineDataYear = [
  { name: 'Jan', orders: 6500, buyers: 9800 },
  { name: 'Feb', orders: 7200, buyers: 10500 },
  { name: 'Mar', orders: 8000, buyers: 11300 },
  { name: 'Apr', orders: 7800, buyers: 11000 },
  { name: 'May', orders: 9000, buyers: 12500 },
  { name: 'Jun', orders: 9600, buyers: 13200 },
  { name: 'Jul', orders: 11000, buyers: 14800 },
  { name: 'Aug', orders: 12000, buyers: 16000 },
  { name: 'Sep', orders: 10500, buyers: 14500 },
  { name: 'Oct', orders: 11500, buyers: 15400 },
  { name: 'Nov', orders: 15000, buyers: 19800 },
  { name: 'Dec', orders: 18000, buyers: 22500 },
];

export const categoryPerformance = [
  { name: "Men's clothing", value: 34.7, prev: 31.8, color: '#60a5fa' },
  { name: "Women's clothing", value: 27.9, prev: 24.1, color: '#22c55e' },
  { name: 'Electronics', value: 23.6, prev: 19.4, color: '#f59e0b' },
  { name: 'Jewelery', value: 13.8, prev: 11.2, color: '#ef4444' },
];

export const donutDataBase = [
  { name: "Men's clothing", value: 1826, color: '#60a5fa' },
  { name: "Women's clothing", value: 1460, color: '#34d399' },
  { name: 'Electronics', value: 980, color: '#f59e0b' },
  { name: 'Jewelery', value: 520, color: '#ef4444' },
];

export const kpiBase = [
  { label: 'Checkout conversion', value: 48 },
  { label: 'Repeat purchase rate', value: 32 },
];
