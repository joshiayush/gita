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

import { Navbar } from '../../components/index.jsx';

import {
  SignInForm as SignInWithEmailForm,
  GoogleSignInButton,
} from '../../components/index.jsx';

import {
  SignInForm,
  SignInHeader,
  SignInContainer,
  SignInMainContainer,
  SignInFormMainContainer,
  SignInWithEmailContainer,
  SignInWithGoogleContainer,
} from './styles/styles.jsx';

function SignInFormContainer() {
  return (
    <SignInMainContainer>
      <SignInHeader>
        <div>
          <div>
            <p>
              <strong>Sign in</strong>
            </p>
            <p>Access your Gita account</p>
          </div>
        </div>
      </SignInHeader>
      <SignInFormMainContainer>
        <SignInForm>
          <SignInWithGoogleContainer>
            <GoogleSignInButton />
          </SignInWithGoogleContainer>
          <SignInWithEmailContainer>
            <div>
              <SignInWithEmailForm />
            </div>
          </SignInWithEmailContainer>
        </SignInForm>
      </SignInFormMainContainer>
    </SignInMainContainer>
  );
}

function SignIn() {
  return (
    <SignInContainer>
      <Navbar />
      <SignInFormContainer />
    </SignInContainer>
  );
}

export default SignIn;
