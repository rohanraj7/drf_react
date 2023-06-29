import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Loginmode from './Pages/Login/Loginmode';
import Accountreg from './components/Accountreg';
import { AuthProvider } from './Context/AuthContext';
import PrivateRouter from './utils/PrivateRouter';
import Home from './Pages/HomePage/Home';
import Profile from './Pages/profile/Profile';
import EditProfile from './components/EditProfile';
import Friends from './components/Friends';
import Profilephotos from './components/Profilephotos';
import FriendprofileView from './Pages/FriendprofileView/FriendprofileView';
import Saved from './Pages/Saved/Saved';
import Notification_page from './Pages/Notification/Notification_page';
import PageNotFound from './components/PageNotFound';



function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route element={<PrivateRouter />}>
              <Route path='/' element={<Home />} exact />
              <Route path='/profile' element={<Profile />}>
                <Route path='edit' element={<EditProfile />} />
                <Route path='friends' element={<Friends />} />
                <Route path='posts' element={<Profilephotos />} />
                <Route path='saved' element={<Saved />} />
              </Route>
              <Route path='/notifications' element={<Notification_page />} />
              <Route path='/friendprofile/:userId' element={<FriendprofileView />} />
              <Route path='/friendprofile/posts/:userId' element={<FriendprofileView />} />
              <Route path='/friendprofile/friend/:userId' element={<FriendprofileView />} />
              <Route path='*' element={<PageNotFound/>}/>
            </Route>
            <Route path='/login' element={<Loginmode />} />
            <Route path='/signup' element={<Accountreg />} />
          </Routes>
        </AuthProvider>
      </Router>

    </>
  );
}

export default App;
