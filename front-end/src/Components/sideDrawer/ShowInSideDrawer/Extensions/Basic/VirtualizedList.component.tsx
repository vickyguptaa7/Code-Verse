import React, { useEffect, useState } from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { useAppSelector } from "../../../../../Store/store";
import ExtensionCard from "./ExtensionCard.component";

const EXTENSIONS_CARD_HEIGHT = 88;

const VirtualizedList = () => {
  const extensionList = useAppSelector(
    (state) => state.extension.extensionsList
  );
  const extensionSearchedText = useAppSelector(
    (state) => state.extension.extensionSearchedText
  );
  const [extensions, setExtensions] = useState(extensionList);
  useEffect(() => {
    setExtensions(
      extensionList.filter(
        (ext) =>
          ext.extensionName
            .toLowerCase()
            .includes(extensionSearchedText.toLowerCase()) ||
          ext.description.toLowerCase().includes(extensionSearchedText) ||
          ext.publisher.toLowerCase().includes(extensionSearchedText)
      )
    );
  }, [extensionSearchedText]);
  const Row = ({ index, style }: { index: any; style: any }) => (
    <div style={style}>
      <ExtensionCard info={extensions[index]} isInstalled={false} />
    </div>
  );
  return extensions.length !== 0 ? (
    <AutoSizer>
      {({ height, width }) => (
        <List
          className="List"
          height={height}
          itemCount={extensions.length}
          itemSize={EXTENSIONS_CARD_HEIGHT}
          width={width}
        >
          {Row}
        </List>
      )}
    </AutoSizer>
  ) : (
    <h3 className="flex items-center pl-5">No extensions found.</h3>
  );
};

export default VirtualizedList;
