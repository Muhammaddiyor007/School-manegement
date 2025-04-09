import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaTrash, FaEdit, FaPlus, FaSearch } from "react-icons/fa";
import Logout from "./Logout";
import notfound from "../assets/kuala.svg"

function Modal({ show, onClose, onSubmit, formData, setFormData, title }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <form onSubmit={onSubmit} className="space-y-2">
          <input type="text" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Name" className="border p-2 w-full" required />
          <input type="text" name="surname" value={formData.surname} onChange={(e) => setFormData({ ...formData, surname: e.target.value })} placeholder="Surname" className="border p-2 w-full" required />
          <input type="number" name="age" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} placeholder="Age" className="border p-2 w-full" required min="1" />
          <div className="flex justify-between">
            <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full mr-2">Save</button>
            <button onClick={onClose} type="button" className="bg-gray-300 p-2 rounded w-full">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function UserCard({ user, onEdit, onDelete }) {
  return (
    <div className="border p-6 rounded shadow-md bg-gray-100 flex flex-col items-center relative h-80">
      <img src={user.image} alt={user.name} className="w-32 h-32 rounded-full mb-4" />
      <h4 className="font-bold text-lg">{user.name}</h4>
      <p>{user.surname}</p>
      <p>Age: {user.age}</p>
      <div className="flex space-x-4 mt-auto w-full justify-center pb-4 pt-4">
        <button onClick={onEdit} className="text-[#152259] text-3xl flex items-center"><FaEdit className="mr-2" /> Edit</button>
        <button onClick={onDelete} className="text-red-500 text-3xl flex items-center"><FaTrash className="mr-2" /> Delete</button>
      </div>
    </div>
  );
}

export default function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({ name: "", surname: "", age: "" });
  const [modalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    if (!savedUsers.length) {
      fetch("https://67d662a8286fdac89bc1c5ec.mockapi.io/user/users")
        .then((response) => response.json())
        .then((data) => {
          const usersWithImages = data.slice(0, 10).map(user => ({
            ...user,
            image: `https://i.pravatar.cc/150?img=${user.id}`
          }));
          setUsers(usersWithImages);
          localStorage.setItem("users", JSON.stringify(usersWithImages));
        });
    } else {
      setUsers(savedUsers);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.surname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-[38px] pr-[99px]">
      <div className='flex justify-end pb-5'>
        <Logout />
      </div>
      <div className="flex justify-between items-center pb-5">
        <h4 className='text-[#4F4F4F] text-[20px] font-semibold'>User List</h4>
        <button onClick={() => { setFormData({ name: "", surname: "", age: "" }); setEditIndex(null); setModalOpen(true); }} className="bg-[#152259] text-white flex items-center mb-4 rounded-[4px] p-[14px]">
          <FaPlus className="mr-2" /> Add User
        </button>
      </div>
      <div className="flex items-center border p-2 rounded bg-white">
        <FaSearch className="text-gray-400 mr-2" />
        <input 
          type="text" 
          placeholder="Search for a student by name or surname..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          className="outline-none w-full" 
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <UserCard key={index} user={user} onEdit={() => {
              setEditIndex(index);
              setFormData({ name: user.name, surname: user.surname, age: user.age });
              setModalOpen(true);
            }} onDelete={() => setUsers(users.filter((_, i) => i !== index))} />
          ))
        ) : (
          <div className='flex flex-col justify-center items-center pt-10 w-full col-span-3'>
            <img src={notfound} alt="Not Found" className='w-60 h-60' />
            <h1 className='text-[#4F4F4F] text-[32px] font-bold mt-4'>No Students at this time</h1>
            <p className='text-[#4F4F4F] text-lg text-center max-w-xl'>Students will appear here after they enroll in your school.</p>
          </div>
        )}
      </div>
      <Modal show={modalOpen} onClose={() => { setModalOpen(false); setEditIndex(null); setFormData({ name: "", surname: "", age: "" }); }} onSubmit={(e) => {
        e.preventDefault();
        if (editIndex !== null) {
          const updatedUsers = [...users];
          updatedUsers[editIndex] = { ...formData, image: users[editIndex].image };
          setUsers(updatedUsers);
        } else {
          setUsers([...users, { ...formData, image: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}` }]);
        }
        setFormData({ name: "", surname: "", age: "" });
        setEditIndex(null);
        setModalOpen(false);
      }} formData={formData} setFormData={setFormData} title={editIndex !== null ? "Edit User" : "Add User"} />
    </div>
  );
}
