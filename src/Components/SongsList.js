import React from 'react';

const SongsList = ({ songs }) => {
  return (
    <div>
      <hr />
      <p>Song List:</p>
      <ul>
        {songs.length > 0 ? (
          songs.map((song) => (
            <li key={song.id}>
              {song.get('Title')} by {song.get('Artist')}
            </li>
          ))
        ) : (
          <p>No songs available.</p>
        )}
      </ul>
    </div>
  );
};

export default SongsList;
