# WhatsThat App
WhatsThat Application is a clone of a popular messaging application. This is written using Typescript and React Native.

## Table of Contents
- [WhatsThat App](#whatsthat-app)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Features](#features)
  - [Frameworks](#frameworks)
  - [Tools Used](#tools-used)
  - [Improvements](#improvements)
  - [Notes](#notes)

## Installation
1. Clone the repository
2. Run `npm install` to install all the dependencies
3. Run `npx expo start` to start expo.
4. To run on an android emulator, run `npx expo start --android`, for web `npx expo start --web`.

## Features
1. Login and Register.
2. Add, Remove, Block Contacts.
3. Create chat rooms and invite contacts to it.
4. Send messages to chat rooms.
5. Take pictures and upload as profile picture.
6. Search for all, contacts and blocked users.
7. Automatically fetch messages when a chat room is opened.
8. Automatically fetch chat rooms when the app is opened.
9. Axios interceptors to handle errors and authentication.
10. Basic notification system to display snackbar.
11. Create drafts and queue them to send them later.
12. Light and Dark mode.

## Frameworks
1. React Native
2. React Navigation for React Native
3. Axios -> requests, responses, interceptors
4. Materials UI for React Native
5. React Native Paper
6. React native logs

## Tools Used
1. Postman
2. Android Studio
3. Expo
4. React dev tools
5. VSC
6. Typescript

## Improvements
1. Adding contact should allow that contact to accept or decline.
2. Blocked user messages in a group chat can be viewed with a click.
3. Show badges when a chat has a new message.
4. Delete drafts.
5. Upload images to chat rooms.
6. Prevent creating empty chatrooms -> Invite user along with creating chatroom.
7. Add localisation.
8. Add a way to track the chat creation date, since the database doesn't store 'chat summary' creation.
   1. Not entirely sure what the best way to go about it is. Was thinking I could either store it in state or force the user to invite someone to the chat room when creating it and send first message.
9. Due to time constraints some components are not completely modularised. Some are at the stage of get it working first, then refactor.
10. Add a way to delete chat rooms. I noticed that a user removing themselves can be used as deleting the chatroom but it felt abit odd, so I prevented users doing that. Maybe thats whats usually done?
11. Change state/reducer solution to redux. I avoided using this to try and use as little libraries as possible so I can learn more about the underlying concepts.
12. Improve notifications. Currently, it only shows a snackbar. I would like to add a way to show notifications when the app is in the background.

## Notes
1. The app is not tested on iOS.
2. The app is not tested on a real device.
3. I didn't test this much on the web browser, an issue i'm aware of are some of the animations.
4. This app is developed & tested on an android emulator, `Pixel 4 API 33, Android 13.0`. 
5. This project is built using typescript. I'm still learning typescript so there might be some inconsistencies.
6. Learnt more on creating my own hooks and using them towards the end of the project. I would like to refactor some of the code to use them.
7. Expo is used to run the app. The version used for this project is currently `48.0.0.` If you're required to update expo on your system, it could interfere with other students projects. So, please be careful.