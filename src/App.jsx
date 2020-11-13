
import './App.css';
import SignUp from './Components/SignUp/SignUp';
import AuthProvider from './Context/AuthContext';

function App() {
    
    return (
      <main>
          <AuthProvider>
          <SignUp />
          </AuthProvider>
      </main>
  )
}

export default App;
