import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddTask = ({ addTaskSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const [tagColor, setTagColor] = useState('');
  const [completed, setCompleted] = useState('');
  const [createdAt, setCreatedAt] = useState('');

  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    const newTask = {
      title,
      description,
      tag,
      tagColor,
      completed,
      createdAt
    };

    await addTaskSubmit(newTask);

    return navigate('/');
  };

  return (
    <section className='bg-indigo-50'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <form onSubmit={submitForm}>
            <h2 className='text-3xl text-center font-semibold mb-6'>Add Task</h2>
            <div className='mb-4'>
              <label
                htmlFor='title'
                className='block text-gray-700 font-bold mb-2'>
                Title
              </label>
              <input
                type='text'
                id='title'
                name='title'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='eg. Be Happy'
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='description'
                className='block text-gray-700 font-bold mb-2'>
                Description
              </label>
              <input
                type='text'
                id='description'
                name='description'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='eg. Be Happy each and every day of my life'
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='tag'
                className='block text-gray-700 font-bold mb-2'>
                Tag
              </label>
              <input
                type='text'
                id='tag'
                name='tag'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='eg. Urgent'
                required
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='tagColor'
                className='block text-gray-700 font-bold mb-2'>
                Tag Color
              </label>
              <select
                id='tagColor'
                name='tagColor'
                className='border rounded w-full py-2 px-3 mb-2'
                required
                value={tagColor}
                onChange={(e) => setTagColor(e.target.value)}
              >
                <option value='Red'>Red</option>
                <option value='Yellow'>Yellow</option>
                <option value='Blue'>Blue</option>
                <option value='Green'>Green</option>
                <option value='Orange'>Orange</option>
                <option value='White'>White</option>
              </select>
            </div>
            <div className='mb-4'>
              <label
                htmlFor='createdAt'
                className='block text-gray-700 font-bold mb-2'>
                Created at
              </label>
              <input
                type='text'
                id='createdAt'
                name='createdAt'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='eg. 25/10/2024'
                required
                value={createdAt}
                onChange={(e) => setCreatedAt(e.target.value)}
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='completed'
                className='block text-gray-700 font-bold mb-2'>
                Completed
              </label>
              <select
                id='completed'
                name='completed'
                className='border rounded w-full py-2 px-3 mb-2'
                required
                value={completed}
                onChange={(e) => setCompleted(e.target.value)}
              >
                <option value='Yes'>Yes</option>
                <option value='No'>No</option>
              </select>
            </div>
            <div>
              <button
                className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                type='submit'
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddTask;

