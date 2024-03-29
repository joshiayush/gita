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

import LOGGER from '../../lib/logger/logger.js';
import { FirebaseOAuth } from '../../firebase/auth.js';

import { Button, GoogleLogo } from './styles/styles.jsx';

function GoogleSignInButton({ callback = (result) => result }) {
  const logger = new LOGGER(GoogleSignInButton.name, LOGGER.INFO);

  const handleClick = async () => {
    const oAuth = new FirebaseOAuth();
    oAuth.signInWithGoogle(callback);
  };

  return (
    <Button onClick={handleClick}>
      <GoogleLogo
        src="https://lh3.googleusercontent.com/X6Npx8VfDr60QgT9ICGwEq8whBZqQdRYc3Cu8MdbzG45wS8Ow5W9xcvpJ2BbSxQU7CMEJBv68aXkKsyY7gBywf2v4B-7-HY98vvzPA"
        alt="Google Logo"
      />
      <p>Sign in with Google</p>
    </Button>
  );
}

export default GoogleSignInButton;
