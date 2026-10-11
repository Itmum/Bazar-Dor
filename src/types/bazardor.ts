export interface Catagory {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export interface IAllCategory {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: string;
    pct: number;
  };
}

export interface IFilterCategory {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: string;
    pct: number;
  };
}
export interface IMarketPrice {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface ISingleProduct {
  id: number;
  name: string;
  category: string;
  categoryNameBn?: string;
  categoryIcon?: string;
  unit?: string;
  today: number;
  change?: {
    dir: "up" | "down" | "equal";
    amt: number;
    pct: number;
    text?: string;
  };
  minPrice?: {
    price: number;
    market: string;
  };
  maxPrice?: {
    price: number;
    market: string;
  };
  avgPrice?: number;
  markets?: IMarketPrice[];
}
