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

        {/* Social Icons */}
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#">
            <div className="text-[#9eb7a8]">
              {/* Twitter Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                <path d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.31,47.79,9.57,79.77,22,98.18a110.93,110.93,0,0,0,21.88,24.2c-15.23,17.53-39.21,26.74-39.47,26.84a8,8,0,0,0-3.85,11.93c.75,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.67,0,129.72-54.42,135.75-124.44l29.91-29.9A8,8,0,0,0,247.39,68.94Z"></path>
              </svg>
            </div>
          </a>
          <a href="#">
            <div className="text-[#9eb7a8]">
              {/* Instagram Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Z"></path>
              </svg>
            </div>
          </a>
          <a href="#">
            <div className="text-[#9eb7a8]">
              {/* Facebook Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Z"></path>
              </svg>
            </div>
          </a>
        </div>

        {/* Copyright */}
        <p className="text-[#9eb7a8] text-base font-normal">
          © {new Date().getFullYear()} Blogify. All rights reserved.
        </p>
      </footer>
    </div>
  </footer>
);

export default Footer;
