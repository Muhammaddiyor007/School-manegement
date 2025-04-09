import { useState } from 'react';
import usePostAdd from '../Hook/addTeacher';
import { X } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddTeachers() {
  const [fullname, fullnameSet] = useState('');
  const [email, emailSet] = useState('');
  const [phone_number, phone_numberSet] = useState('');
  const [password, passwordSet] = useState('');
  const [Role, roleSet] = useState('');
  const [is_verified, verifiedSet] = useState('');

  const { postData, data, error, setData, setError } = usePostAdd('/users/add');

  const save = async (event) => {
    event.preventDefault();
    const user = {
      fullname,
      email,
      phone_number,
      password,
      Role,
      is_verified,
    };

    const result = await postData(user, true);
    console.log(result);

    if (result) {
      fullnameSet('');
      emailSet('');
      phone_numberSet('');
      passwordSet('');
      roleSet('');
      verifiedSet('');

      toast.success('Teacher added successfully!');
    } else {
      toast.error('Failed to add teacher. Please try again.');
    }
  };

  if (error) {
    toast.error(`Error: ${error}`);
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

      <form onSubmit={save} className="p-[20px] bg-white rounded-[8px] shadow-md">
        <div className="flex justify-between items-center mb-[20px]">
          <h1 className="text-[20px] text-[#333] font-kumbh font-semibold">
            Add New Teacher
          </h1>
          <button
            type="submit"
            className="bg-[#509CDB] text-white rounded-[8px] w-[120px] h-[40px] text-[14px] font-semibold"
          >
            Save
          </button>
        </div>

        <div className="flex flex-col gap-[15px] md:flex-row md:gap-[30px] mb-[20px]">
          <div className="flex flex-col w-full">
            <label className="text-[#8A8A8A] font-medium text-[14px]">Full Name</label>
            <input
              type="text"
              placeholder="Enter Full Name"
              className="border-[#A7A7A7] border-[1px] rounded-[8px] h-[42px] px-[10px] text-[#333] font-medium text-[14px] outline-none"
              onChange={(e) => fullnameSet(e.target.value)}
              value={fullname}
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="text-[#8A8A8A] font-medium text-[14px]">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="border-[#A7A7A7] border-[1px] rounded-[8px] h-[42px] px-[10px] text-[#333] font-medium text-[14px] outline-none"
              onChange={(e) => emailSet(e.target.value)}
              value={email}
            />
          </div>
        </div>

        <div className="flex flex-col gap-[15px] md:flex-row md:gap-[30px] mb-[20px]">
          <div className="flex flex-col w-full">
            <label className="text-[#8A8A8A] font-medium text-[14px]">Phone Number</label>
            <input
              type="text"
              placeholder="Enter Phone Number"
              className="border-[#A7A7A7] border-[1px] rounded-[8px] h-[42px] px-[10px] text-[#333] font-medium text-[14px] outline-none"
              onChange={(e) => phone_numberSet(e.target.value)}
              value={phone_number}
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="text-[#8A8A8A] font-medium text-[14px]">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="border-[#A7A7A7] border-[1px] rounded-[8px] h-[42px] px-[10px] text-[#333] font-medium text-[14px] outline-none"
              onChange={(e) => passwordSet(e.target.value)}
              value={password}
            />
          </div>
        </div>

        <div className="flex flex-col gap-[15px] md:flex-row md:gap-[30px] mb-[20px]">
          <div className="flex flex-col w-full">
            <label className="text-[#8A8A8A] font-medium text-[14px]">Role</label>
            <select
              className="border-[#A7A7A7] border-[1px] rounded-[8px] h-[42px] px-[10px] text-[#333] font-medium text-[14px] outline-none"
              onChange={(e) => roleSet(e.target.value)}
              value={Role}
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>

          <div className="flex flex-col w-full">
            <label className="text-[#8A8A8A] font-medium text-[14px]">Verified</label>
            <select
              className="border-[#A7A7A7] border-[1px] rounded-[8px] h-[42px] px-[10px] text-[#333] font-medium text-[14px] outline-none"
              onChange={(e) => verifiedSet(e.target.value)}
              value={is_verified}
            >
              <option value="false">False</option>
              <option value="true">True</option>
            </select>
          </div>
        </div>
      </form>
    </>
  );
}

export default AddTeachers;
