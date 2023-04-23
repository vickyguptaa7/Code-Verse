import SourceControl from "./SourceControl.component";

const SourceControlContainer = () => {
  return (
    <div className="flex flex-col justify-start h-full py-2 text-sm whitespace-nowrap text-[color:var(--highlight-text-color)]">
      <div className="pl-5 mt-1.5 mb-2">
        <h2>SOURCE CONTROL</h2>
      </div>
      <div className="flex flex-col h-full">
        <SourceControl />
      </div>
    </div>
  );
};

export default SourceControlContainer;
