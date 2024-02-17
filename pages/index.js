import React from "react";
import Image from "next/image";

const Home = () => {
  return (
    <div>
      <main>
        <section id="feature-image">
          <Image
            className="profile-pic"
            src="/images/InfrontCongress.jpeg"
            alt=""
            width={300}
            height={300}
          />
          <p>
            {" "}
            Welcome to Passang Holdings. I will post my investment portofolio
            here. Additionally I will write monthly{" "}
            <a href="publication.html">publication</a>
            about my thoughts on the financail markets. Investment transactions
            will be updated qaurterly. However, I don't expect any radical
            capital allocation since most of the investments are held for more
            than five years.Also, I would love to hear from you, please find the
            contact tab to send emails.
          </p>
        </section>
      </main>
    </div>
  );
};

export default Home;
