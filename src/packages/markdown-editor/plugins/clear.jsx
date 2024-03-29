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

import { i18n } from '../i18n/index.js';
import { Icon } from '../components/index.jsx';

Clear.pluginName = 'clear';
Clear.align = 'left';

function Clear({ ...props }) {
  const { editorHooks, nodeMdText } = props;

  const resize = () => {
    nodeMdText.current.style.height = '';
    nodeMdText.current.style.height = `${nodeMdText.current.scrollHeight}px`;
  };

  const handleClick = (e) => {
    if (nodeMdText.current.value === '') return;
    if (!window.confirm || typeof window.confirm !== 'function') return;
    const result = window.confirm(i18n.get('clearTip'));
    if (result) editorHooks.setText('');
    resize();
  };

  return (
    <span
      className="button"
      key={props.key}
      title={i18n.get('btnClear')}
      onClick={handleClick}
    >
      <Icon type="delete" />
    </span>
  );
}

export default Clear;
