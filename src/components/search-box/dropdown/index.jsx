// Copyright 2023 The Gita Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React from 'react';

import LOGGER from '../../../lib/logger/logger.js';

import { getFileName } from '../../../lib/utils/fs.js';

import { StyledDropdown } from './styles/styles.jsx';

function Dropdown({
  onClick,
  matchedRecords = [],
  dropdownBorderColor,
  dropdownHoverColor,
  debug = false,
}) {
  const context = {
    onClick,
    matchedRecords,
    dropdownBorderColor,
    dropdownHoverColor,
  };
  const logger = new LOGGER(
    Dropdown.name,
    getFileName(import.meta.url),
    debug === true ? LOGGER.DEBUG : LOGGER.OFF
  );
  logger.debug(null, context);

  return (
    <StyledDropdown
      dropdownHoverColor={dropdownHoverColor}
      dropdownBorderColor={dropdownBorderColor}
    >
      <ul>
        {matchedRecords.map((record) => {
          return (
            <li
              key={record.item.key}
              tabIndex={0}
              onKeyDown={(e) => {
                if (['Space', 'Enter'].includes(e.code)) {
                  onClick(record);
                }
              }}
              onClick={() => onClick(record)}
            >
              {record.item.value}
            </li>
          );
        })}
      </ul>
    </StyledDropdown>
  );
}

export default Dropdown;
