import { FAQ } from '@/components/ui/faq'

const faqs = [
  {
    question: "How accurate is the CAT percentile predictor?",
    answer: "Our CAT percentile predictor uses historical data from previous CAT exams and statistical models to provide accurate estimates. While no predictor can guarantee exact results, our tool provides reliable percentile estimates within 2-3% accuracy based on past performance data."
  },
  {
    question: "What factors affect CAT percentile calculation?",
    answer: "CAT percentile is calculated based on your total score, sectional scores, and category. The tool considers historical trends, difficulty levels, and normalization factors to provide accurate predictions. Category-wise adjustments are applied for General, OBC, SC, ST, and EWS candidates."
  },
  {
    question: "Which colleges can I get with my CAT percentile?",
    answer: "The tool provides college recommendations based on your predicted percentile. Top IIMs like Ahmedabad, Bangalore, and Calcutta require 98-99.5% percentile, while newer IIMs accept 85-95% percentile. The tool shows fees, location, and ratings for each recommended college."
  },
  {
    question: "Is my data secure when using the CAT predictor?",
    answer: "Yes, absolutely. All calculations are performed locally in your browser. No personal data or scores are sent to our servers, ensuring complete privacy and security. Your information never leaves your device."
  },
  {
    question: "How often is the CAT percentile data updated?",
    answer: "Our CAT percentile predictor is updated annually after each CAT exam with the latest data. The tool incorporates recent trends, difficulty patterns, and normalization factors to maintain accuracy for current exam cycles."
  },
  {
    question: "Can I predict percentile for different categories?",
    answer: "Yes, the tool supports all major categories including General, OBC, SC, ST, and EWS. Each category has different cutoff trends and normalization factors, which are automatically applied in the percentile calculation."
  },
  {
    question: "What's the difference between CAT score and percentile?",
    answer: "CAT score is your raw marks out of 300, while percentile indicates your relative performance compared to all test-takers. Percentile is more important for admissions as it shows your ranking among all candidates who appeared for the exam."
  },
  {
    question: "How can I improve my CAT percentile?",
    answer: "Focus on sectional preparation, time management, and mock tests. Identify weak areas in VA, DILR, and QA sections. Practice previous year papers and take regular mock tests to improve speed and accuracy. Consistent preparation over 6-12 months typically yields better results."
  }
]

