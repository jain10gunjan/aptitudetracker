import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from '../Components/Navbar';
import { Helmet } from 'react-helmet';
import Footer from '../Components/Footer';
import axios from 'axios';

const topicData = {
    'number-system': {
      name: 'Number System',
      storageKey: 'numbersystemcompletedQuestions',
      pageValue: 'number-system'
    },
    'ratio-and-proportion': {
      name: 'Ratio and Proportion',
      storageKey: 'ratiocompletedQuestions',
      pageValue: 'ratio-and-proportion'
    },
    'averages': {
      name: 'Averages',
      storageKey: 'averagescompletedQuestions',
      pageValue: 'averages'
    },
    'calendars': {
      name: 'Calendars',
      storageKey: 'calendarscompletedQuestions',
      pageValue: 'calendars'
    },
    'chain-rule': {
      name: 'Chain Rule',
      storageKey: 'chainrulecompletedQuestions',
      pageValue: 'chain-rule'
    },
    'coding-and-decoding': {
      name: 'Coding and Decoding',
      storageKey: 'codinganddecodingcompletedQuestions',
      pageValue: 'coding-and-decoding'
    },
    'hcf-and-lcm': {
      name: 'HCF and LCM',
      storageKey: 'hcfandlcmcompletedQuestions',
      pageValue: 'hcf-and-lcm'
    },
    'order-man-out-series': {
      name: 'Order Man Out Series',
      storageKey: 'ordermanoutseriescompletedQuestions',
      pageValue: 'order-man-out-series'
    },
    'order-of-magnitude': {
      name: 'Order of Magnitude',
      storageKey: 'orderofmagnitudecompletedQuestions',
      pageValue: 'order-of-magnitude'
    },
    'problems-on-partnership': {
      name: 'Order of Magnitude',
      storageKey: 'partnershipcompletedQuestions',
      pageValue: 'problems-on-partnership'
    },
    'percentage': {
      name: 'Percentage',
      storageKey: 'percentagecompletedQuestions',
      pageValue: 'percentage'
    },
    'pipes-and-cistern': {
      name: 'Pipes and Cistern',
      storageKey: 'pipesandcisterncompletedQuestions',
      pageValue: 'pipes-and-cistern'
    },
    'problems-on-ages': {
      name: 'Problems on Ages',
      storageKey: 'problemsonagescompletedQuestions',
      pageValue: 'problems-on-ages'
    },
    'problems-on-trains': {
      name: 'Problems on Trains',
      storageKey: 'trainscompletedQuestions',
      pageValue: 'problems-on-trains'
    },
    'profit-and-loss': {
      name: 'Profit and Profit',
      storageKey: 'profitandlosscompletedQuestions',
      pageValue: 'profit-and-loss'
    },
    'quadratic-equations': {
      name: 'Quadratic Equations',
      storageKey: 'quadraticcompletedQuestions',
      pageValue: 'quadratic-equations'
    },
    'sets-and-functions': {
      name: 'Sets and Functions',
      storageKey: 'setsandfunctionscompletedQuestions',
      pageValue: 'sets-and-functions'
    },
    'simple-interest': {
      name: 'Simple Interest',
      storageKey: 'simpleinterestcompletedQuestions',
      pageValue: 'simple-interest'
    },
    'simplification': {
      name: 'Simplification',
      storageKey: 'simplificationcompletedQuestions',
      pageValue: 'simplification'
    },
    'sqaure-roots-and-cube-roots': {
      name: 'Sqaure Roots and Cube Roots',
      storageKey: 'sqaureandcubecompletedQuestions',
      pageValue: 'sqaure-roots-and-cube-roots'
    },
    'surds-and-indices': {
      name: 'Surds and Indices',
      storageKey: 'surdsandindicescompletedQuestions',
      pageValue: 'surds-and-indices'
    },
    'time-and-work': {
      name: 'Time and Work',
      storageKey: 'timeandworkcompletedQuestions',
      pageValue: 'time-and-work'
    },
    'work-and-wages': {
      name: 'Work and Wages',
      storageKey: 'workandwagescompletedQuestions',
      pageValue: 'work-and-wages'
    },
    'boats-and-streams': {
      name: 'Boats and Streams',
      storageKey: 'boatsandstreamscompletedQuestions',
      pageValue: 'boats-and-streams'
    },
    // Add more topics and their respective JSON files here
  };

