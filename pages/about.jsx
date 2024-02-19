import { ComingSoon } from "@/Components";
import React from "react";

const about = () => {
  return (
    <>
      <div className="template centered">
        <h1>Contact:</h1>
        <p>
          Email:
          <a href="mailto:tenzinpassang001@outlook.com">
            tenzinpassang001@outlook.com
          </a>
        </p>
        <p>
          LinkedIn:
          <a
            href="https://www.linkedin.com/in/tenzinpassang2001/"
            target="_blank"
          >
            tenzinpassang2001
          </a>
        </p>
      </div>
      <div className="template legal">
        <p>
          <a href="https://passangholdings.com/disclaimer.pdf" target="_blank">
            Legal disclaimer
          </a>
        </p>
      </div>
    </>
  );
};

export default about;
