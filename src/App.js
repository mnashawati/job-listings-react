import React from "react";
import "./App.css";
import data from "./data.json";

function App() {
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
      {data.map((jobObj) => (
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
            <button>{jobObj.role}</button>
            <button>{jobObj.level}</button>
            {jobObj.languages.map((language, index) => (
              <button key={index}>{language}</button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
