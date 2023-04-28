import React from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";

interface IPROPS {
  itemCount: number;
  itemSize: number;
  list: Array<React.ReactNode>;
}

const VirtualList: React.FC<IPROPS> = ({ itemCount, itemSize, list }) => {
  const results = ({ index, style }: { index: any; style: any }) => (
    <div style={style}>{list[index]}</div>
  );
  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          className="List"
          height={height ? height : 30}
          itemCount={itemCount}
          itemSize={itemSize}
          width={width ? width : 50}
        >
          {results}
        </List>
      )}
    </AutoSizer>
  );
};

export default VirtualList;
