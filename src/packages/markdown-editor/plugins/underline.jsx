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

import React, { useEffect } from 'react';

import { i18n } from '../i18n/index.js';
import { Icon } from '../components/index.jsx';

Underline.pluginName = 'font-underline';
Underline.align = 'left';

function Underline({ ...props }) {
  const { editor, editorConfigs } = props;

  const handleKeyboard = {
    key: 'u',
    keyCode: 85,
    aliasCommand: true,
    withKey: ['ctrlKey'],
    callback: () => this.editor.insertMarkdown('underline'),
  };

  useEffect(() => {
    if (editorConfigs.shortcuts) editor.onKeyboard(handleKeyboard);
    return () => editor.offKeyboard(handleKeyboard);
  }, []);

  return (
    <span
      className="button"
      title={i18n.get('btnUnderline')}
      onClick={() => editor.insertMarkdown('underline')}
    >
      <Icon type="underline" />
    </span>
  );
}

export default Underline;
