export type Review = {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
};

export const reviews: Review[] = [
  {
    id: 'r1',
    name: 'Sofia K.',
    avatar: 'https://i.pravatar.cc/100?img=5',
    rating: 5,
    date: '2024-11-03',
    comment: 'Fast delivery and the quality is great. Favorites feature is super handy!',
  },
  {
    id: 'r2',
    name: 'Andrii P.',
    avatar: 'https://i.pravatar.cc/100?img=15',
    rating: 4,
    date: '2025-02-17',
    comment: 'Good prices, neat UI. Would love more color options for some items.',
  },
  {
    id: 'r3',
    name: 'Marta L.',
    avatar: 'https://i.pravatar.cc/100?img=32',
    rating: 5,
    date: '2025-03-22',
    comment: 'Support was quick to help with an exchange. Recommend this store!',
  },
  {
    id: 'r4',
    name: 'Oleksii R.',
    avatar: 'https://i.pravatar.cc/100?img=8',
    rating: 5,
    date: '2025-05-01',
    comment: 'The categories view is clean and intuitive. Found what I need in seconds.',
  },
  {
    id: 'r5',
    name: 'Iryna D.',
    avatar: 'https://i.pravatar.cc/100?img=48',
    rating: 4,
    date: '2025-07-11',
    comment: 'Nice selection and secure checkout. Will shop again.',
  },
];
