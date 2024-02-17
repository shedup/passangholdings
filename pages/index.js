import React from "react";
import Link from "next/link";

const Home = () => {
  return (
    <div>
      <main>
        <section id="feature-image">
          <img
            className="profile-pic"
            src="/images/InfrontCongress.jpeg"
            alt="picture of a passang in front of the capital"
            width={300}
          />
          <p>
            Welcome to Passang Holdings. I will post my investment portofolio
            here. Additionally I will write monthly
            <Link className="links" href="/publications">
              {" "}
              publications{" "}
            </Link>
            about my thoughts on the financail markets. Investment transactions
            will be updated quarterly. However, I don't expect any radical
            capital allocation since most of the investments are held for more
            than five years. Also, I would love to hear from you, please find
            the contact tab to send emails.
          </p>
        </section>
      </main>
    </div>
  );
};

export default Home;
