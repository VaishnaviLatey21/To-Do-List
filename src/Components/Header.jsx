import React, {useState} from 'react';
import { db, firestore } from '../firebase';
import {addDoc, collection, updateDoc, doc} from "@firebase/firestore";


function Header({}) {
  const [task, setTask] = useState([]);
  const  [newTask, setNewTask] = useState('');

    const handleClick = async() => {
      try {
        const docRef = await addDoc(collection(db, 'todolist'), {
          tasks: newTask,
        });

        // setTasks((prevTasks) => [...prevTasks, newTask]);
        console.log('Task added to Firestore with ID:', docRef.id);
        setNewTask('');
      } catch (error) {
        console.error('Error adding task to Firestore:', error.message);
      }
    }

  return (
    <div className='text-center'>
      <div className='flex justify-center mt-9'>
        <input
          type="text"
          placeholder="Add Items..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="mt-4 p-2 border rounded-md w-2/6 h-10"
        />
        <button className='bg-blue-500 text-white px-3 rounded-md h-10 mt-4' onClick={handleClick}>
          Add
        </button>
      </div>
     
    </div>
  );
}

export default Header;
