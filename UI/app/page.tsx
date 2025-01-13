"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Technique } from './interfaces';

const TechniqueCard: React.FC<{ technique: Technique }> = ({ technique }) => (
  <div key={technique.name} className="card w-full bg-white p-4 rounded-md shadow-md shadow-gray-300">
    <h3 className="text-xl font-semibold mb-1 text-gray-800 break-words">{technique.name}</h3>
    <p className="text-sm text-gray-600 mb-2">({technique.japaneseName} - {technique.description})</p>
    <p className="text-xs text-gray-800 mb-2">Key principles: {technique.keyPrinciples.join(', ')}</p>
    {technique.referenceVideos.length > 0 && (
      <div className="mb-3">
        <ul className="list-decimal list-inside pl-4">
          {technique.referenceVideos.map((videoLink, index) => ( 
            <li key={index} className="text-blue-600 hover:underline">
              <a href={videoLink} target="_blank" rel="noopener noreferrer">Watch a video <span> &#128279;</span></a>
            </li>
          ))}
        </ul>
      </div>
    )}
    {technique.referenceImages.length > 0 && (
      <div className="w-full overflow-hidden">
        {technique.referenceImages?.map((imageLink) => (
          <Image
            key={imageLink}
            src={imageLink}
            alt={technique.name}
            className="rounded-md w-full h-auto"
            width={300}
            height={200}
          />
        ))}
      </div>
    )}
  </div>
);

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTechniques, setFilteredTechniques] = useState<Technique[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    // Fetch data from the API
    fetch('https://us-central1-judo-techniques-daniel.cloudfunctions.net/getAllTechniques')
      .then(response => response.json())
      .then((data: Technique[])  => {
        setFilteredTechniques(data);
        // Extract unique categories from the fetched data
        setCategories(Array.from(new Set(data.map((technique: Technique) => technique.category))));
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const highlightMatchingText = (text: string, query: string) => {
    if (!query) {
      return text;
    }

    const index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) {
      return text;
    }

    return (
      <>{text.substring(0, index)}<mark className="bg-blue-200 text-black">{text.substring(index, index + query.length)}</mark>{text.substring(index + query.length)}</>
    );
  };

  const typeSearch = (e: { target: { value: string; }; }) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchQuery(searchTerm);
    const filteredCategory = filteredTechniques.filter((technique) => {
      return technique.category.toLowerCase().includes(searchTerm);
    });

    // Extract unique categories from the filtered results
    const filteredCategorySet = new Set(filteredCategory.map(technique => technique.category));

    if (filteredCategorySet.size === 1) {
      // If there's only one result, set the selectedCategory
      setSelectedCategory(filteredCategorySet.values().next().value || null);
    } else {
      setSelectedCategory(null);
    }
  }
  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-black text-white">
      <h1 className="text-4xl font-bold mb-8 text-center">Judo Techniques</h1>

      <div className="card bg-gray-800 p-4 rounded-md mb-8">
        <input
          type="text"
          placeholder="Search techniques..."
          className="mb-6 w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={typeSearch}
        />

        <div className="flex flex-wrap justify-center gap-1">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
              className={`relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 ${selectedCategory === category || selectedCategory === null ? 'bg-opacity-100' : 'bg-opacity-5'
                }`}
            >
              <span className={`relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md ${selectedCategory === category || selectedCategory === null ? 'bg-opacity-100' : 'bg-opacity-10 blur-sm'
                }`}>
                {highlightMatchingText(category, searchQuery)}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredTechniques
          .filter((technique) => !selectedCategory || technique.category === selectedCategory)
          .map((technique) => (
            <TechniqueCard key={technique.name} technique={technique} />
          ))}
      </div>
      <hr className='mb-8 mt-8' />
      <p className="text-center text-xs text-gray-400 mb-4">It's important to understand that the Kodokan syllabus is extensive and has evolved over time. There isn't one definitive, universally agreed-upon "list" with a fixed number of techniques. However, I can provide you with a comprehensive overview of the main categories and techniques generally recognized within the Kodokan Judo system, based on the Gokyo no Waza and other recognized techniques.</p>
    </div>
  );
}
