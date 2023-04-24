import { useRef } from "react";
import { VscChevronRight } from "react-icons/vsc";
import { useAppSelector } from "../../../../Store/store";
import useInputFocus from "../../../../hooks/useInputFocus.hook";
import Input from "../../../UI/Input.component";

const Debug = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const debugContent = useAppSelector(
    (state) => state.bottomPannel.debugContent
  );

  useInputFocus(inputRef);

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <div className="text-sm text-[color:var(--primary-text-color)]">
        <p>{debugContent}</p>
      </div>
      <div className="flex items-center justify-center w-full gap-2">
        <VscChevronRight />
        <Input
          inputRef={inputRef}
          type="text"
          name="debug"
          className="w-full font-cascadia"
          placeholder="Please start a debug session to evaluate expressions"
        />
      </div>
    </div>
  );
};

export default Debug;
