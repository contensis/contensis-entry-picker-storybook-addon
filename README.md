# Contensis entry picker - Storybook addon

Built with [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), [Storybook](https://storybook.js.org/), [Babel](https://babeljs.io/) and our [Contensis Delivery API](https://www.npmjs.com/package/contensis-delivery-api)

Our Contensis entry picker for Storybook allows you to see your custom Storybook components working with **real data** coming from entries within your CMS.

## Install

You can add the Contensis entry picker addon to you project with:

`npm install --save-dev contensis-entry-picker-storybook-addon`

Or:

`yarn add contensis-entry-picker-storybook-addon -D`

Then add the following line into your `.storybook/main.js` file:  

``` javascript
module.exports  =  {
 addons: [
 'contensis-entry-picker-storybook-addon',
],
```

## Configuration

### .ENV

Make sure your `.env` is set up so our custom hook used to get the entries knows where to get these from. Your `.env` file should have the following properties: `ACCESS_TOKEN`, `PUBLIC_URL`, and `PROJECT`.

Within your Storybook component we will need to grab a `entryId` from the  `global` variable - to find out more about global variables, go [here](https://storybook.js.org/docs/react/essentials/toolbars-and-globals).

``` javascript
export  const  Template:  ComponentStory<typeof Example>  = (
args:  Props, 
{ globals:  {  entryId  }  }
) =>  {...};
```

Once we have this, we can use a custom hook to get the entry from this `entryId`. We can do this like so:

It's important to spread the object so that the component can consume all the props.
**Remember to import `useGetEntryByEntryId` from the `contensis-entry-picker-storybook-addon`**

``` javascript
import  { useGetEntryByEntryId }  from  'contensis-entry-picker-storybook-addon';

export  const  Template:  ComponentStory<typeof Example>  = (
args:  Props,
{ globals:  {  entryId  }  }
) =>  {
const  entry  =  useGetEntryByEntryId(entryId);
return  <Example  {...{  ...args,  ...entry }}  />;
};
```

Great, your Storybook component is almost there, we can now use the `Template.args` to specify what `entries` we'd like to bring back. We do this with the `contentTypes` arg.

**Important that the `contentTypes` arg is an array of strings**

``` javascript
Template.args =  {
 contentTypes: ['blogPost', 'pot', 'plant'],
}
```

Now we are all set up, we can now go ahead and run storybook with `yarn storybook`. When this opens in the browser go over to the `Contensis entry picker` tab. Here you will see a drop down with entries to choose from. Clicking one of these will allow your component to consume its data. 🎉
