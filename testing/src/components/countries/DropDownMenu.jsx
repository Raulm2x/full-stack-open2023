const DropdownMenu = ({countries, selectedCountry, handleCountryChange}) => {
  
  return (
    <div>
      <h2>Dropdown Menu</h2>
      <label htmlFor="countries">Choose a country:</label>
      <select id="countries" value={selectedCountry} onChange={handleCountryChange}>
        <option value="" disabled>Select a country</option>
        {countries.map((country, index) => (
          <option key={index} value={country.name}>{country.name}</option>
        ))}
      </select>
      {selectedCountry && <p>You selected: {selectedCountry}</p>}
    </div>
  );
};

export default DropdownMenu;
