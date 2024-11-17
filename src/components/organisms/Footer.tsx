const Footer = () => {
  return (
    <footer
      className={
        "grid grid-rows-2 p-[clamp(2rem,30vw,4rem)] bg-primary dark:bg-primary-dark mt-[clamp(4rem,40vh,16rem)] text-typography-light dark:text-typography-dark"
      }
    >
      <div
        className={
          "grid grid-cols-4  relative after:content['*'] after:w-full after:absolute after:h-px after:bg-bg-dark  after:top-[150%] dark:after:bg-bg-light"
        }
      >
        <div className={"flex flex-col gap-9 col-start-1"}>
          <h3 className={"font-medium text-xl"}>Artiflare</h3>
          <div className={"grid gap-2"}>
            <p>artiflare@gmail.com</p>
            <p>+7(913) 731-3243</p>
          </div>
        </div>
        <div className={"col-start-3 grid grid-cols-2"}>
          <div>
            <h4 className={"font-medium text-xl mb-2"}>Company</h4>
            <div className={"grid gap-2"}>
              <p>Pricing</p>
            </div>
          </div>
          <div>
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
