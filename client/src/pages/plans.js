import { PlanFreeIcon, PlanStarterIcon, PlanPremiumIcon } from '../assets';

export const PLANS = {
  artistPLans: [
    {
      subscription: 'Artist',
      icon: <PlanFreeIcon />,
      price: 0,
      caption: 'forever',
      lists: [
        { text: 'Unlimited music uploads to all Major stores worldwide', isAvailable: true },
        { text: '100% copyright owner', isAvailable: true },
        { text: 'Fast delivery to all stores then Anywhere else', isAvailable: false },
        { text: 'Royalty share', isAvailable: false },
        { text: '85% Royalty revenue', isAvailable: false },
        { text: 'Content ID', isAvailable: false },
        { text: 'Multi marketing platform tools', isAvailable: false }
      ],
      labelAction: 'Choose Artist'
    },
    {
      subscription: 'Artist Pro',
      icon: <PlanStarterIcon />,
      price: '18,99',
      caption: 'saving $24 a year',
      lists: [
        { text: 'Unlimited music uploads to all Major stores worldwide', isAvailable: true },
        { text: '100% copyright owner', isAvailable: true },
        { text: 'Fast delivery to all stores then Anywhere else', isAvailable: true },
        { text: 'Royalty share', isAvailable: true },
        { text: '85% Royalty revenue', isAvailable: true },
        { text: 'Content ID', isAvailable: true },
        { text: 'Multi marketing platform tools', isAvailable: true }
      ],
      labelAction: 'choose Artist Pro'
    }
  ],
  labelPlans: [
    {
      subscription: 'Label',
      icon: <PlanFreeIcon />,
      price: 0,
      caption: 'forever',
      lists: [
        { text: 'Unlimited music uploads to all Major stores worldwide', isAvailable: true },
        { text: '100% copyright owner', isAvailable: true },
        { text: 'Fast delivery to all stores then Anywhere else', isAvailable: false },
        { text: 'Royalty share', isAvailable: false },
        { text: '85% Royalty revenue', isAvailable: false },
        { text: 'Content ID', isAvailable: false },
        { text: 'Multi marketing platform tools', isAvailable: false }
      ],
      labelAction: 'Choose Label'
    },
    {
      subscription: 'Label +',
      icon: <PlanStarterIcon />,
      price: '38,99',
      caption: 'saving $24 a year',
      lists: [
        { text: 'Unlimited music uploads to all Major stores worldwide', isAvailable: true },
        { text: '100% copyright owner', isAvailable: true },
        { text: 'Fast delivery to all stores then Anywhere else', isAvailable: true },
        { text: 'Royalty share', isAvailable: true },
        { text: '85% Royalty revenue', isAvailable: true },
        { text: 'Content ID', isAvailable: true },
        { text: 'Multi marketing platform tools', isAvailable: true }
      ],
      labelAction: 'Choose Label +'
    }
  ]
};
