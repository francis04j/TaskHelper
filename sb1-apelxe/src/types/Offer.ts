export interface Offer {
    id: string;
    amount: number;
    description: string;
    createdAt: string;
    user: {
      id: string;
      name: string;
      profilePicture?: string;
    };
    status: 'pending' | 'accepted' | 'rejected';
  }