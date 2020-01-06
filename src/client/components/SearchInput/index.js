import React, { useState, useContext } from 'react';
import { useData, createDataClient, DataProvider } from 'react-isomorphic-data';
import {
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  Spinner,
} from '@chakra-ui/core';

import getWorker from './heavyCalculation';
import { PackageSumContext } from '../Layout/PackageSumProvider';
import SearchResults from './SearchResults';

let worker = null;

const doHeavyCalculation = async () => {
  if (!worker) {
    worker = await getWorker();
  }

  return worker.doHeavyCalculation();
}

const SearchInput = () => {
  const [searchText, setSearchText] = useState('');
  const { data, error, loading, refetch } = useData(
    'https://api.npms.io/v2/search/suggestions',
    {
      q: searchText,
      size: 10,
    },
    undefined,
    {
      skip: !searchText,
    },
  );

  const packageSum = useContext(PackageSumContext);
  
  const handleChange = async (e) => {
    setSearchText('loading...');

    const newSearchText = await doHeavyCalculation();
    
    console.log(newSearchText);
    setSearchText(newSearchText);
  }

  return (
    <div>
      <InputGroup>
        <Input
          type="text"
          onChange={handleChange}
          aria-label="Search for packages on npm"
          placeholder="Search for packages on npm..."
        />
        <InputRightElement>{loading ? <Spinner /> : null}</InputRightElement>
      </InputGroup>
      <span>{searchText}</span>
      <SearchResults
        data={data}
        loading={loading}
        error={error}
        searchText={searchText}
        packages={packageSum.packages}
        onAdd={packageSum.add}
        refetch={refetch}
      />
    </div>
  );
};

export default React.memo(SearchInput);
