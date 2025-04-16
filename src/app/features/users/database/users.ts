import PaginatedResponse from '../../shared/models/paginated-response.model';
import User from '../models/user.model';
export const users: User[] = [
  {
    id: 'usr-1',
    name: 'Hidayah Jadaan',
    email: 'hidayah@gmail.com',
    password: '123',
    create_at: new Date('2025-03-14'),
  },
  {
    id: 'usr-2',
    name: 'Abdullah Omar',
    email: 'abd@gmail.com',
    password: '123',
    create_at: new Date('2025-03-15'),
  },
  {
    id: 'usr-3',
    name: 'Rana Yaha',
    email: 'ran@gmail.com',
    password: '123',
    create_at: new Date('2025-03-16'),
  },
  {
    id: 'usr-4',
    name: 'Sayyad ALamer',
    email: 'sad@gmail.com',
    password: '123',
    create_at: new Date('2025-03-14'),
  },
  {
    id: 'usr-5',
    name: 'Sayyad ALamer',
    email: 'sad@gmail.com',
    password: '123',
    create_at: new Date('2025-03-14'),
  },
  {
    id: 'usr-6',
    name: 'Sayyad ALamer',
    email: 'sad@gmail.com',
    password: '123',
    create_at: new Date('2025-03-14'),
  },
  {
    id: 'usr-7',
    name: 'Sayyad ALamer',
    email: 'sad@gmail.com',
    password: '123',
    create_at: new Date('2025-03-14'),
  },
  {
    id: 'usr-8',
    name: 'Sayyad ALamer',
    email: 'sad@gmail.com',
    password: '123',
    create_at: new Date('2025-03-14'),
  },
  {
    id: 'usr-9',
    name: 'Sayyad ALamer',
    email: 'sad@gmail.com',
    password: '123',
    create_at: new Date('2025-03-14'),
  },
  {
    id: 'usr-10',
    name: 'Sayyad ALamer',
    email: 'sad@gmail.com',
    password: '123',
    create_at: new Date('2025-03-14'),
  },
  {
    id: 'usr-11',
    name: 'Sayyad ALamer',
    email: 'sad@gmail.com',
    password: '123',
    create_at: new Date('2025-03-14'),
  },
  {
    id: 'usr-12',
    name: 'Sayyad ALamer',
    email: 'sad@gmail.com',
    password: '123',
    create_at: new Date('2025-03-14'),
  },
  {
    id: 'usr-13',
    name: 'Sayyad ALamer',
    email: 'sad@gmail.com',
    password: '123',
    create_at: new Date('2025-03-14'),
  },
];

export const getUser = (
  page: number,
  pageSize: number
): Promise<PaginatedResponse<User>> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const numberOfPages: number = Math.ceil(users.length / pageSize);
      const totalNumberOfItems: number = 0;
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const items: User[] = users.slice(start, end);

      const response: PaginatedResponse<User> = {
        page,
        numberOfPages,
        totalNumberOfItems,
        data: items,
      };

      resolve(response);
    }, 1500);
  });
};

export const addUser = (user: User): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      user.id = 'usr-' + (users.length + 1);
      user.create_at = new Date();
      users.push(user);
      resolve(user);
    }, 1500);
  });
};

export const getUsers = (id: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find((user: User) => user.id === id);
      if (user) {
        resolve(user);
      } else {
        reject('User dose not exist');
      }
    }, 1000);
  });
};

export const updateUsers = (userUpadet: User): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let userIndex = users.findIndex(
        (user: User) => user.id === userUpadet.id
      );
      if (userIndex != -1) {
        const user = (users[userIndex] = { ...userUpadet });
        user.upadeeted_at = new Date();
        resolve(user);
      } else {
        reject('User dose not exist');
      }
    }, 1000);
  });
};

export const loginUsers = (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(
        (user: User) => user.email === email && user.password === password
      );
      if (user) {
        resolve(user);
      } else {
        reject('Incorrect Email Address or Password');
      }
    }, 1000);
  });
};
