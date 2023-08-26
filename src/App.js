import {useState} from 'react'

function App() {
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [imageLinks, setImageLinks] = useState([]);
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${searchKeyword}&per_page=20`,
        {
          headers: {
            Authorization: 'Client-ID tUmP2hndyl8QSsSXoaBUzNury_onveMgQGyr9eDM9Qg',
          },
        }
      );

      const data = await response.json();
      const links = data.results.map((result) => result.urls.small);
      setImageLinks(links);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div> 
      <div>
        <input
          type="text"
          placeholder="Search images..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <button onClick={fetchData}>Search</button>
      </div>
      {loading ? (<h1> Loading.... </h1>) : (<div>
          {imageLinks.map((link, index) => (
            <img key={index} src={link} alt={`${index}`} />
          ))}
        </div>)}
    </div>
  );
}

export default App;
