const Footer = () => (
  <footer className="flex justify-center bg-[#111714]">
    <div className="flex max-w-[960px] flex-1 flex-col">
      <footer className="flex flex-col gap-6 px-5 py-10 text-center @container">
        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
          <a className="text-[#9eb7a8] text-base font-normal min-w-40" href="#">About</a>
          <a className="text-[#9eb7a8] text-base font-normal min-w-40" href="#">Contact</a>
          <a className="text-[#9eb7a8] text-base font-normal min-w-40" href="#">Terms of Service</a>
          <a className="text-[#9eb7a8] text-base font-normal min-w-40" href="#">Privacy Policy</a>
        </div>

       
        {/* Copyright */}
        <p className="text-[#9eb7a8] text-base font-normal">
          © {new Date().getFullYear()} Inkspire. All rights reserved.
        </p>
      </footer>
    </div>
  </footer>
);

export default Footer;
