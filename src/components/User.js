import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const User = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        const user = await userResponse.json();
        setUserData(user);

        // Fetch repositories
        const repositoriesResponse = await fetch(`https://api.github.com/users/${username}/repos`);
        const repos = await repositoriesResponse.json();
        setRepositories(repos);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [username]);

  return (
    <div className='grid'>
      <section className='intro'>
      {userData && (
        <div>
          <img src={userData.avatar_url} alt="Profile" />
          <h2> {userData.login}</h2>
        </div>
      )}
      </section>
      
      <h3>Repositories</h3>
      {repositories.length > 0 ? (
        <ul>
          {repositories.map((repo) => (
            <li key={repo.id}>{repo.name}</li>
          ))}
        </ul>
      ) : (
        <p>No repositories found</p>
      )}
    </div>
  );
};
