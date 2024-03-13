import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarMenu from './navbar-components/NavbarMenu';
import AccountPage from './account-components/AccountPage';
import CommentsPage from './comment-components/CommentsPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Items from './items-components/Items';
import GiveComment from './comment-components/GiveComment';
import AccountEdit from './account-components/AccountEdit';
import AccountCreate from './account-components/AccountCreate'
import Login from './navbar-components/Login';

function App() {
  

  return (
    <>

    <BrowserRouter>
    <NavbarMenu></NavbarMenu>
      <div>
        <Routes>
          <Route path="/" element={<Items/>} > </Route>
          <Route path="/login" element={<Login/>} > </Route>
          <Route path="/order" element={<Items/>} > </Route>
          <Route path="/account"  element={<AccountPage/>} ></Route>
          <Route path="/givecomment"  element={<GiveComment/>} ></Route>
          <Route path="/comment/view/:id" element={<CommentsPage ></CommentsPage>} ></Route>
          <Route path="/account/view/:id" element={<AccountPage></AccountPage>} ></Route>
          <Route path="/account/edit/:id" element={<AccountEdit></AccountEdit>} ></Route>
          <Route path="/account/create" element={<AccountCreate></AccountCreate>} ></Route>
        </Routes>
      </div>
    </BrowserRouter>
    </>
  );
}

export default App;
