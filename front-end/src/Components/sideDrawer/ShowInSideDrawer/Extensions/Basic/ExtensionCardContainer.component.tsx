import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../../../Store/store";
import ExtensionCard from "./ExtensionCard.component";
import VirtualList from "../../../../../library/reactWindow/virtualList.lib";

const EXTENSIONS_CARD_HEIGHT = 88;

const ExtensionCardContainer = () => {
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
  }, [extensionSearchedText, extensionList]);

  const list = extensions.map((ext) => {
    return <ExtensionCard info={ext} isInstalled={false} />;
  });
  return extensions.length !== 0 ? (
    <VirtualList
      itemCount={list.length}
      itemSize={EXTENSIONS_CARD_HEIGHT}
      list={list}
    />
  ) : (
    <h3 className="flex items-center pl-5">No extensions found.</h3>
  );
};

export default ExtensionCardContainer;
