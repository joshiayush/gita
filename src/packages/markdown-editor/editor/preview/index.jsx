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

import React, { createRef } from 'react';

import { HtmlRendererContainer } from './styles/styles.jsx';

function HtmlRenderer({ html, innerRef }) {
  const htmlRendererEl = createRef();

  return (
    <HtmlRendererContainer ref={innerRef}>
      {typeof html === 'string'
        ? React.createElement('div', {
            ref: htmlRendererEl,
            dangerouslySetInnerHTML: { __html: html },
          })
        : React.createElement('div', { ref: htmlRendererEl }, html)}
    </HtmlRendererContainer>
  );
}

export default HtmlRenderer;
