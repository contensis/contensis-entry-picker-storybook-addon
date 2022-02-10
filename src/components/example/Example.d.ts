interface CategoryProps { 
  name: string;
}

interface ImageProps {
  altText: string;
  asset: {
    sys: {
      uri: string;
    }
  }
}

export interface Props {
  readonly contentTypes: string[];
  entryTitle: string;
  entryDescription: string;
  category?: CategoryProps;
  thumbnailImage?: ImageProps;
  primaryImage?: ImageProps;
  uri: string;
}