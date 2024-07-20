import React, { useState } from 'react';

const Survey = ({ onFormSubmit }) => {
  const [selectedOption, setSelectedOption] = useState("Pop");
  const [customGenre, setCustomGenre] = useState("");

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value !== "Other") {
      setCustomGenre("");
    }
  };

  const handleTextChange = (event) => {
    setCustomGenre(event.target.value);
  };

  return (
    <div>
      <p>What is your favorite genre of music?</p>

      {/* form that allows user to select one of four music choices */}
      <form id="survey" action="" method="get" onSubmit={onFormSubmit}>
        <input
          type="radio"
          id="pop"
          name="fav_music_genre"
          value="Pop"
          checked={selectedOption === "Pop"}
          onChange={handleRadioChange}
        />
        <label htmlFor="pop">Pop</label><br />

        <input
          type="radio"
          id="rock"
          name="fav_music_genre"
          value="Rock"
          checked={selectedOption === "Rock"}
          onChange={handleRadioChange}
        />
        <label htmlFor="rock">Rock</label><br />

        <input
          type="radio"
          id="hiphop"
          name="fav_music_genre"
          value="Hip Hop"
          checked={selectedOption === "Hip Hop"}
          onChange={handleRadioChange}
        />
        <label htmlFor="hiphop">Hip Hop</label><br />

        <input
          type="radio"
          id="other"
          name="fav_music_genre"
          value="Other"
          checked={selectedOption === "Other"}
          onChange={handleRadioChange}
        />
        <label htmlFor="other">Other</label><br />

        <input
          type="text"
          name="custom_genre"
          value={customGenre}
          onInput={handleTextChange}
          placeholder="Please specify genre..."
          disabled={selectedOption !== "Other"}
          required
        />

        <br /><br />

        {/* Form allows user to enter their name */}
        <p>What is your name?</p>
        <input
          autoComplete='on'
          name="name"
          type="text"
          placeholder="Enter name here..."
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Survey;
