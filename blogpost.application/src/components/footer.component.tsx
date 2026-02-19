import { format } from "date-fns";

const Footer = () => {
  return (
    <footer className="w-full min-h-14 flex items-center border border-gray-200 shadow-sm">
      <div className="w-full px-3 max-w-7xl mx-auto flex items-center justify-center">
        <span className="text-sm text-gray-500">
          © All rights reserved, {format(Date.now(), "yyy")}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
