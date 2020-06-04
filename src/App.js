import React, { useState } from "react";
import "./App.css";
import data from "./data.json";

function App() {
  const [selectedItems, setSelectedItems] = useState([]);

  const addToSelected = (selectedWord) => {
    if (!selectedItems.includes(selectedWord)) {
      setSelectedItems([...selectedItems, selectedWord]);
    }
  };

  const removeFromSelected = (selectedWord) => {
    setSelectedItems(
      [...selectedItems].filter((string) => string !== selectedWord)
    );
  };

  const jobsToShow = data.filter((job) =>
    selectedItems.every(
      (item) =>
        Object.values(job).includes(item) ||
        job.languages.includes(item) ||
        job.tools.includes(item)
    )
  );

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
        {selectedItems.length > 0 ? (
          <p
            className="clear"
            onClick={() => {
              setSelectedItems([]);
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
                <span className="company-name">{jobObj.company} </span>
                {jobObj.new ? <span className="new">NEW!</span> : null}
                {jobObj.featured ? (
                  <span className="featured">FEATURED</span>
                ) : null}
              </div>
              <div
                className="position"
                onClick={() =>
                  setSelectedItems(
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

              {jobObj.tools.map((tool, index) => (
                <button
                  key={index}
                  onClick={() => {
                    addToSelected(tool);
                  }}
                >
                  {tool}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
