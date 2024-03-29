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

import { COLOR } from '../../../constants/styles/colors.js';

export const GitaTextContainer = styled.div`
  font-size: 40px;
  color: ${COLOR.black};
  cursor: pointer;
  height: 100%;
  width: 80px;
  left: 0;
  text-align: center;
  position: relative;
`;
