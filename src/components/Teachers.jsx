import React, { useState, useEffect } from 'react';
import Logout from './Logout';
import Support from './Support';
import { FaSearch } from 'react-icons/fa';
import notfound from '../assets/kuala.svg';
import AddTeachers from './AddTeachers';

const Teachers = () => {
  const [showForm, setShowForm] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const savedTeachers = JSON.parse(localStorage.getItem('teachers')) || [];
    if (savedTeachers.length > 0) {
      setTeachers(savedTeachers);
    } else {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((data) => {
          const apiTeachers = data.slice(0, 15).map((user) => ({
            fullName: user.name,
            subject: 'Mathematics',
            class: '10-A',
            email: user.email,
            gender: user.id % 2 === 0 ? 'Male' : 'Female',
            avatar: `https://i.pravatar.cc/150?img=${user.id}`,
          }));
          setTeachers(apiTeachers);
          localStorage.setItem('teachers', JSON.stringify(apiTeachers));
        })
        .catch((error) => console.error('Error fetching teachers:', error));
    }
  }, []);

  useEffect(() => {
    if (teachers.length > 0) {
      localStorage.setItem('teachers', JSON.stringify(teachers));
    }
  }, [teachers]);

  const handleSaveTeacher = (teacherData) => {
    const newTeacher = {
      fullName: teacherData.fullName,
      subject: teacherData.subject,
      class: teacherData.class,
      email: teacherData.email,
      gender: teacherData.gender,
      avatar: teacherData.avatar || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
    };

    setTeachers((prevTeachers) => {
      const updatedTeachers = [...prevTeachers, newTeacher];
      localStorage.setItem('teachers', JSON.stringify(updatedTeachers));
      return updatedTeachers;
    });
    setShowForm(false);
  };

  const filteredTeachers = teachers.filter((teacher) =>
    teacher.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative px-[100px] pr-[99px]">
      <div className='flex justify-end pb-5'>
        <Logout />
      </div>
      <div className='flex justify-between items-center pb-5'>
        <h4 className='text-[#4F4F4F] text-[20px] font-semibold' onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Add Teachers' : 'Teachers'}
        </h4>
        <button 
          className='bg-[#152259] rounded-[4px] text-white p-[14px]'
          onClick={() => setShowForm(!showForm)} 
        >
          {showForm ? 'Save' : 'Add Teachers'}
        </button>
      </div>

      {!showForm ? (
        <>
          <div className="relative w-full mb-4">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input 
              className="w-full py-4 pl-12 pr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" 
              type="search" 
              placeholder="Search for a teacher by name or email" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {filteredTeachers.length === 0 ? (
            <div className='flex flex-col justify-center items-center pt-4'>
              <img src={notfound} alt="No Teachers" />
              <h1 className='text-[#4F4F4F] text-[28px] font-bold'>No Teachers Found</h1>
              <p className='text-[#4F4F4F]'>Try searching with a different name or email.</p>
            </div>
          ) : (
            <div className='overflow-x-auto bg-white shadow-md rounded-lg mb-5'>
              <table className='w-full border-collapse'>
                <thead>
                  <tr className='bg-gray-100 border-b'>
                    <th className='p-3 text-left'>Profile</th>
                    <th className='p-3 text-left'>Name</th>
                    <th className='p-3 text-left'>Subject</th>
                    <th className='p-3 text-left'>Class</th>
                    <th className='p-3 text-left'>Email Address</th>
                    <th className='p-3 text-left'>Gender</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeachers.map((teacher, index) => (
                    <tr key={index} className={`${index % 2 === 0 ? 'bg-[#EBF6FF]' : 'bg-white'} border-b`}>
                      <td className='p-3'>
                        <img src={teacher.avatar} alt={teacher.fullName} className="w-12 h-12 rounded-full" />
                      </td>
                      <td className='p-3'>{teacher.fullName}</td>
                      <td className='p-3'>{teacher.subject}</td>
                      <td className='p-3'>{teacher.class}</td>
                      <td className='p-3 text-gray-500'>{teacher.email}</td>
                      <td className='p-3'>{teacher.gender}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : (
        <AddTeachers onSave={handleSaveTeacher} onClose={() => setShowForm(false)} />
      )}
    </div>
  );
};

export default Teachers;
