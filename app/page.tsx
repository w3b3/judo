"use client"
import { useState, useEffect } from 'react';

// Import the JSON data
import judoTechniquesData from './judo-techniques.json';
interface JudoTechnique {
  category: string;
  name: string;
  japaneseName: string;
  referenceVideos: string[];
  referenceImages: string[];
}

interface JudoTechniqueData {
  techniques: JudoTechnique[];
}
  
export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTechniques, setFilteredTechniques] = useState<JudoTechnique[]>([]);

  useEffect(() => {
    // Set initial filtered techniques to the full list when the component mounts
    setFilteredTechniques(judoTechniquesData.techniques);
  }, []); 

  // Extract unique categories from the JSON data
  const categories = Array.from(new Set(judoTechniquesData.techniques.map((technique) => technique.category)));

  const highlightMatchingText = (text: string, query: string) => {
    if (!query) {
      return text;
    }

    const index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) {
      return text;
    }

    return (
      <>{text.substring(0, index)}<mark className="bg-yellow-200 text-black">{text.substring(index, index + query.length)}</mark>{text.substring(index + query.length)}</>
    );
  };

  const typeSearch = (e: { target: { value: string; }; }) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchQuery(searchTerm);
    const filteredCategory = (judoTechniquesData.techniques?.filter((technique) => {
      return technique.category.toLowerCase().includes(searchTerm);
    }) ?? []);
    const filteredCategorySet = new Set();
    filteredCategory.forEach((technique) => {
      console.log(technique.category)
      filteredCategorySet.add(technique.category);
    })
    // const categorySet = new Set()
    if (filteredCategorySet.size === 1) {
    // If there's only one result, set the selectedCategory
      setSelectedCategory(filteredCategorySet.values().next().value);
    } else {
      setSelectedCategory(null);
    }
    
    // TODO: now the category is defined. Find all techniques.
    // const _filteredTechniques = judoTechniquesData.techniques.find((technique) => {
    //   return technique.category.toLowerCase() === filteredCategory?.category.toLowerCase();
    // });
    // setFilteredTechniques(_filteredTechniques);
  };
  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-black text-white">
      <div className="card bg-gray-800 p-4 rounded-md mb-8">
        <input
          type="text"
          placeholder="Search techniques..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={typeSearch}
        />

        <div className="flex flex-wrap justify-center gap-4"> 
          {categories.map((category) => (
            <button
            key={category}
            onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
            className={`relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 ${
              selectedCategory === category || selectedCategory === null ? 'bg-opacity-100' : 'bg-opacity-5'
            }`}
          >
            <span className={`relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md ${
              selectedCategory === category || selectedCategory === null ? 'bg-opacity-100' : 'bg-opacity-10 blur-sm'
            }`}>
              {/* {category} */}
              {highlightMatchingText(category, searchQuery)}</span>
          </button>
          ))}
        </div>
      </div>

      {selectedCategory && (
        <div className="card bg-gray-800 p-4 rounded-md">          
          {filteredTechniques
            .filter((technique) => !selectedCategory || technique.category === selectedCategory) 
            .map((technique) => (
              <div key={technique.name} className="card bg-gray-700 p-4 rounded-md mb-4">
                <h3 className="text-lg font-semibold mb-2">{technique.name} ({technique.japaneseName})</h3>
                {technique.referenceVideos.length > 0 && (
                  <div className="mb-2">
                    <h4>Videos:</h4>
                    <ul>
                      {technique.referenceVideos.map((videoLink, index) => (
                        <li key={index}><a href={videoLink} target="_blank" rel="noopener noreferrer">{videoLink}</a></li>
                      ))}
                    </ul>
                  </div>
                )}
                {technique.referenceImages.length > 0 && (
                  <div>
                    <h4>Images:</h4>
                    <ul>
                      {technique.referenceImages.map((imageLink, index) => (
                        <li key={index}><a href={imageLink} target="_blank" rel="noopener noreferrer">{imageLink}</a></li>
                      ))}
                    </ul>
                  </div>
                )}
              </div> 
            ))}
          {!filteredTechniques.filter((technique) => !selectedCategory || technique.category === selectedCategory).length && <p>No matching techniques found.</p>}
        </div>
      )}
      <p className="text-center">It's important to understand that the Kodokan syllabus is extensive and has evolved over time. There isn't one definitive, universally agreed-upon "list" with a fixed number of techniques. However, I can provide you with a comprehensive overview of the main categories and techniques generally recognized within the Kodokan Judo system, based on the Gokyo no Waza and other recognized techniques.</p> 
    </div>
  );
}
