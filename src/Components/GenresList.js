import React from 'react';

const GenresList = ({ genres }) => {
  return (
    <div>
      <hr />
      <p>Genre List:</p>
      <ul>
        {genres.length > 0 ? (
          genres.map((genre) => (
            <li key={genre.id}>
              {genre.get('Name')}
            </li>
          ))
        ) : (
          <p>No genres available.</p>
        )}
      </ul>
    </div>
  );
};

export default GenresList;
