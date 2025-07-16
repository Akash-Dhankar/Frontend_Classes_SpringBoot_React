import { Routes, Route } from 'react-router-dom'
import Login from './components/login'
import Register from './components/register'
import Employees from './components/employees'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} /> 
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/employees" element={<Employees />} />
    </Routes>
  )
}
export default App