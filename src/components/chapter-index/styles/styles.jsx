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

import styled from 'styled-components';

import { BACKGROUND } from '../../../constants/styles/colors.js';

export const ChapterIndexContainer = styled.div`
  width: 100%;
  max-width: 250px;
  height: 100%;
  position: fixed;
  background-color: ${BACKGROUND.white};
`;

export const ChapterIndexFilterContainer = styled.div`
  padding: 12px;
`;

export const ChaptersContainer = styled.ul``;
