'use client'

import React, { useState, useEffect } from 'react';
import { SearchIcon, ChevronUpIcon, ChevronDownIcon } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

type SortKey = keyof User;
type SortOrder = 'asc' | 'desc';

export default function Component() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const handleSort = (key: SortKey) => {
    setSortOrder(sortOrder === 'asc' && sortKey === key ? 'desc' : 'asc');
    setSortKey(key);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const usersData: User[] = await response.json();
        setUsers(usersData);
      } catch (error) {
        setError('Error fetching users: ' + (error instanceof Error ? error.message : 'Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filtered = users.filter((user) => {
      return Object.values(user).some((value) =>
        value.toString().toLowerCase().includes(lowercasedFilter)
      );
    });

    const sorted = [...filtered].sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredUsers(sorted);
  }, [users, searchTerm, sortKey, sortOrder]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">User List</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4">
          <div className="flex items-center mb-4">
            <SearchIcon className="h-5 w-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder={`Search ${users.length} users...`}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                {(['name', 'email', 'phone'] as const).map((key) => (
                  <th
                    key={key}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort(key)}
                  >
                    <div className="flex items-center">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                      <span className="ml-1">
                        {sortKey === key && (
                          sortOrder === 'asc' ? (
                            <ChevronUpIcon className="h-4 w-4" />
                          ) : (
                            <ChevronDownIcon className="h-4 w-4" />
                          )
                        )}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}