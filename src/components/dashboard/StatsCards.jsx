import React from 'react';
import {
  Box,
  Flex,
  Text,
  Icon,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  useColorModeValue
} from '@chakra-ui/react';
import { FiDollarSign, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

const StatCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'neutral', // 'increase', 'decrease', 'neutral'
  icon = FiDollarSign,
  colorScheme = 'blue'
}) => {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const iconBg = useColorModeValue(`${colorScheme}.50`, `${colorScheme}.900`);
  const iconColor = useColorModeValue(`${colorScheme}.500`, `${colorScheme}.200`);

  return (
    <Box
      bg={bg}
      p={6}
      rounded="lg"
      shadow="sm"
      border="1px"
      borderColor={borderColor}
      _hover={{ shadow: 'md' }}
      transition="all 0.2s"
    >
      <Flex align="center" justify="space-between">
        <Stat>
          <StatLabel color="gray.500" fontSize="sm" fontWeight="medium">
            {title}
          </StatLabel>
          <StatNumber fontSize="2xl" fontWeight="bold" mb={2}>
            {value}
          </StatNumber>
          {change && (
            <StatHelpText mb={0}>
              <StatArrow type={changeType} />
              {change}
            </StatHelpText>
          )}
        </Stat>
        <Box
          p={3}
          rounded="lg"
          bg={iconBg}
        >
          <Icon
            as={icon}
            w={6}
            h={6}
            color={iconColor}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default StatCard;