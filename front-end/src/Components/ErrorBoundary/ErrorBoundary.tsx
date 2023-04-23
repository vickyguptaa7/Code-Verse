import { FallbackProps } from "react-error-boundary";
import Button from "../UI/Button.component";

export const ErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <div role="alert">
      <p>Something went wrong;</p>
      <pre>{error.message}</pre>
      <Button onClick={resetErrorBoundary} className="">
        Try again
      </Button>
    </div>
  );
};
