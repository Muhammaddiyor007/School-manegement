import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";

import "./index.css";
import Login from "./components/Login";
import Home from "./pages/Home";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Teachers from "./components/Teachers";
import Students from "./components/Students";
import Dashboard_home from "./components/Dashboard_home";
import Billing from "./components/Billing";
import Settings from "./components/Settings";
import Exams from "./components/Exams";
import AddTeachers from "./components/AddTeachers";
import ThemeSwitcher from "./components/ThemeSwitcher";
import LanguageSwitcher from "./components/LanguageSwitcher";
import TeacherDetail from "./components/TeacherDetail";

function App() {
  const users = [
    {
      id: 1,
      name: "Muhammaddiyor",
      surname: "Odiljonov",
      age: 21,
      email: "muhammadiyorodiljonov@gmail.com",
      role: "Frontend Developer",
    },
    {
      id: 2,
      name: "Asadbek",
      surname: "Ayubov",
      age: 20,
      email: "asadbekayubov@gmail.com",
      role: "Frontend Developer",
    },
    {
      id: 3,
      name: "Qosimjon",
      surname: "Omonov",
      age: 21,
      email: "qosimjonomonov@gmail.com",
      role: "Full-Stack Developer",
    },
    {
      id: 4,
      name: "Islombek",
      surname: "Xalimjonov",
      age: 20,
      email: "islombekxalimjonov@gmail.com",
      role: "UI/UX Designer",
    },
    {
      id: 5,
      name: "Muhammadrasul",
      surname: "G'ulomjonov",
      age: 20,
      email: "muhammadrasulg'ulomjonov@gmail.com",
      role: "Mobile Developer",
    },
  ];

  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <ThemeSwitcher />
          <LanguageSwitcher />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="dashboard_home" element={<Dashboard_home />} />
              <Route path="teachers" element={<Teachers />} />
              <Route path="teacher/:id" element={<TeacherDetail />} />
              <Route path="add_teachers" element={<AddTeachers />} />
              <Route path="students" element={<Students />} />
              <Route path="billing" element={<Billing users={users} />} />
              <Route path="settings" element={<Settings />} />
              <Route path="exams" element={<Exams />} />
            </Route>
          </Routes>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
