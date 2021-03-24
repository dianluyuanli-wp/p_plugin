// Copyright 2019-2021 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AccountsContext, AuthorizeRequest, MetadataRequest, SigningRequest } from '@polkadot/extension-base/background/types';

import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const noop = (): void => undefined;

const AccountContext = React.createContext<AccountsContext>({ accounts: [], hierarchy: [], master: undefined });
const ActionContext = React.createContext<(to?: string) => void>(noop);
const AuthorizeReqContext = React.createContext<AuthorizeRequest[]>([]);
const MediaContext = React.createContext<boolean>(false);
const MetadataReqContext = React.createContext<MetadataRequest[]>([]);
const SigningReqContext = React.createContext<SigningRequest[]>([]);
const ToastContext = React.createContext<({show: (message: string) => void})>({ show: noop });

export {
  AccountContext,
  ActionContext,
  AuthorizeReqContext,
  MediaContext,
  MetadataReqContext,
  SigningReqContext,
  ToastContext
};
