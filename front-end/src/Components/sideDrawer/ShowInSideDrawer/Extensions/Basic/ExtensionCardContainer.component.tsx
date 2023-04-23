import { useEffect, useState } from "react";
import { useAppSelector } from "../../../../../Store/store";
import VirtualList from "../../../../../library/reactWindow/virtualList.lib";
import ExtensionCard from "./ExtensionCard.component";

const EXTENSIONS_CARD_HEIGHT = 88;

const ExtensionCardContainer = () => {
  const extensionList = useAppSelector(
    (state) => state.extension.extensionsList
  );
  const extensionSearchedText = useAppSelector(
    (state) => state.extension.extensionSearchedText
  );
  // get the list of extensions from the store
  const [extensions, setExtensions] = useState(extensionList);

  // filter the list of extensions based on the search text and update the when the search text changes
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

  // map the filtered  extensions to extension card component
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
