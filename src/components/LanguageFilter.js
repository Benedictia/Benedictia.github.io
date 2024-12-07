import React from 'react';

function LanguageFilter({ setSelectedLanguage, selectedLanguage }) {
  return (
    <div className="language-dropdown">
      <h3>Select Language</h3>
      <select onChange={(e) => setSelectedLanguage(e.target.value)} value={selectedLanguage}>
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="ru">Russian</option>
      </select>
    </div>
  );
}

export default LanguageFilter;
