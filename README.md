# Span Photoscape TV

This is a Smart TV application designed to allow users to navigate through various photo topics using the Unsplash API. The app displays photos in a horizontally scrolling grid, enabling users to browse and view images from selected topics.

## Problem Statement

The goal of this project is to build a production-ready Smart TV application where users can:

1. Select a topic (e.g., wallpapers, nature) from a menu.
2. Retrieve and display photos related to that topic using the Unsplash API.
3. Navigate the photo grid, where columns shift one at a time in either direction.

This project assumes the application runs on the latest versions of browsers like Safari, Firefox, and Chrome, but is intended for a Smart TV environment at 1920 x 1080 resolution.

## Features

- Fetches topics dynamically from the Unsplash API.
- Displays topic-specific photos in a scrollable, responsive grid.
- Horizontally shifts columns by one unit on navigation.
- Responsive layout, tested to run smoothly on modern browsers at 1080p resolution.

## Tech Stack

- **React**: Frontend library for building user interfaces.
- **TypeScript**: Provides static typing for safer, more maintainable code.
- **Unsplash API**: Provides topic and photo data.
- **CSS**: For layout and styling, ensuring responsiveness.

## API Endpoints

- **Get Topics**: `https://api.unsplash.com/topics`
- **Get Photos for a Topic**: `https://api.unsplash.com/topics/<topic_name>/photos`

You will need to register as a developer on Unsplash and create an app to get the required API keys. Check the official [Unsplash Developers](https://unsplash.com/developers) page for more information.

## Setup

1. Clone the repository:

```bash
git clone https://github.com/mfundoshabalala/span-photoscape-tv.git
cd span-photoscape-tv
```
2. Install dependencies:
```bash
npm install
```
3. Create a .env file in the root directory with your Unsplash API key:
```bash
VITE_UNSPLASH_ACCESS_KEY=your_api_key_here
```
4. Run the app:
```bash
npm start
```
5. The application will open in your default browser at http://localhost:3000


## Challenges
TV Testing: I was unable to fully test the application on an actual Smart TV as I do not have access to one. However, the application was thoroughly tested in modern web browsers, and it should perform as expected on a TV environment.
