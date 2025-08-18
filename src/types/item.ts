export type Item = {
  id: string;
  title: string;
  price: number;
  img: string;
};

export type CartLine = {
  id: string;
  qty: number;
};

export type CartItemFull = Item & { qty: number; lineTotal: number };
