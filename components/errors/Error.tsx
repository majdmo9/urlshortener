interface ErrorProps {
  errorMessage: string;
}

const Error: React.FC<ErrorProps> = ({ errorMessage }) => {
  return <div className="text-red-500 text-sm mt-2">{errorMessage}</div>;
};

export default Error;
