import React from "react";
import Link from "next/link";

const Home = () => {
  return (
    <>
      <div className="feature-image">
        <img
          className="profile-pic"
          src="/images/InfrontCongress.jpeg"
          alt="Tenzin Passang."
          width={300}
        />
        <p>
          Welcome to Passang Holdings. I will share my investment portfolio
          here. Additionally, I will write monthly
          <Link className="links" href="/publications">
            {" "}
            publications{" "}
          </Link>
          sharing my thoughts on the financial markets. Investment transactions
          will be updated quarterly. However, I don't expect any significant
          changes in capital allocation, as most of the investments are held for
          more than five years. Also, I would love to hear from you. Please use
          the contact info on the About page to send emails.
        </p>
      </div>
      <div className="sponsors">
        <h1>
          Please consider donating to Zamar Sponsors and click on the image
          below to learn more.
        </h1>
        <a href="https://zamarsponsors.org/" target="_blank">
          <img src="/images/zamar.webp" />
        </a>
      </div>
    </>
  );
};

export default Home;
