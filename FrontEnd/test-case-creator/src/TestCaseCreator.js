import React, { useState } from 'react';
import './TestCaseCreator.css';
import { handleserver } from './service'; // Make sure this path is correct
 
function TestCaseCreator() {
    // State variables
    const [codeInput, setCodeInput] = useState('');
    const [totalTestCases, setTotalTestCases] = useState('');
    const [positiveTestCases, setPositiveTestCases] = useState('');
    const [negativeTestCases, setNegativeTestCases] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [scenario, setScenario] = useState('');
    const [associationProcess, setAssociationProcess] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false); // New state for popup visibility
    const [result, setResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);
 
    // Handlers for updating state
    const handleTotalTestCasesChange = (e) => setTotalTestCases(e.target.value);
    const handlePositiveTestCasesChange = (e) => setPositiveTestCases(e.target.value);
    const handleNegativeTestCasesChange = (e) => setNegativeTestCases(e.target.value);
    const handleLanguageChange = (e) => setSelectedLanguage(e.target.value);
    const handleScenarioChange = (e) => setScenario(e.target.value);
    const handleAssociationProcessChange = (e) => setAssociationProcess(e.target.value);
    const handleClosePopup = () => setIsPopupOpen(false); // Close popup function
 
    const handleGoClick = async () => {
        if (codeInput !== '' && totalTestCases !== '' && positiveTestCases !== '' && negativeTestCases !== '') {
            setIsLoading(true);
            setResult('');
            const prompt = `generate ${totalTestCases} unit test cases automation code of ${positiveTestCases} positive and ${negativeTestCases} negative test cases in ${selectedLanguage} for the code ${codeInput} and ${associationProcess}`;
            try {
                const responseData = await handleserver(prompt);
                if (responseData && responseData.data_from_model) {
                    setResult(responseData.data_from_model);
                    setIsPopupOpen(true);
                } else {
                    console.error('Unexpected response format:', responseData);
                    setResult('Unexpected response format from server');
                }
            } catch (error) {
                console.error('Failed to fetch result from server:', error);
                setResult('Error retrieving data from server');
            }
            finally {
                setIsLoading(false);
            }
        }
 
    };
    const handleCopy = () => {
        navigator.clipboard.writeText(result);
 
        setIsPopupOpen(false)
        setCodeInput('')
        setSelectedLanguage('')
        setTotalTestCases('')
        setPositiveTestCases('')
        setNegativeTestCases('')
        setScenario('')
        setAssociationProcess('')
    }
 
    return (
        <div className="container">
            <h2 className="title">Test–Case Creator</h2>
            <label className="label">Enter Your Code Here:</label>
            <textarea
                className="text-area"
                placeholder="Type here..."
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
            ></textarea>
 
            <div className="main-section">
                {/* Test Cases Section */}
                <div className="test-cases">
                    <h3 className="section-title">Test Cases</h3>
                    <div className="input-group">
                        <label>Total Test Cases:</label>
                        <input
                            type="number"
                            value={totalTestCases}
                            onChange={handleTotalTestCasesChange}
                            placeholder="0"
                            className="input-field"
                        />
                    </div>
                    <div className="input-group">
                        <label>Positive Test Cases:</label>
                        <input
                            type="number"
                            value={positiveTestCases}
                            onChange={handlePositiveTestCasesChange}
                            placeholder="0"
                            className="input-field"
                        />
                    </div>
                    <div className="input-group">
                        <label>Negative Test Cases:</label>
                        <input
                            type="number"
                            value={negativeTestCases}
                            onChange={handleNegativeTestCasesChange}
                            placeholder="0"
                            className="input-field"
                        />
                    </div>
                </div>
 
                {/* Language Selection Section */}
                <div className="language-selection">
                    <h3 className="section-title">Choose a Language</h3>
                    <select
                        className="dropdown"
                        value={selectedLanguage}
                        onChange={handleLanguageChange}
                    >
                        <option value="">Select a Language</option>
                        <option value="Java">Java</option>
                        <option value="Python">Python</option>
                        <option value="C#">C#</option>
                    </select>
                </div>
            </div> <br></br><br></br>
            {/* Scenario Section */}
            <label className="label">Type Scenario (Optional):</label>
            <textarea
                className="text-area"
                placeholder="Type here..."
                value={scenario}
                onChange={handleScenarioChange}
            ></textarea><br></br>
 
            {/* Association Process Section */}
            <label className="label">Type Any Association Process (Optional):</label>
            <textarea
                className="text-area"
                placeholder="Type here..."
                value={associationProcess}
                onChange={handleAssociationProcessChange}
            ></textarea>
 
            {/* Go Button */}
            <button className="go-button" onClick={handleGoClick}>Go</button>
            <br /><br />
 
            {/* Popup Modal */}
            {isPopupOpen && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h3>Generated Test Case:</h3>
                        <textarea className="text-area-result">{result}</textarea>
                        <br />
                        <button className="close-button" onClick={handleClosePopup}>Close</button> &nbsp;
                        <button className="copy-button" onClick={handleCopy}>Copy</button>
                    </div>
                </div>
            )}
            {isLoading && (
                <div className="loader-wrapper">
                    <span className="loader"></span>
                </div>
            )}
        </div>
    );
}
 
export default TestCaseCreator;