import { v4 as uuidv4 } from 'uuid';

const db = {
  users: [
    {
        id: 'e72a838e-385e-411d-a37e-30f0c252ff56',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashed_password_here',
        userType: 'tasker',
        profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg',
        dateOfBirth: '1985-05-15',
        mobileNumber: '+44 7700 900123',
        bankAccount: {
          sortCode: '12-34-56',
          accountNumber: '12345678'
        },
        billingAddress: '123 Main St, London, UK, SW1A 1AA',
        createdAt: '2023-01-01T00:00:00.000Z',
        rating: 4.8,
        tasksCompleted: 37,
        bio: 'Experienced handyman with a passion for home improvement.',
        skills: ['Home Repair', 'Furniture Assembly', 'Painting']
      },
      {
        id: '28037931-4868-4405-b631-916c9a28384c',
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'hashed_password_here',
        userType: 'taskee',
        profilePicture: 'https://randomuser.me/api/portraits/women/1.jpg',
        dateOfBirth: '1990-08-22',
        mobileNumber: '+44 7700 900456',
        bankAccount: {
          sortCode: '98-76-54',
          accountNumber: '87654321'
        },
        billingAddress: '456 Oak St, Manchester, UK, M1 1AB',
        createdAt: '2023-02-15T00:00:00.000Z',
        rating: 4.6,
        tasksCompleted: 25,
        bio: 'Professional cleaner with attention to detail.',
        skills: ['House Cleaning', 'Office Cleaning', 'Laundry']
      },
  ],
  tasks: [
    {
      id: uuidv4(),
      title: 'House Cleaning in Central London',
      description: 'Need a thorough house cleaning for a 2-bedroom flat in Central London.',
      location: 'Central London',
      lat: 51.5074,
      lng: -0.1278,
      dueDate: '2023-06-15',
      budget: 80,
      status: 'OPEN',
      category: 'Cleaning',
      poster: { id: 'e72a838e-385e-411d-a37e-30f0c252ff56', name: 'John Doe' },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      offers: [
        {
          id: uuidv4(),
          amount: 75,
          description: 'I can do a thorough cleaning of your flat within 4 hours.',
          userId: '28037931-4868-4405-b631-916c9a28384c',
        },
      ],
      questions: [
        {
          id: uuidv4(),
          text: 'Do I need to bring my own cleaning supplies?',
          userId: '28037931-4868-4405-b631-916c9a28384c',
          replies: [
            {
              id: uuidv4(),
              text: 'No, all cleaning supplies will be provided.',
              userId: 'e72a838e-385e-411d-a37e-30f0c252ff56',
            },
          ],
        },
      ],
    },
    {
      id: uuidv4(),
      title: 'Garden Maintenance in North London',
      description: 'Looking for someone to mow the lawn and trim hedges in my backyard.',
      location: 'North London',
      lat: 51.5604,
      lng: -0.1058,
      dueDate: '2023-06-20',
      budget: 60,
      status: 'OPEN',
      category: 'Gardening',
      poster: { id: 'e72a838e-385e-411d-a37e-30f0c252ff56', name: 'John Doe' },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      offers: [],
      questions: [
        {
          id: uuidv4(),
          text: 'How large is the garden?',
          userId: '28037931-4868-4405-b631-916c9a28384c',
          replies: [],
        },
      ],
    },
    {
      id: uuidv4(),
      title: 'Furniture Assembly in East London',
      description: 'Need help assembling a wardrobe and a bed frame from IKEA.',
      location: 'East London',
      lat: 51.5374,
      lng: -0.0004,
      dueDate: '2023-06-18',
      budget: 100,
      status: 'OPEN',
      category: 'Handyman',
      poster: { id: 'e72a838e-385e-411d-a37e-30f0c252ff56', name: 'John Doe' },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      offers: [
        {
          id: uuidv4(),
          amount: 90,
          description: 'I amm experienced in IKEA furniture assembly and can complete this task efficiently.',
          userId: '28037931-4868-4405-b631-916c9a28384c',
        },
        {
          id: uuidv4(),
          amount: 110,
          description: 'I can assemble your furniture and also help with any adjustments or modifications if needed.',
          userId: '28037931-4868-4405-b631-916c9a28384c',
        },
      ],
      questions: [],
    },
    {
      id: uuidv4(),
      title: 'Dog Walking in West London',
      description: 'Need someone to walk my Labrador for 30 minutes every weekday afternoon.',
      location: 'West London',
      lat: 51.5074,
      lng: -0.2578,
      dueDate: '2023-06-30',
      budget: 50,
      status: 'OPEN',
      category: 'Pet Care',
      poster: { id: 'e72a838e-385e-411d-a37e-30f0c252ff56', name: 'John Doe' },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      offers: [],
      questions: [
        {
          id: uuidv4(),
          text: 'Is the dog friendly with other dogs?',
          userId: '28037931-4868-4405-b631-916c9a28384c',
          replies: [
            {
              id: uuidv4(),
              text: 'Yes, my Labrador is very friendly and gets along well with other dogs.',
              userId: 'e72a838e-385e-411d-a37e-30f0c252ff56',
            },
          ],
        },
        {
          id: uuidv4(),
          text: 'Do you provide the leash and other walking supplies?',
          userId: '28037931-4868-4405-b631-916c9a28384c',
          replies: [
            {
              id: uuidv4(),
              text: 'Yes, I will provide the leash and any necessary walking supplies.',
              userId: 'e72a838e-385e-411d-a37e-30f0c252ff56',
            },
          ],
        },
      ],
    },
    {
      id: uuidv4(),
      title: 'Web Design for Local Business in South London',
      description: 'Looking for a web designer to create a simple website for my local bakery.',
      location: 'South London',
      lat: 51.4504,
      lng: -0.1058,
      dueDate: '2023-07-10',
      budget: 500,
      status: 'OPEN',
      category: 'Web Design',
      poster: { id: 'e72a838e-385e-411d-a37e-30f0c252ff56', name: 'John Doe' },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      offers: [
        {
          id: uuidv4(),
          amount: 450,
          description: 'I can design a beautiful and responsive website for your bakery using modern web technologies.',
          userId: '28037931-4868-4405-b631-916c9a28384c',
        },
      ],
      questions: [
        {
          id: uuidv4(),
          text: 'Do you need e-commerce functionality for online orders?',
          userId: '28037931-4868-4405-b631-916c9a28384c',
          replies: [
            {
              id: uuidv4(),
              text: 'Not initially, but I wod like the option to add it in the future. Can we discuss this further?',
              userId: 'e72a838e-385e-411d-a37e-30f0c252ff56',
            },
          ],
        },
      ],
    },
  ],
  offers: [],
  questions: [],
  replies: [],
};

export default db;