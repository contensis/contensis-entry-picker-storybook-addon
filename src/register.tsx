import React, { useCallback, useEffect, useState } from 'react';

// Layout
import './css/global.css';

// Icons
import Warning from './assets/warning.svg';
import ChevronDown from './assets/chevron-down.svg';


// Storybook
import { addons, types } from '@storybook/addons';
import { AddonPanel } from '@storybook/components';
import { useGlobals, useArgs } from '@storybook/api';

// Client
import { getEntries } from './client/index';

// Types
import { Entry } from 'contensis-delivery-api/lib/models';

// Constants 
const ADDON_ID = 'contensis-entry-picker';
const PANEL_ID = `${ADDON_ID}/panel`;

// Panel
const EntryPickerPanel = () => {
  const [options, setOptions] = useState<[] | Entry[]>([]); // Addon options
  const [error, setError] = useState<string>(); // Addon Error
  const [, updateGlobals] = useGlobals(); // Use this to set the global entry id
  const [args] = useArgs(); // Get's the args from our story, we use this to get the content types.

  // Update entryId 
  const _setEntryId = useCallback((value) => {
    if (value) updateGlobals({['entryId']: value});
  }, [])

  // Get the Content Types from the Storybook component
  const cts = args?.contentTypes;

  // Get entries - Listing to if the content types change within the args of a storybook component
  useEffect(() => {
    const getOptions = async () => {
      if (cts && cts.length >= 1) {
        setError('');
        // *
        // If you need extra fields back then you can update the second param here, that reads `['entryTitle]`.
        // For example, if you need the date field back, you'd add it like so:
        // getEntries([...cts], ['entryTitle', 'date'], 999);
        // *
        const opts = await getEntries([...cts], ['entryTitle'], 999);
        if (opts && opts.length >= 1) setOptions(opts);
      } else {
        setError("Uh oh! You've not added any content types.");
        setOptions([]);
      }
    }
    getOptions();
  }, [cts]);


  return (
    <div className="entry-picker__container">
      {error && (
        <span className="error">
          <img src={Warning} alt="Warning" />
          {error}
        </span>
      )}
      <div className="form-field">
        <label htmlFor="contensis-entry-picker">Choose an entry:</label>
        <div className="select__container">
          <select
            name="entries"
            id="contensis-entry-picker"
            onChange={(e) => _setEntryId(e.target.value)}
          >
            <option value="">Please choose an entry</option>
            {options &&
              options.length >= 1 &&
              options.map((opt: Entry) => {
                const { entryTitle: label, sys: { id: value = '' } = {} } =
                  opt || {};
                return (
                  <option key={value} value={value}>
                    {label}
                  </option>
                );
              })}
          </select>
          <img className="chevron-down" src={ChevronDown} alt="Chevron down" />
        </div>
      </div>
    </div>
  );
};

addons.register(ADDON_ID, (api) => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Contensis entry picker',
    render: ({ active = false, key }) => (
      <AddonPanel active={active} key={key}>
        <EntryPickerPanel />
      </AddonPanel>
    ),
  });
});