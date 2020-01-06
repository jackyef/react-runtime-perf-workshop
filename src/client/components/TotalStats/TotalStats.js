import React, { useContext, useMemo } from 'react';
import {
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  IconButton,
} from '@chakra-ui/core';
import { PackageSumContext } from '../Layout/PackageSumProvider';

const TotalStats = () => {
  const { totalSize, drawerDisclosure, packages } = useContext(
    PackageSumContext,
  );

  const packagesCount = packages.length;
  const onOpen = drawerDisclosure.open;

  const prettifiedSize = useMemo(() => {
    return `${totalSize / 1024}`
      .split('.')
      .map((v, i) => (i === 0 ? v : v.substring(0, 2)))
      .join('.');
  }, [totalSize]);

  return (
    <Stat
      as={Flex}
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      role="button"
      onClick={onOpen}
    >
      <StatLabel fontSize="lg" as={Flex} alignItems="center">
        Total ({packagesCount}){' '}
        <IconButton
          icon="edit"
          variant="ghost"
          size="sm"
          aria-label="See details"
        />
      </StatLabel>
      <StatNumber fontSize="5xl">{prettifiedSize} kB</StatNumber>
    </Stat>
  );
};

export default TotalStats;
