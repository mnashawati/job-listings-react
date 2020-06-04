import React, { useState } from "react";
import "./App.css";
import allJobs from "./data.json";

function App() {
  const [selectedFilteringWords, setSelectedFilteringWords] = useState([]);

  const addToSelected = (selectedWord) => {
    if (!selectedFilteringWords.includes(selectedWord)) {
      setSelectedFilteringWords([...selectedFilteringWords, selectedWord]);
    }
  };

  const removeFromSelected = (selectedWord) => {
    setSelectedFilteringWords(
      [...selectedFilteringWords].filter((string) => string !== selectedWord)
    );
  };

  const jobsToShow = allJobs.filter((job) =>
    selectedFilteringWords.every(
      (item) =>
        Object.values(job).includes(item) ||
        job.languages.includes(item) ||
        job.tools.includes(item)
    )
  );

  const ClickableFilteringWord = ({ field }) => {
    return (
      <button
        onClick={() => {
          addToSelected(field);
        }}
      >
        {field}
      </button>
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
        {selectedFilteringWords.map((item) => (
          <div key={item} className="selected-btn-with-x">
            <button className="selected-word">{item}</button>
            <button
              className="x-button"
              onClick={() => {
                removeFromSelected(item);
              }}
            >
              X
            </button>
          </div>
        ))}
        {selectedFilteringWords.length > 0 ? (
          <p
            className="clear"
            onClick={() => {
              setSelectedFilteringWords([]);
            }}
          >
            Clear
          </p>
        ) : null}
      </div>
      <div className="job-cards-container">
        {jobsToShow.map((jobObj) => (
          <div
            key={jobObj.id}
            className={jobObj.featured ? "job-card featured-jobs" : "job-card"}
          >
            <div className="company-logo">
              <img src={jobObj.logo} alt={jobObj.company + " logo"} />
            </div>
            <div className="job-details">
              <div className="title">
                <div className="company-name">{jobObj.company} </div>
                {jobObj.new ? <div className="new">NEW!</div> : null}
                {jobObj.featured ? (
                  <div className="featured">FEATURED</div>
                ) : null}
              </div>
              <div
                className="position"
                onClick={() =>
                  setSelectedFilteringWords(
                    [jobObj.role, jobObj.level]
                      .concat(jobObj.languages)
                      .concat(jobObj.tools)
                      .concat([jobObj.position])
                  )
                }
              >
                <p>{jobObj.position}</p>
              </div>
              <div className="small-details">
                <span className="posted-at">{jobObj.postedAt} </span>•
                <span className="contract"> {jobObj.contract} </span>•
                <span className="location"> {jobObj.location}</span>
              </div>
            </div>
            <div className="btns">
              <ClickableFilteringWord field={jobObj.role} />
              <ClickableFilteringWord field={jobObj.level} />
              {jobObj.languages.map((language, index) => (
                <ClickableFilteringWord key={index} field={language} />
              ))}
              {jobObj.tools.map((tool, index) => (
                <ClickableFilteringWord key={index} field={tool} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
