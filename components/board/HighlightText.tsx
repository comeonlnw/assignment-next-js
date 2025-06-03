import { Fragment, JSX } from "react";

const HighlightText = (
  text: string,
  searchString: string
): JSX.Element[] | string => {
  if (!searchString) {
    return text;
  }

  const parts: JSX.Element[] = [];
  const lowerText = text.toLowerCase();
  const lowerSearchString = searchString.toLowerCase();
  let lastIndex = 0;

  let match;
  const regex = new RegExp(lowerSearchString, "gi");

  while ((match = regex.exec(lowerText)) !== null) {
    const startIndex = match.index;
    const endIndex = startIndex + searchString.length;

    if (startIndex > lastIndex) {
      parts.push(
        <Fragment key={`text-before-${lastIndex}`}>
          {text.substring(lastIndex, startIndex)}
        </Fragment>
      );
    }

    parts.push(
      <span key={`highlight-${startIndex}`} className="bg-yellow-200 font-bold">
        {" "}
        {text.substring(startIndex, endIndex)}
      </span>
    );

    lastIndex = endIndex;
  }

  if (lastIndex < text.length) {
    parts.push(
      <Fragment key={`text-after-${lastIndex}`}>
        {text.substring(lastIndex)}
      </Fragment>
    );
  }

  return parts.length > 0 ? parts : text;
};

export default HighlightText;
