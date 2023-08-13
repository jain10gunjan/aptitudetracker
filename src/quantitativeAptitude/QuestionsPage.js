import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from '../Components/Navbar';
import { Helmet } from 'react-helmet';
// import Footer from '../components/Footer';
import axios from 'axios';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import Footer from '../Components/Footer';



const QuestionsPage = () => {

  //let { topic } = useParams();
  let { qid } = useParams();
  const [data, setData] = useState([]);

  //const id = parseInt(qid);


  const apiEndpoint = process.env.REACT_APP_API;

  useEffect(() => {
    console.log('working');
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiEndpoint}?_id=${qid}`);
        setData(response.data);
        //console.log(data)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [apiEndpoint,qid]);

  const handleOptionClick = (option) => {
    if (!data[0] || option !== data[0].correct_option) {
      toast.error('Wrong option');
    } else {
      toast.success('Correct option');
    }

    const optionDiv = document.getElementById(option);
    if (optionDiv) {
      optionDiv.className = option === data[0].correct_option ? 'correct' : 'wrong';
    }
  };
  // const chapterName = (data[0]?.topic.charAt(0).toUpperCase() + data[0]?.topic.slice(1)).replace(/-/g, ' '
  const chapterName = data[0]?.topic;

console.log(chapterName);


  console.log(chapterName);
  

  

    
    const schema = {
      "@context": "https://schema.org/",
      "@type": "Quiz",
      "about": {
        "@type": "Question",
        "name": `${data[0]?.question}`
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
            `${data[0]?.question}`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Correct option is : ${data[0]?.correct_option}`
          }
        }
      ]
    };
  
    
  
      return (
        <>
        
      <Navbar/>
        <Helmet>
  
        <title>{data[0]?.question ? data[0].question.slice(0, 90) : 'Aptitude Questions'}</title>
        <meta name="description" content={data[0]?.question}/>
        <meta name="keywords"content={`Aptitude Questions, Placements preparation, ${chapterName} Placements Questions, UPSC ${chapterName} Questions.`}/>
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </Helmet>
          
      <section class="mt-20 text-gray-600 body-font">
        <div class="container mx-auto flex flex-col px-5 py-10 justify-center items-center">
          <div class="w-full md:w-2/3 flex flex-col mb-16">   
            <div className="mb-8 overflow-x-auto scrolling-touch">
              <div className="flex border-b border-gray-200">
              <MathJaxContext>
          <div>
              <div class="relative question-numbercontainer">
                <p class="text-xs text-gray-600">Aptitude Questions <br />Chapter : {chapterName} </p>
                <p class="text-xs text-gray-600">Difficulty  : {data[0]?.difficulty} </p>
              </div>
              <div class="questioncontainer">
                <MathJax>{data[0]?.question}</MathJax>
              </div>
              <div class="flex-col leading-none optionscontainer">


                <div onClick={() => handleOptionClick("A", data[0]?.id)} id="A"><MathJax>A: {data[0]?.options['A']}</MathJax></div>
                <div onClick={() => handleOptionClick("B", data[0]?.id)} id="B"><MathJax>B: {data[0]?.options['B']}</MathJax></div>
                <div onClick={() => handleOptionClick("C", data[0]?.id)} id="C"><MathJax>C: {data[0]?.options['C']}</MathJax></div>
                <div onClick={() => handleOptionClick("D", data[0]?.id)} id="D"><MathJax>D: {data[0]?.options['D']}</MathJax></div>

              </div>
              <div>
              </div>

              {/* Buttons */}

              <div class="relative mt-0 mb-20 flex flex-wrap items-center">



                {/* Accordian */}
                <span class="text-neutral-600 mt-3 group-open:animate-fadeIn">
                    Correct Option: {data[0]?.correct_option}
                    <br />
                    <MathJax>{data[0]?.solution}</MathJax>
                     
                  </span>
                


       
                


                {/* Accordian 
    <a href={`/${pageValue + '/questions/' + i}`} className="absolute top-0 right-0 hover:bg-gray-400 text-xs mr-2 py-1.5 px-4 text-gray-600 bg-blue-100 rounded-2xl">Share</a>*/}


              </div>
              {/* Buttons */}

            </div>
            </MathJaxContext>
              </div>
            </div>
          </div>
        </div>
      </section>




                                    <Toaster/>
                                    <Footer/>
        </>
      )
    }

export default QuestionsPage
