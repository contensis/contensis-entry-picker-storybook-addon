import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

// Hooks
import { useGetEntryByEntryId } from '../../hooks/useGetEntryByEntryId';

// Component
import { Example } from '../';

// Props
import { Props } from './Example.d';

export default {  
  title: 'Example/Components/Example',  
  component: Example,  
} as ComponentMeta<typeof Example>;

export const Template: ComponentStory<typeof Example> = (
  args: Props,
  { globals: { entryId } }
) => {
  const entry = useGetEntryByEntryId(entryId);
  return <Example {...{ ...args, ...entry }} />;
};

Template.args = {
  contentTypes: ['blogPost'], // Add your content types here, must be in an array.
  entryTitle: 'Lorem ipsum dolor sit amet',
  entryDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  thumbnailImage: {
    altText: 'Leif',
    asset: {
      sys: {
        uri: '/image-library/default-images/leif-fallback.png'
      }
    }
  },
}