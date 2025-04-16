import PaginatedResponse from '../../shared/models/paginated-response.model';
import User from '../models/user.model';
export const users: User[] = [
  {
    id: 'usr-1',
    name: 'Hidayah Jadaan',
    email: 'hidayah@gmail.com',
    password: '123',
    type: 'admin',
  },
  {
    id: 'usr-2',
    name: 'Abdullah Omar',
    email: 'abd@gmail.com',
    password: '123',
    type: 'chef',
  },
  {
    id: 'usr-3',
    name: 'Rana Yaha',
    email: 'ran@gmail.com',
    password: '123',
    type: 'customer',
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
