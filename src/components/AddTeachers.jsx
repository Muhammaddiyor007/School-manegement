import React, { useState } from 'react';

const AddTeachers = ({ onSave, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    class: '',
    gender: '',
    age: '',
  });

  const [extraData, setExtraData] = useState({
    about: '',
    file: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleExtraChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setExtraData({ ...extraData, file: files[0] });
    } else {
      setExtraData({ ...extraData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg mx-auto w-[981px] h-auto">
      <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-[#A7A7A7]">Full Name</label>
          <input type="text" name="fullName" className="w-full p-2 border rounded" placeholder="Full Name" value={formData.fullName} onChange={handleChange} />
        </div>
        <div>
          <label className="block text-[#A7A7A7]">Email address</label>
          <input type="email" name="email" className="w-full p-2 border rounded" placeholder="Email address" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label className="block text-[#A7A7A7]">Subject</label>
          <input type="text" name="subject" className="w-full p-2 border rounded" placeholder="Subject" value={formData.subject} onChange={handleChange} />
        </div>
        <div>
          <label className="block text-[#A7A7A7]">Class</label>
          <input type="text" name="class" className="w-full p-2 border rounded" placeholder="Class" value={formData.class} onChange={handleChange} />
        </div>
        <div>
          <label className="block text-[#A7A7A7]">Gender</label>
          <select name="gender" className="w-full p-2 border rounded" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label className="block text-[#A7A7A7]">Age</label>
          <input type="number" name="age" className="w-full p-2 border rounded" placeholder="Age" value={formData.age} onChange={handleChange} />
        </div>
        <div className="col-span-2 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[#A7A7A7]">About</label>
            <textarea name="about" className="w-full p-2 border rounded" placeholder="About the teacher" value={extraData.about} onChange={handleExtraChange}></textarea>
          </div>
          <div>
            <label className="block text-[#A7A7A7]">Upload File</label>
            <input type="file" name="file" className="w-full p-2 border rounded" onChange={handleExtraChange} />
          </div>
        </div>
        <div className="col-span-2 flex justify-end mt-4">
          <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded mr-2" onClick={onClose}>Cancel</button>
          <button type="submit" className="bg-[#152259] text-white px-4 py-2 rounded">Save</button>
        </div>
      </form>
    </div>
  );
};

export default AddTeachers;
