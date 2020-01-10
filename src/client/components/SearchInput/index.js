import React, { useState, useContext } from 'react';
import { useData } from 'react-isomorphic-data';
import {
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
} from '@chakra-ui/core';

import { PackageSumContext } from '../Layout/PackageSumProvider';
import SearchResults from './SearchResults';

const doSomeHeavyStuffs = () => {
  // eslint-disable-next-line
  let a = 0;

  // Loop 100M time! comment this out for now
  // for (let i = 0; i < 100000000; i++) {
  //   a++;
  // }

  return Math.random() * 100;
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

  const handleChangeSearch = e => {
    doSomeHeavyStuffs();

    setSearchText(e.target.value)
  }

  return (
    <div>
      <InputGroup>
        <Input
          type="text"
          onChange={handleChangeSearch}
          aria-label="Search for packages on npm"
          placeholder="Search for packages on npm..."
        />
        <InputRightElement>{loading ? <Spinner /> : null}</InputRightElement>
      </InputGroup>
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
