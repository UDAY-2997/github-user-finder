import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Search = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username.trim() !== '') {
      navigate(`/user/${username}`);
    }
  };

  return (
    <div className='container'>
      <div className='grid'>
        <section>
          <h1>GitHub Finder</h1>
          <form className='flex' onSubmit={handleSubmit}>
            <input
              type='text'
              placeholder='Enter username'
              value={username}
              onChange={handleInputChange}
            />
            <button type='submit'>Search</button>
          </form>
        </section>
      </div>
    </div>
  );
};

export const User = () => {
  return <div></div>;
};
