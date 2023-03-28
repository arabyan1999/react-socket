import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import Chat from './components/Chat/index';

const router = createBrowserRouter([
  {
    path: '/',
    exact: true,
    element: (
      <Dashboard />
    ),
  },
  {
    path: '/chat/:userId/:userName',
    element: (
      <Chat />
    )
  }
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