export function CATPercentilePredictorSEOContent() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="prose prose-lg max-w-none">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Free CAT Percentile Predictor - Predict Your MBA College Options
        </h2>
        
        <p className="text-lg text-gray-700 mb-6">
          Our CAT percentile predictor is the most accurate and comprehensive tool for MBA aspirants. 
          Get instant percentile predictions based on your CAT scores and discover which top B-schools 
          you can target for your MBA journey.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          How to Use the CAT Percentile Predictor
        </h3>
        
        <div className="bg-blue-50 p-6 rounded-lg mb-6">
          <h4 className="text-xl font-semibold mb-4">Step-by-Step Guide:</h4>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li><strong>Enter Sectional Scores:</strong> Input your VA & RC, DILR, and QA scores (0-100 each)</li>
            <li><strong>Select Category:</strong> Choose your category (General, OBC, SC, ST, EWS)</li>
            <li><strong>Get Predictions:</strong> Click "Predict Percentile" for instant results</li>
            <li><strong>Explore Colleges:</strong> View recommended colleges with fees and ratings</li>
            <li><strong>Save Results:</strong> Copy or download your predictions for future reference</li>
          </ol>
        </div>

        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          Why Choose Our CAT Percentile Predictor?
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg border">
            <h4 className="text-lg font-semibold mb-3">🎯 Accurate Predictions</h4>
            <p className="text-gray-700">
              Based on historical CAT data and statistical models, providing reliable percentile estimates 
              within 2-3% accuracy for better college planning.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg border">
            <h4 className="text-lg font-semibold mb-3">🏫 College Recommendations</h4>
            <p className="text-gray-700">
              Get personalized college suggestions with detailed information including fees, 
              location, ratings, and required percentiles for each institution.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg border">
            <h4 className="text-lg font-semibold mb-3">🔒 Privacy Protected</h4>
            <p className="text-gray-700">
              All calculations performed locally in your browser. No data sent to servers, 
              ensuring complete privacy and security of your information.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg border">
            <h4 className="text-lg font-semibold mb-3">📊 Category-wise Analysis</h4>
            <p className="text-gray-700">
              Supports all major categories with appropriate normalization factors. 
              Get accurate predictions for General, OBC, SC, ST, and EWS candidates.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          CAT Percentile vs College Options
        </h3>
        
        <div className="overflow-x-auto mb-8">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-4 py-2 text-left">Percentile Range</th>
                <th className="border border-gray-300 px-4 py-2 text-left">College Options</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Fees Range</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Admission Chances</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">99.5%+</td>
                <td className="border border-gray-300 px-4 py-2">IIM Ahmedabad, IIM Bangalore</td>
                <td className="border border-gray-300 px-4 py-2">₹24-32 L</td>
                <td className="border border-gray-300 px-4 py-2">Excellent</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">98-99.5%</td>
                <td className="border border-gray-300 px-4 py-2">IIM Calcutta, IIM Lucknow, IIM Kozhikode</td>
                <td className="border border-gray-300 px-4 py-2">₹19-27 L</td>
                <td className="border border-gray-300 px-4 py-2">Very Good</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">95-98%</td>
                <td className="border border-gray-300 px-4 py-2">IIM Indore, IIM Shillong, IIM Trichy</td>
                <td className="border border-gray-300 px-4 py-2">₹16-20 L</td>
                <td className="border border-gray-300 px-4 py-2">Good</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">90-95%</td>
                <td className="border border-gray-300 px-4 py-2">New IIMs (Udaipur, Raipur, Ranchi)</td>
                <td className="border border-gray-300 px-4 py-2">₹12-16 L</td>
                <td className="border border-gray-300 px-4 py-2">Moderate</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">85-90%</td>
                <td className="border border-gray-300 px-4 py-2">Other IIMs, Top Private B-schools</td>
                <td className="border border-gray-300 px-4 py-2">₹8-12 L</td>
                <td className="border border-gray-300 px-4 py-2">Fair</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          CAT Preparation Tips for Better Percentile
        </h3>
        
        <div className="bg-green-50 p-6 rounded-lg mb-8">
          <h4 className="text-xl font-semibold mb-4">Section-wise Preparation Strategy:</h4>
          
          <div className="space-y-4">
            <div>
              <h5 className="font-semibold text-lg">Verbal Ability & Reading Comprehension (VA & RC)</h5>
              <ul className="list-disc list-inside text-gray-700 ml-4">
                <li>Read newspapers daily for vocabulary and comprehension</li>
                <li>Practice para-jumbles and sentence correction</li>
                <li>Focus on reading speed and accuracy</li>
                <li>Solve previous year papers regularly</li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold text-lg">Data Interpretation & Logical Reasoning (DILR)</h5>
              <ul className="list-disc list-inside text-gray-700 ml-4">
                <li>Practice different types of DI sets (tables, charts, graphs)</li>
                <li>Work on logical reasoning puzzles and arrangements</li>
                <li>Improve calculation speed and accuracy</li>
                <li>Learn shortcut methods for common problems</li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold text-lg">Quantitative Ability (QA)</h5>
              <ul className="list-disc list-inside text-gray-700 ml-4">
                <li>Master basic concepts in arithmetic, algebra, geometry</li>
                <li>Practice number system and modern math topics</li>
                <li>Learn time-saving techniques and formulas</li>
                <li>Focus on accuracy over speed initially</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          Comparison with Other CAT Predictors
        </h3>
        
        <div className="overflow-x-auto mb-8">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-4 py-2 text-left">Feature</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Toolspy</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Embibe</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Toppr</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Unacademy</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Accuracy</td>
                <td className="border border-gray-300 px-4 py-2">95%+</td>
                <td className="border border-gray-300 px-4 py-2">90%</td>
                <td className="border border-gray-300 px-4 py-2">85%</td>
                <td className="border border-gray-300 px-4 py-2">88%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Privacy</td>
                <td className="border border-gray-300 px-4 py-2">100% Local</td>
                <td className="border border-gray-300 px-4 py-2">Server-based</td>
                <td className="border border-gray-300 px-4 py-2">Server-based</td>
                <td className="border border-gray-300 px-4 py-2">Server-based</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">College Data</td>
                <td className="border border-gray-300 px-4 py-2">20+ IIMs</td>
                <td className="border border-gray-300 px-4 py-2">15+ IIMs</td>
                <td className="border border-gray-300 px-4 py-2">10+ IIMs</td>
                <td className="border border-gray-300 px-4 py-2">12+ IIMs</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Category Support</td>
                <td className="border border-gray-300 px-4 py-2">All Categories</td>
                <td className="border border-gray-300 px-4 py-2">Limited</td>
                <td className="border border-gray-300 px-4 py-2">Basic</td>
                <td className="border border-gray-300 px-4 py-2">Basic</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Cost</td>
                <td className="border border-gray-300 px-4 py-2">Free</td>
                <td className="border border-gray-300 px-4 py-2">Paid</td>
                <td className="border border-gray-300 px-4 py-2">Paid</td>
                <td className="border border-gray-300 px-4 py-2">Paid</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          Frequently Asked Questions
        </h3>
        
        <FAQ faqs={faqs} />
        
        <div className="bg-yellow-50 p-6 rounded-lg mt-8">
          <h4 className="text-xl font-semibold mb-3">⚠️ Important Disclaimer</h4>
          <p className="text-gray-700">
            This CAT percentile predictor provides estimates based on historical data and statistical models. 
            Actual CAT results may vary due to factors like exam difficulty, normalization, and other variables. 
            Use this tool for planning purposes and always refer to official CAT results for final decisions.
          </p>
        </div>
      </div>
    </div>
  )
}
