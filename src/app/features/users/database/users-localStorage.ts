import PaginatedResponse from '../../shared/models/paginated-response.model';
import User from '../models/user.model';

const USERS_LOCAL_STORAGE_KEY = 'users-data';
const USERS_FILLED = 'users-filled';

export const fillData = () => {
  const filled_status = !!localStorage.getItem(USERS_FILLED);

  if (!filled_status) {
    const users: User[] = [
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

    // localStorage.clear();
    // Set and override users array to localstorage database
    localStorage.setItem(USERS_LOCAL_STORAGE_KEY, JSON.stringify(users));
    localStorage.setItem(USERS_FILLED, JSON.stringify('true'));
  }
};

export const getUser = (
  page: number,
  pageSize: number
): Promise<PaginatedResponse<User>> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users: User[] = JSON.parse(
        localStorage.getItem(USERS_LOCAL_STORAGE_KEY) || ''
      );
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
      const users: User[] = JSON.parse(
        localStorage.getItem(USERS_LOCAL_STORAGE_KEY) || ''
      );
      user.id = 'usr-' + (users.length + 1);
      user.create_at = new Date();
      users.push(user);
      localStorage.setItem(USERS_LOCAL_STORAGE_KEY, JSON.stringify(users));

      resolve(user);
    }, 1500);
  });
};

export const getUsers = (id: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users: User[] = JSON.parse(
        localStorage.getItem(USERS_LOCAL_STORAGE_KEY) || ''
      );
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
      const users: User[] = JSON.parse(
        localStorage.getItem(USERS_LOCAL_STORAGE_KEY) || ''
      );
      let userIndex = users.findIndex(
        (user: User) => user.id === userUpadet.id
      );
      if (userIndex != -1) {
        const user = (users[userIndex] = { ...userUpadet });
        user.upadeeted_at = new Date();
        localStorage.setItem(USERS_LOCAL_STORAGE_KEY, JSON.stringify(users));

        resolve(user);
      } else {
        reject('User dose not exist');
      }
    }, 1000);
  });
};
export const deleteUser = (userDeleted: User): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users: User[] = JSON.parse(
        localStorage.getItem(USERS_LOCAL_STORAGE_KEY) || ''
      );
      let userIndex = users.findIndex(
        (user: User) => user.id === userDeleted.id
      );
      if (userIndex != -1) {
        // const user = (users[userIndex] = { ...userDeleted });
        // user.upadeeted_at = new Date();

        users.splice(userIndex, 1);

        localStorage.setItem(USERS_LOCAL_STORAGE_KEY, JSON.stringify(users));

        resolve(true);
      } else {
        reject('User dose not exist');
      }
    }, 500);
  });
};

export const loginUsers = (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users: User[] = JSON.parse(
        localStorage.getItem(USERS_LOCAL_STORAGE_KEY) || ''
      );
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
