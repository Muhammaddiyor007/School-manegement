import React from 'react';

const Billing = ({ users }) => {
  return (
    <div>
      <h2 className='text-[#4F4F4F] text-[20px] font-semibold'>Billing Page</h2>
      <table  className='w-full border-collapse mt-5'>
        <thead>
          <tr className='bg-gray-100 border-b'>
            <th className='p-3 text-left'>ID</th>
            <th className='p-3 text-left'>Ism</th>
            <th className='p-3 text-left'>Familiya</th>
            <th className='p-3 text-left'>Yosh</th>
            <th className='p-3 text-left'>Rol</th>
            <th className='p-3 text-left'>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className='p-3'>{user.id}</td>
              <td className='p-3'>{user.name}</td>
              <td className='p-3'>{user.surname}</td>
              <td className='p-3'>{user.age}</td>
              <td className='p-3'>{user.role}</td>
              <td className='p-3'>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Billing;
