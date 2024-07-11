import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useApi } from './useApi';
import { useAuth } from './AuthContext';

export interface User {
    id: number;
    name: string;
}

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [filter, setFilter] = useState('');
    const { sendGet } = useApi();
    const { logout } = useAuth();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await sendGet<User[]>('/api/users');
                console.log('in userlist: ',fetchedUsers);
                setUsers(fetchedUsers);
            } catch (error) {
                if (error instanceof Error) {
                    console.error('Failed to fetch users', error.message);
                    toast.error('Failed to load users: ' + error.message);
                }
            }
        };

        fetchUsers();
    }, [sendGet]);

    const handleLogout = () => {
        logout();
        toast.info('You have been logged out.');
    };

    const filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div>
          <input
            type="text"
            placeholder="Szűrés név szerint..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <ul>
              {filteredUsers.map(user => (
                <li key={user.id}>{user.name}</li>
              ))}
          </ul>

          <button onClick={handleLogout}>Logout</button>
      </div>
    );
};

export default UserList;
