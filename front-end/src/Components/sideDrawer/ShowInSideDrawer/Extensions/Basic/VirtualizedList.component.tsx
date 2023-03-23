import React from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { useAppSelector } from "../../../../../Store/store";
import ExtensionCard from "./ExtensionCard.component";

const EXTENSIONS_CARD_HEIGHT=88;

const VirtualizedList = () => {
  const extensionList = useAppSelector(
    (state) => state.extension.extensionsList
  );
  const Row = ({ index, style }: { index: any; style: any }) => (
    <div style={style}>
      <ExtensionCard info={extensionList[index]} isInstalled={false} />
    </div>
  );
  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          className="List"
          height={height}
          itemCount={extensionList.length}
          itemSize={EXTENSIONS_CARD_HEIGHT}
          width={width}
        >
          {Row}
        </List>
      )}
    </AutoSizer>
  );
};

export default VirtualizedList;
