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

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { v4 as uuid } from 'uuid';

import {
  FirestoreChapterManager,
  FirestoreSupportedTranslationLanguageManager,
} from '../../firebase/firestore-request.js';
import LOGGER from '../../lib/logger/logger.js';

import {
  Navbar,
  SearchBox,
  TextEditor,
  AddTextCell,
  ChapterIndex,
  LanguageSelector,
} from '../../components/index.jsx';

import {
  Container,
  MenuContainer,
  BookContainer,
  ChapterContainer,
  OnThisPageContainer,
  UserActionContainer,
} from './styles/styles.jsx';
import { SignInButton } from '../../components/sign-in-form/styles/styles.jsx';

function SignIn() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/signin');
  };

  return <SignInButton onClick={handleClick}>Sign In</SignInButton>;
}

function UserAction() {
  const [language, setLanguage] = useState('en');
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const languageManager = new FirestoreSupportedTranslationLanguageManager();
    languageManager.getSupportedTranslationLanguages((languages) =>
      setLanguages(languages)
    );
  }, []);

  return (
    <UserActionContainer>
      <SearchBox
        placeholder="Search"
        name="Filter Chapter"
        data={[]}
        fuseConfigs={{}}
        autoFocus={false}
        onSelect={(record) => record}
        inputBackgroundColor="#f1f3f4"
        inputBorderColor="#f1f3f4"
        inputFontSize="16px"
      />
      <LanguageSelector
        language={language}
        setLanguage={setLanguage}
        languages={languages}
      />
      <SignIn />
    </UserActionContainer>
  );
}

function Page({ ...props }) {
  const logger = new LOGGER(
    Page.name,
    props?.debug === true ? LOGGER.DEBUG : LOGGER.OFF
  );

  const { selectedChapterContents, setSelectedChapterContents } = props;

  const isSelectedChapterContentsEmpty =
    selectedChapterContents === null || selectedChapterContents === undefined
      ? true
      : selectedChapterContents?.data.data === null ||
        selectedChapterContents?.data.data === undefined ||
        selectedChapterContents?.data.data === ''
      ? true
      : false;
  const [isEditableTextCellVisible, setIsEditableTextCellVisible] = useState(
    !isSelectedChapterContentsEmpty
  );

  const onCloseTextEditor = () => {
    const isConfirmedDeleteOperation = window.confirm(
      'Confirm delete operation. This operation cannot be recovered.'
    );
    logger.info(
      `Received delete operation confirmation bit "${isConfirmedDeleteOperation}".`
    );

    const chapterManager = new FirestoreChapterManager();

    chapterManager.lockForDocId(selectedChapterContents.id);
    chapterManager.setChapterInfo({
      name: selectedChapterContents.data.name,
      data: '',
    });

    setSelectedChapterContents({
      id: selectedChapterContents.id,
      data: {
        name: selectedChapterContents.data.name,
        data: '',
      },
    });
  };

  const onSave = ({ html, text }) => {
    const chapterManager = new FirestoreChapterManager();

    chapterManager.lockForDocId(selectedChapterContents.id);
    chapterManager.setChapterInfo({
      name: selectedChapterContents.data.name,
      data: text,
    });

    setSelectedChapterContents({
      id: selectedChapterContents.id,
      data: {
        name: selectedChapterContents.data.name,
        data: text,
      },
    });
  };

  return (
    <>
      {isEditableTextCellVisible === false && (
        <AddTextCell onAddTextCell={() => setIsEditableTextCellVisible(true)} />
      )}
      {isEditableTextCellVisible === true && (
        <TextEditor
          text={selectedChapterContents?.data.data}
          view={{
            md: isSelectedChapterContentsEmpty,
            menu: isSelectedChapterContentsEmpty,
            html: !isSelectedChapterContentsEmpty,
          }}
          onChange={({ html, text }) => console.log(html, text)}
          onCloseTextEditor={onCloseTextEditor}
          onSave={onSave}
        />
      )}
    </>
  );
}

function Book({ ...props }) {
  const logger = new LOGGER(
    Book.name,
    props?.debug === true ? LOGGER.DEBUG : LOGGER.OFF
  );

  const [chapters, setChapters] = useState([]);

  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedChapterContents, setSelectedChapterContents] = useState(null);

  useEffect(() => {
    const chapterManager = new FirestoreChapterManager();
    chapterManager.getChapterList((chapters) => setChapters(chapters));

    if (chapters.length > 0) {
      logger.info(
        `Request to firestore granted for "chapters". Received ${JSON.stringify(
          chapters
        )}`
      );
    }
  }, []);

  useEffect(() => {
    if (chapters === null || chapters === undefined || chapters.length <= 0) {
      return;
    }

    const lastSelectedChapter = localStorage.getItem('lastselectedchapter');
    logger.info(`Cached "${lastSelectedChapter}" from the local storage.`);

    if (lastSelectedChapter === null || lastSelectedChapter === undefined) {
      setSelectedChapter(chapters[0]);
    } else {
      setSelectedChapter(JSON.parse(lastSelectedChapter));
    }
  }, [chapters]);

  useEffect(() => {
    if (selectedChapter === null || selectedChapter === undefined) return;

    localStorage.setItem(
      'lastselectedchapter',
      JSON.stringify(selectedChapter)
    );
    logger.info(
      `Caching "${JSON.stringify(selectedChapter)}" to the local storage.`
    );

    const chapterManager = new FirestoreChapterManager();
    chapterManager.lockForDocId(selectedChapter.id, { override: true });
    chapterManager.getChapterInfo(({ id, data }) => {
      setSelectedChapterContents({ id, data });
    });
  }, [selectedChapter]);

  return (
    <Container>
      <Navbar rightChild={<UserAction />} />
      <BookContainer>
        <MenuContainer>
          <ChapterIndex
            selectedChapter={selectedChapter}
            setSelectedChapter={setSelectedChapter}
            chapters={chapters}
            setChapters={setChapters}
          />
        </MenuContainer>
        <ChapterContainer>
          <Page
            selectedChapterContents={selectedChapterContents}
            setSelectedChapterContents={setSelectedChapterContents}
          />
        </ChapterContainer>
        <OnThisPageContainer></OnThisPageContainer>
      </BookContainer>
    </Container>
  );
}

export default Book;
