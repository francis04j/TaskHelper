export interface TaskImage {
    data: string;
    contentType: string;
  }
  
  // export interface Task {
  //   id: string;
  //   title: string;
  //   description: string;
  //   location: string;
  //   lat: number | null;
  //   lng: number | null;
  //   dueDate: string;
  //   budget: number;
  //   isOnline: boolean;
  //   images: string[];
  //   status: 'OPEN' | 'ASSIGNED' | 'COMPLETED';
  //   createdAt: string;
  //   updatedAt: string;
  //   poster: string;
  //   offers: any[];
  //   questions: any[];
  // }

  export interface Task {
    id: string;
    title: string;
    description: string;
    location: string;
    lat: number | null;
    lng: number | null;
    dueDate: string;
    budget: number;
    status: 'OPEN' | 'ASSIGNED' | 'COMPLETED';
    category: string;
    poster: TaskMasterUser,
    offers: any[];
    questions: Question[];
    images: string[];
  }

  interface TaskMasterUser {
    id: string;
    name: string;
    // Add other user properties as needed
  }
  
  interface Reply {
    id: string;
    text: string;
    createdAt: Date;
    createdBy: TaskMasterUser;
    isAccepted?: boolean;
  }
  
  interface Question {
    id: string;
    text: string;
    createdAt: Date;
    askedBy: TaskMasterUser;
    replies: Reply[];
  }
  
  export interface TaskImage {
    data: string;
    contentType: string;
  }
  