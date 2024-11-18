const Footer = () => {
  return (
    <footer
      className={
        "grid grid-rows-1 p-[clamp(0rem,5vw,4rem)] grid-flow-row  bg-primary dark:bg-primary-dark mt-[clamp(4rem,40vh,16rem)] text-typography-light dark:text-typography-dark"
      }
    >
      <div className={"grid grid-cols-4 max-md:grid-rows-2  "}>
        <div
          className={
            "flex flex-col max-md:col-start-2 max-md:mb-8 gap-9 col-start-1"
          }
        >
          <h3 className={"font-medium text-xl"}>Artiflare</h3>
          <div className={"grid gap-2"}>
            <p>artiflare@gmail.com</p>
            <p>+7(913) 731-3243</p>
          </div>
        </div>
        <div
          className={
            "col-start-3 grid grid-cols-2 max-md:row-start-2 max-md:col-start-2 w-max"
          }
        >
          <div className={""}>
            <h4 className={"font-medium text-xl mb-2"}>Company</h4>
            <div className={"grid gap-2"}>
              <p>Pricing</p>
            </div>
          </div>
          <div className={"col-start-2"}>
            <h4 className={"font-medium text-xl mb-2"}>Legal</h4>
            <div className={"grid gap-2"}>
              <p>Terms of service</p>
              <p>Privacy policy</p>
            </div>
          </div>
        </div>
      </div>
      <div className={"row-start-3"}>
        <p>2024 Artiflare</p>
      </div>
    </footer>
  );
};
export default Footer;
