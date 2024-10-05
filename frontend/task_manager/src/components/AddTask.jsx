import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';

const AddTask = ({ addTaskSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([{ name: '', color: '#FFFFFF' }]);
  const [completed, setCompleted] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  
  const navigate = useNavigate();

  const colorOptions = [
    { name: 'Red', value: '#FF0000' },
    { name: 'Green', value: '#00FF00' },
    { name: 'Blue', value: '#0000FF' },
    { name: 'Yellow', value: '#FFFF00' },
    { name: 'Orange', value: '#FFA500' },
    { name: 'White', value: '#FFFFFF' },
  ];

  // Add new tag field
  const addTagField = () => {
    setTags([...tags, { name: '', color: '#FFFFFF' }]);
  };

  // Remove tag field
  const removeTagField = (index) => {
    if (tags.length > 1) {
      const newTags = tags.filter((_, i) => i !== index);
      setTags(newTags);
    }
  };

  // Fetch tag suggestions from the backend
  const fetchSuggestions = async (value) => {
    try {
      const response = await axios.get(`http://localhost:8000/tags_autofill/?q=${value}`);
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    fetchSuggestions(value);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion) => suggestion.name;

  const renderSuggestion = (suggestion) => (
    <div>
      {suggestion.name}
    </div>
  );

  // Handle tag change
  const handleTagChange = (index, field, value) => {
    const newTags = [...tags];
    newTags[index][field] = value;
    setTags(newTags);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Handle form submission
  const submitForm = async (e) => {
    e.preventDefault();

    const newTask = {
      title,
      description,
      tag: tags.map(tag => ({
        name: capitalizeFirstLetter(tag.name),
        color: tag.color || '#FFFFFF',
      })),
      completed: completed ? true : false,
    };

    console.log('Data being sent to the backend:', newTask);
    await addTaskSubmit(newTask);

    return navigate('/tasks');
  };

  return (
    <section className='bg-red-50 min-h-screen'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <form onSubmit={submitForm}>
            <h2 className='text-3xl text-center font-semibold mb-6'>Add Task</h2>
            
            {/* Title Field */}
            <div className='mb-4'>
              <label htmlFor='title' className='block text-gray-700 font-bold mb-2'>
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
            
            {/* Description Field */}
            <div className='mb-4'>
              <label htmlFor='description' className='block text-gray-700 font-bold mb-2'>
                Description
              </label>
              <input
                type='textarea'
                id='description'
                name='description'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='eg. Be Happy each and every day of my life'
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            
            {/* Tags Field */}
            <label htmlFor='tag' className='block text-gray-700 font-bold mb-2'>
              Tag
            </label>
            {tags.map((tag, index) => (
              <div key={index} className='relative flex items-center mb-4 w-full'>
                
                {/* Autocomplete Input for Tag Name */}
                <div className="w-full relative mb-2">
                  <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={{
                      placeholder: 'Tag name',
                      value: tag.name,
                      onChange: (e, { newValue }) => handleTagChange(index, 'name', newValue),
                      className: 'border rounded w-full py-2 px-3',  // Add styling here to match title/description
                    }}
                    theme={{
                      container: 'relative w-full',  // Ensure container takes full width
                      suggestionsContainer: 'absolute z-10 bg-white border rounded shadow-lg',  // Dropdown appears in absolute positioning
                      suggestion: 'p-2 cursor-pointer hover:bg-gray-100',
                    }}
                  />
                </div>

                {/* Color picker */}
                <div className="flex space-x-2 ml-4">
                  {colorOptions.map((color) => (
                    <div
                      key={color.value}
                      className={`w-6 h-6 rounded-full cursor-pointer border ${tag.color === color.value ? 'ring-2 ring-offset-2 ring-' + color.value : ''}`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => handleTagChange(index, 'color', color.value)}
                    ></div>
                  ))}
                </div>
                
                {/* Add and Remove Buttons */}
                <span className='text-blue-600 text-lg font-bold cursor-pointer mx-2' onClick={addTagField}>
                  +
                </span>
                <span className='text-red-600 text-lg font-bold cursor-pointer mx-2' onClick={() => removeTagField(index)}>
                  -
                </span>
              </div>
            ))}
            
            {/* Completed Field */}
            <div className='mb-4'>
              <label htmlFor='completed' className='block text-gray-700 font-bold mb-2'>
                Completed
              </label>
              <select
                id='completed'
                name='completed'
                className='border rounded w-full py-2 px-3 mb-2'
                required
                value={completed ? 'Yes' : 'No'}
                onChange={(e) => setCompleted(e.target.value === 'Yes')}
              >
                <option value='Yes'>Yes</option>
                <option value='No'>No</option>
              </select>
            </div>
            
            {/* Submit Button */}
            <div>
              <button
                className='bg-red-400 text-black hover:bg-red-300 hover:text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
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
