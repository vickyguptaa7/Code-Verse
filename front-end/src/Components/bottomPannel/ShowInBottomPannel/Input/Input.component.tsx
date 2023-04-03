import React, { useCallback, useEffect, useRef } from "react";
import { setInputContent } from "../../../../Store/reducres/BottomPannel/BottomPannel.reducer";
import { useAppDispatch, useAppSelector } from "../../../../Store/store";
import TextArea from "../../../UI/TextArea.component";

interface PROPS_INTEFACE {
  mainDivHeight: number;
}

const Input: React.FC<PROPS_INTEFACE> = ({ mainDivHeight }) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const inputContent = useAppSelector(
    (state) => state.bottomPannel.inputContent
  );

  const dispatch = useAppDispatch();

  const setFocusHandler = useCallback(() => {
    const lenght = inputContent.length;
    // place the cursor at the end of the input content
    // first argument is for the start selection and the other is for the end selection range
    inputRef.current?.setSelectionRange(lenght, lenght);
    inputRef.current?.focus();
  }, [inputRef, inputContent]);

  useEffect(() => {
    setFocusHandler();
  }, [setFocusHandler]);

  const onChangeHandler = (event: React.FormEvent<HTMLTextAreaElement>) => {
    //TODO: Reduce the number of dispatch call by debounce
    dispatch(setInputContent(event.currentTarget.value));
  };

  return (
    <div className="">
      <TextArea
        inputRef={inputRef}
        name="input"
        onChange={onChangeHandler}
        value={inputContent}
        className="w-full outline-none resize-none bg-inherit font-cascadia"
        // here 18px subtracted as the parent div have margins and padding so to remove scrolling
        style={{ height: mainDivHeight - 18 }}
      />
    </div>
  );
};

export default Input;
