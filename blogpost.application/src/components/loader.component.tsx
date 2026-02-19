import { Spinner } from "./ui/spinner";

const Loader = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Spinner className="w-10 h-10" />
    </div>
  );
};

export default Loader;
