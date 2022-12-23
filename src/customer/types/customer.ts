export interface Customer {
  id: number;
  name: string;
  email: string;
  address?: {
    line1: string;
    line2?: string;
    zip: string;
    street: string;
    state: string;
  };
}
