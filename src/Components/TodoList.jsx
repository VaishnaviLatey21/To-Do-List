import React, { useEffect, useState } from 'react'
import { HiXMark, HiOutlinePencil } from "react-icons/hi2";
import { auth, db } from '../firebase';
import { addDoc, collection, getDocs, doc, deleteDoc, updateDoc } from "@firebase/firestore";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState('');

  useEffect(() => {
    const fetchList = async () => {
      try {
        const tasksCollectionRef = collection(db, 'todolist');
        const tasksSnapshot = await getDocs(tasksCollectionRef);
        const tasksData = tasksSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setTasks(tasksData);
        console.log("fetched  the list successfully");
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    fetchList();

  }, [])

  // const onAddTask = (newTask) => {
  //   setTasks((prevTasks) => [...prevTasks, newTask]);

  // }

  const handleDelete = async (id) => {
    console.log('Removing item with ID:', id);

    try {
      const taskRef = collection(db, 'todolist');
      console.log("taskRef", taskRef);

      const stringId = id.toString();
      const listRef = doc(taskRef, stringId);
      console.log("listRef", listRef);
      await deleteDoc(listRef);
      console.log('removed from db successfully!');

      const updatedItems = tasks.filter(item => item.id !== id);
      setTasks(updatedItems);
      console.log("removed the task from UI");

    } catch (e) {
      console.log("error :", e);
    }
  }

  const handleEdit = (id) => {
    setEditTaskId(id);
    const taskToEdit = tasks.find(task => task.id === id);
    setEditedTask(taskToEdit.tasks);
  };

  const handleSaveEdit = async (id) => {
    try {
      const taskRef = doc(collection(db, 'todolist'), id.toString());
      await updateDoc(taskRef, { tasks: editedTask });
      console.log('Task updated successfully!');
  
      setTasks((prevTasks) => prevTasks.map((task) => 
        task.id === id ? { ...task, tasks: editedTask } : task
      ));
  
      setEditTaskId(null);
    } catch (error) {
      console.error('Error updating task:', error.message);
    }
  };


  return (
    <div className='text-center'>
      <h2 className='mt-5 text-[20px] font-semibold'>To do List</h2>
      <div className='mx-auto justify-center'>
        <ul className=''>
          {tasks.map((task) => (
            <li
              key={task.id}
              className='flex justify-center left-80 w-1/2 mt-5 border p-4 rounded-lg bg-gray-100 space-y-2 relative'
            >
              {editTaskId === task.id ? (
                <>
                  <input
                    type="text"
                    value={editedTask}
                    onChange={(e) => setEditedTask(e.target.value)}
                    className='p-1'
                  />
                  <button onClick={() => handleSaveEdit(task.id)} className='ml-8 bg-gray-400 text-white px-3 rounded-md h-8'>Save</button>
                </>
              ) : (
                <>
                  <h2 className='text-xl font-bold'>
                    {task.tasks}
                  </h2>
                  <HiOutlinePencil
                    className='right-9 top-4 absolute cursor-pointer'
                    onClick={() => handleEdit(task.id)}
                  />
                  <HiXMark
                    className='right-2 top-4 absolute cursor-pointer'
                    onClick={() => handleDelete(task.id)}
                  />
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TodoList