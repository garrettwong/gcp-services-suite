#!/usr/bin/env bash

brew install git-secrets
git secrets --install

git secrets --add 'private_key'
git secrets --add 'private_key_id'
