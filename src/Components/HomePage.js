import React, {useState, useEffect, useMemo} from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
// import {dataData} from '../Questions/Quality/data';
import axios from 'axios';

const HomePage = () => {
    const [text, setText] = useState('');
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const isTyping = true;
  const apiEndpoint = process.env.REACT_APP_API;

  const messages = useMemo(
    () => ['Percentage', 'Time and Work', 'Profit and Loss.'],
    []
  );

  useEffect(() => {
    let currentIndex = 0;
    let currentText = '';
    let timer;

    const type = () => {
      if (currentIndex === messages.length) {
        currentIndex = 0; // Reset to the beginning of the messages array
      }

      if (currentText.length === messages[currentIndex].length) {
        clearTimeout(timer);
        timer = setTimeout(erase, 1000); // Display each message for 1 second before erasing
        return;
      }

      currentText = messages[currentIndex].slice(0, currentText.length + 1);
      setText(currentText);

      timer = setTimeout(type, 100); // Adjust typing speed here
    };

    const erase = () => {
      if (currentText.length === 0) {
        currentIndex++;
        timer = setTimeout(type, 500); // Delay before typing the next message
        return;
      }

      currentText = currentText.slice(0, currentText.length - 1);
      setText(currentText);

      timer = setTimeout(erase, 50); // Adjust erasing speed here
    };

    if (isTyping) {
      timer = setTimeout(type, 1000); // Start typing after 1 second
    }

    // Cleanup function to clear the timeout when the component unmounts
    return () => {
      clearTimeout(timer);
    };
  }, [isTyping, messages]);


  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const query = searchText.replace(/\s+/g, "+");

    // Perform any additional actions based on the search text here (e.g., API calls, filtering data, etc.)
    try {
      // Send a GET request to the API endpoint with the search query
      const response = await axios.get(`${apiEndpoint}?question=${query}`);
      //console.log(`https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/aptitudeData?question=${query}`);
      // Update the state with the search results
      setSearchResults(response.data); // Assuming the API returns an array of results
      setShowModal(true); // Show the modal with the search results
    } catch (error) {
      console.error("Error fetching data:", error);
      setSearchResults([]); // Clear the results if an error occurs
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  
  return (
    <>
      <div className=''>
        <Navbar />

        <section class="mt-10 w-full px-3 antialiased lg:px-6 tails-selected-element">
          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white border-lg border-4 border-gray-600 lg:w-1/2 w-max rounded-lg p-6 max-h-full overflow-y-auto">
                {/* Your modal content */}
                <h2 className="text-xl font-bold text-center mb-4">Search Results</h2>
                <ul>
                  {searchResults.map((result, i) => (
                    <>
                      <div class="py-5">
                        <details class="group">
                          <summary class="flex justify-between items-center font-medium cursor-pointer list-none">
                            <span> <a href={`/questions/${result._id}`}>{result.question}</a></span>
                            <span class="transition group-open:rotate-180">
                              <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
                              </svg>
                            </span>
                          </summary>
                           
                        </details>
                      </div>
                       
                    </>

                  ))}
                </ul>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          )}


        </section>

        
        <section class="mt-32 text-gray-600 body-font">
          <div class="container mx-auto flex flex-col px-5 py-10 justify-center items-center">
            <div class="w-full md:w-2/3 flex flex-col mb-16">
              <div class="max-w-7xl">
                <div class="container mb-24 mx-auto text-center sm:px-4">
                  <h1 class="text-4xl font-extrabold leading-10 tracking-tight text-gray-800 sm:text-4xl sm:leading-none md:text-6xl xl:text-6xl"><span class="block">AptitudeTracker<sub>.com</sub></span></h1>
                  <h1 class="text-2xl font-extrabold leading-10 tracking-tight text-gray-800 sm:text-2xl sm:leading-none md:text-3xl xl:text-5xl"><span class="relative inline-block mt-3 text-gray-600"><a href={`/${text.toLowerCase()}`}>Practice {text} </a></span></h1>
                </div>
                <form onSubmit={handleSubmit}>
                  <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                  <div class="relative mb-8">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                      </svg>
                    </div>
                    <input
                      onChange={handleSearchChange}
                      type="search"
                      id="default-search"
                      className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Search Questions "
                      required
                      value={searchText} // Bind the input value to the state
                    />
                    <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                  </div>
                </form>

              </div>
            </div>
               


            


          </div>

        </section>

        <Footer />
      </div>
    </>
  );
}

export default HomePage