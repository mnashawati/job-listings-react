import React, { useState } from "react";
import "./App.css";
import data from "./data.json";

function App() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentData, setCurrentData] = useState([...data]);

  const addToSelected = (buttonValue) => {
    if (!selectedItems.includes(buttonValue)) {
      setSelectedItems([...selectedItems, buttonValue]);
    }
    setCurrentData(
      currentData.filter(
        (obj) =>
          Object.values(obj).includes(buttonValue) ||
          obj.languages.includes(buttonValue)
      )
    );
  };

  return (
    <div className="App">
      <header>
        <img
          className="header-img"
          src="./images/bg-header-desktop.svg"
          alt="header"
          width="100%"
        />
      </header>
      <div className="input-box">
        {selectedItems.map((item) => (
          <button>{item}</button>
        ))}
      </div>

      {currentData.map((jobObj) => (
        <div
          key={jobObj.id}
          className={jobObj.featured ? "job-card featured-jobs" : "job-card"}
        >
          <div className="company-logo">
            <img src={jobObj.logo} alt={jobObj.company + " logo"} />
          </div>
          <div className="job-details">
            <div className="title">
              <span className="company-name">{jobObj.company} </span>
              {jobObj.new ? <span className="new">NEW!</span> : null}
              {jobObj.featured ? (
                <span className="featured">FEATURED</span>
              ) : null}
            </div>
            <div className="position">
              <p>{jobObj.position}</p>
            </div>
            <div className="small-details">
              <span className="posted-at">{jobObj.postedAt} </span>•
              <span className="contract"> {jobObj.contract} </span>•
              <span className="location"> {jobObj.location}</span>
            </div>
          </div>
          <div className="languages">
            <button
              onClick={() => {
                addToSelected(jobObj.role);
              }}
            >
              {jobObj.role}
            </button>
            <button
              onClick={() => {
                addToSelected(jobObj.level);
              }}
            >
              {jobObj.level}
            </button>

            {jobObj.languages.map((language, index) => (
              <button
                key={index}
                onClick={() => {
                  addToSelected(language);
                }}
              >
                {language}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
