
import React from 'react';

function GenreFilter({ genres, setSelectedGenre, languages, setSelectedLanguage }) {
  return (
    <div className="filter">
      <h3>Filter by Genre</h3>
      <select onChange={(e) => setSelectedGenre(e.target.value)}>
        <option value="">All Genres</option>
        {genres.map(genre => (
          <option key={genre.id} value={genre.id}>{genre.name}</option>
        ))}
      </select>

      <h3>Filter by Language</h3>
      <select onChange={(e) => setSelectedLanguage(e.target.value)}>
        <option value="">All Languages</option>
        {languages.map((language, index) => (
          <option key={index} value={language}>
            {language.toUpperCase()} {/* Display language code in uppercase */}
          </option>
        ))}
      </select>
    </div>
  );
}

export default GenreFilter;
