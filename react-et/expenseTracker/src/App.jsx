import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";

import './css/App.css';

import Navbar from './components/Navbar';
import Expense from './pages/Expense';
import Category from './pages/Category';
import Dashboard from './pages/Dashboard';
import EditCategory from './components/category/forms/Edit';
import AddCategory from './components/category/forms/Add';
import EditExpense from './components/expense/forms/Edit';
import AddExpense from './components/expense/forms/Add';

function App() {
  return(
    <div>
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <main className='main-content'>
        <Routes>
          <Route path='/' element={<Dashboard/>} />
          <Route path='/my-expenses' element={<Expense/>} />
          <Route path='/edit-expenses' element={<EditExpense />}/>
          <Route path='/add-expenses' element={<AddExpense />}/>
          <Route path='/my-expense-categories' element={<Category/>} />
          <Route path='/edit-category' element={<EditCategory />}/>
          <Route path='/add-category' element={<AddCategory />}/>
        </Routes>
      </main>
    </div>
  );
}

export default App
