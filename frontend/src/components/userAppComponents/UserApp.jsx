/* eslint-disable no-unused-vars */
import React from "react";
import styles, { layout } from "../../style";
import { Home00 } from "../../pages";

const UserApp = () => {
  return (
    <div className="font-poppins  w-full overflow-hidden">
      <Home00 />
    </div>
  );
};

export default UserApp;

//I am changing the userApp here
// it will have the same interface with as the admin app but the difference will
//functionality .

//.ie. the menu will have 3 items Orders, Menu & Finances

{
  /* <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div> */
}

{
  /* <div className={` ${styles.flexStart} bg-black`}>
        <div className={`${styles.boxWidth}`}>
          <Hero />
        </div>
      </div> */
}

{
  /* <div className={`${styles.paddingX} ${styles.flexStart} bg-black`}>
        <div className={`${styles.boxWidth}`}>
          <Menu />
          <Services />
          <CTA />
          <Footer />
        </div>
      </div> */
}
