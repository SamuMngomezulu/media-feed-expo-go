Media Feed with Reminders (Expo Go)

This is a media feed application built with React Native and Expo Go. It showcases best practices for building a performant, accessible, and user-friendly mobile app, including:

Pagination: Infinite scroll and pull-to-refresh for loading data.

Image Optimization: Progressive image loading with placeholders and pre-fetching.

Local Notifications: User-scheduled reminders that deep-link to content.

Error Handling: A resilient UI that handles network errors gracefully.

Code Quality: Clean, typed components, and sensible memoization.

Prerequisites

Before running the app, set up your development environment:

Node.js & npm: Install the latest version of Node.js
. npm comes bundled with Node.js.

Expo CLI: Install globally using:
npm install -g expo-cli

A Mobile Device or Emulator:

Physical Device: Download the Expo Go
 app from Google Play Store or Apple App Store.

Android Emulator: Install Android Studio and configure a virtual device. Ensure Android SDK and Platform-Tools are installed via SDK Manager.

iOS Simulator (macOS only): Install Xcode from the Mac App Store, which includes the iOS simulator.

Getting Started
Step 1: Clone the Repository

git clone https://github.com/SamuMngomezulu/media-feed-expo-go.git

cd media-feed-expo-go

Step 2: Install Dependencies

npm install

Step 3: Run the Application

Start the Expo development server:

npm start

This will open Expo Dev Tools in your browser and display a QR code in the terminal.

Step 4: Open the App on Your Device or Emulator

Physical Device: Open the Expo Go app, tap "Scan QR Code", and scan the QR code displayed in the terminal.

Android Emulator: Ensure the emulator is running, then press a in the terminal to launch the app.

iOS Simulator: Ensure the simulator is running, then press i in the terminal to launch the app.

The app will now load, and you can begin interacting with it.

Features

Infinite scrolling feed with pull-to-refresh.

Progressive image loading and caching.

Local notifications and deep links.

Graceful network error handling.

Clean, typed, and memoized components for maintainable code.
