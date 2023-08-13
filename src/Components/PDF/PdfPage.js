import React, { useRef } from 'react';
import { savePDF } from '@progress/kendo-react-pdf';
import { MathJaxContext, MathJax } from 'better-react-mathjax';

const PdfPage = () => {
    const pdfBodyRef = useRef(null);

  const data = [
    
    {
        "_id": "64c3be87265d39f9298ba79c",
        "topic": "quadratic-equations",
        "id": 0,
        "type": "type-1-quadratic-equations",
        "difficulty": "medium",
        "question": "Which of the following equations is a quadratic?",
        "options": {
            "A": "\\(x^3 - x^2 - x + 5 = 0\\)",
            "B": "\\(x^4 - 10\\)",
            "C": "\\(7x^2 = 49\\)",
            "D": "\\(x^4 - x^3 = 9000\\)",
            "E": "None of the above"
        },
        "correct_option": "C",
        "solution": "Clearly, \\(7x^2 = 49\\) or \\(7x^2 - 49 = 0\\), which is of the form \\(ax^2 + bx + c = 0\\), \n where \\(b = 0\\).\nThus, \\(7x^2 - 49 = 0\\) is a quadratic equation."
    },
    {
        "_id": "64c3be87265d39f9298ba79d",
        "topic": "quadratic-equations",
        "id": 1,
        "type": "type-2-quadratic-roots",
        "difficulty": "easy",
        "question": "Which of the following equations has real roots?",
        "options": {
            "A": "\\(2x^2 - 3x + 4 = 0\\)",
            "B": "\\((x - 1)(2x - 5) = 0\\)",
            "C": "\\(3x^2 + 4x + 5 = 0\\)",
            "D": "Cannot be determined",
            "E": "None of the above"
        },
        "correct_option": "B",
        "solution": "\\((x - 1)(2x - 5) = 0 \\Rightarrow x = 1, \\frac{5}{2}\\)\nSo, its roots are real."
    },
    {
        "_id": "64c3be87265d39f9298ba79e",
        "topic": "quadratic-equations",
        "id": 2,
        "type": "type-3-quadratic-solutions",
        "difficulty": "hard",
        "question": "Find the roots of the equation \\(2x^2 - 9x - 18 = 0\\).",
        "options": {
            "A": "\\(\\frac{3}{2}\\) and 6",
            "B": "\\(-\\frac{3}{2}\\) and \\(-6\\)",
            "C": "\\(-\\frac{3}{2}\\) and 6",
            "D": "\\(\\frac{3}{2}\\) and \\(-6\\)",
            "E": "None of the above"
        },
        "correct_option": "C",
        "solution": '<p class="MsoNormal" style=\'text-align:justify\'><span lang="EN-IN"><span style=\'\' type="latex" mathjax="">\\( \\frac { 1 } { ( \\sqrt { 2 } - 1 ) } \\)</span></span></p>'
    }
    
    // Add more data entries as needed
  ];

  const createPdf = () => {
    if (pdfBodyRef.current) {
      savePDF(pdfBodyRef.current, {
        paperSize: 'Letter',
        fileName: 'form.pdf',
        margin: '20px',
        scale: 0.6,
      });
    }
  };

  return (
    
    <div className="pdf-container">
      <div className="pdf-toolbar">
        <center>
          <button
            style={{
              margin: '0.9em 1.5em',
              background: 'blue',
              color: 'white',
              padding: '0.2em 0.5em',
              fontSize: '1em',
            }}
            onClick={createPdf}
          >
            Create PDF
          </button>
        </center>
      </div>
      
      


      <div className="pdf-body" id="pdf-body" ref={pdfBodyRef}>
      <div class="flex flex-col text-center w-full mb-12">
      <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Historical Sources And Pre Historic Period</h1>
      <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Aptitude Tracker - Free Dynamic Dpps For Everyone.</p>
    </div>
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto">
      <MathJaxContext>
      <div className='mt-8'>
            {data.map((question, index) => (
              <div
                key={question._id}
                className={`py-4 px-4 bg-white rounded shadow ${
                  index !== 0 ? 'mt-4' : ''
                }`}
              >
                <h2 className="text-lg font-semibold mb-2">{question.topic}</h2>
                <p className="text-gray-600">{question.question}</p>
                <ul className="mt-2 space-y-1">
                  {Object.keys(question.options).map((optionKey) => (
                    <li key={optionKey} className="flex items-center">
                      <input
                        type="radio"
                        name={`question_${question._id}`}
                        className="mr-2"
                      />
                      <span className="text-gray-700">{question.options[optionKey]}</span>
                    </li>
                  ))}
                </ul>
                <MathJax><span className="text-gray-700">{question.solution}</span></MathJax>
              </div>
            ))}
          </div>
          </MathJaxContext>
      </div>
    </div>
</div>


    </div>
    
  );
};

export default PdfPage;
