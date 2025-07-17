import { Routes, Route } from 'react-router-dom'
import Login from './components/login'
import Register from './components/register'
import Employees from './components/employees'
import Dashboard from './components/dashboard'
import AddTask from './components/addTask'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} /> 
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/employees" element={<Employees />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/add-task" element={<AddTask />} />
    </Routes>
  )
}
export default App