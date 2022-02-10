import React from 'react';

// Layout
import './Example.css';

// Models
import { Props } from './Example.d';

export const Example = ({
  entryTitle,
  entryDescription,
  category,
  thumbnailImage,
  primaryImage,
}: Props) => {
  if (!entryTitle) return null;

  const imageUri = primaryImage ? primaryImage?.asset?.sys?.uri : thumbnailImage?.asset?.sys?.uri
  const imageAlt = primaryImage ? primaryImage?.altText : thumbnailImage?.altText

  return (
    <a className="container" href="#">
      <h1 className="title">{entryTitle}</h1>
      {imageUri && (
        <img
          className="image"
          src={`https://live-leif-zenhub.cloud.contensis.com${imageUri}`}
          alt={imageAlt}
        />
      )}
      {entryDescription && (
        <p className="summary">{entryDescription.substring(0, 109)}...</p>
      )}
      {category && <span className="category">{category.name}</span>}
    </a>
  );
};

