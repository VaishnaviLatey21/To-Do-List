import React, { useState } from 'react';
import Header from './Components/Header';
import TodoList from './Components/TodoList';
import { db, firestore } from '../src/firebase';
import {addDoc, collection, deleteDoc, doc} from "@firebase/firestore";


function App() {

  
  return (
    <div>
      <Header />
      <TodoList />
    </div>
  );
}

export default App;