const LegacyPage = () => {

  let { topic } = useParams();
  let { qid } = useParams();
  const [data, setData] = useState([]);

  const id = parseInt(qid);

  const topicInfo = topicData[topic];
  const chapterName = topicInfo.name;
  const pageValue = topicInfo.pageValue;
  const apiEndpoint = process.env.REACT_APP_API;

  useEffect(() => {
    console.log('working');
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiEndpoint}?topic=${pageValue}`);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [apiEndpoint, pageValue]);

  const handleOptionClick = (option) => {
    if (!data[id] || option !== data[id].correct_option) {
      toast.error('Wrong option');
    } else {
      toast.success('Correct option');
    }

    const optionDiv = document.getElementById(option);
    if (optionDiv) {
      optionDiv.className = option === data[id].correct_option ? 'correct' : 'wrong';
    }
  };
  
  let x = Math.floor((Math.random() * 5) + 1);
   
  
  let q1 = x;
  let q2 = x + 1;
  let q3 = x + 2;
  let q4 = x + 3;
  let q5 = x + 4;
  
    
    const schema = {
      "@context": "https://schema.org/",
      "@type": "Quiz",
      "about": {
        "@type": "Question",
        "name": `${data[id]?.question}`
      },
      "educationalAlignment": [
        {
          "@type": "AlignmentObject",
          "alignmentType": "educationalSubject",
          "targetName": `${chapterName}`
        }
      ],
      "hasPart": [
        {
          "@context": "https://schema.org/",
          "@type": "Question",
          "eduQuestionType": "Flashcard",
          "text":
            `${data[id]?.question}`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Correct option is : ${data[id]?.correct_option}`
          }
        }
      ]
    };
  
    
  
      return (
        <>
        
        <Navbar/>
    
        <Helmet>
  
        <title>{data[id]?.question ? data[id].question.slice(0, 90) : 'Aptitude Questions'}</title>
        <meta name="description" content={data[id]?.question}/>
        <meta name="keywords"content={`Aptitude Questions, Placements preparation, ${chapterName} Placements Questions, UPSC ${chapterName} Questions.`}/>
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/es5/tex-mml-chtml.js"></script>
        </Helmet>
           
        <section class="mt-20 text-gray-600 body-font relative">
      <div class="container px-5 py-2 mx-auto flex sm:flex-nowrap flex-wrap">
        <div class="w-full lg:w-2/3 md:w-1/2 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
        <div>
            <div class="question-numbercontainer"> 
            <p class="text-sm text-gray-600">Aptitude Questions <br/>Chapter : {chapterName} </p> 
            </div>                
            <div class="questioncontainer">                     
            <h1>{data[id]?.question}</h1>                                      
            </div>                
            <div class="optionscontainer">
    
    
            <div onClick={() => handleOptionClick("A")} id="A">{data[id]?.options[String.fromCharCode(65 + 0)]}</div>
  <div onClick={() => handleOptionClick("B")} id="B">{data[id]?.options[String.fromCharCode(65 + 1)]}</div>
  <div onClick={() => handleOptionClick("C")} id="C">{data[id]?.options[String.fromCharCode(65 + 2)]}</div>
  <div onClick={() => handleOptionClick("D")} id="D">{data[id]?.options[String.fromCharCode(65 + 3)]}</div>                 
                                         
                                 </div>                
                                 <div>                                     
                                    </div>     
  
                                    {/* Buttons */}
                                    <span class="hover:bg-gray-400 text-xs mr-2 py-1.5 px-4 text-gray-600 bg-green-100 rounded-2xl">
                      Solution
                  </span>
  <div class="mt-0 mb-20 flex flex-wrap items-center">
  
  
  
                  {/* Accordian */}
  
                  
                  <span class="text-neutral-600 mt-3 group-open:animate-fadeIn">
            Correct Option: {data[id]?.correct_option}
            <br/>
  {data[id]?.solution}
                       
                  </span>
  {/* Accordian */}
              </div>
  {/* Buttons */}         
                                    </div>
  
  
  
  
                                    
                                            </div>
        <div class="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
        <h2 class="text-2xl font-medium text-gray-900 title-font mb-2">Related Questions</h2>
        
        <a href={`/${pageValue}/questions/${q1}`}
  class="text-sm leading-relaxed text-left">
    
             {x}: {data[q1]?.question.slice(0, 100)}...
                                                 
                </a>
                <br/>
    
                <a href={`/${pageValue}/questions/${q2}`}
                class="text-sm leading-relaxed text-left">
             {x+1}: {data[q2]?.question.slice(0, 100)}...
                </a><br/>
    
                <a href={`/${pageValue}/questions/${q3}`} class="text-sm leading-relaxed text-left">
            {x+2}:  {data[q3]?.question.slice(0, 100)}...
                </a><br/>
    
    
                <a href={`/${pageValue}/questions/${q4}`} class="text-sm leading-relaxed text-left">
             {x+3}: {data[q4]?.question.slice(0, 100)}...
                </a><br/>
    
    
                <a href={`/${pageValue}/questions/${q5}`} class="text-sm leading-relaxed text-left">
            {x+4}: {data[q5]?.question.slice(0, 100)}...
                </a><br/>
          </div>
          </div>       
          </section>
    
                                    <Toaster/>
                                    <Footer/>
        </>
      )
    }

export default LegacyPage
