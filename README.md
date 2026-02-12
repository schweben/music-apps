# Music Apps

## Overview

This repository contains a React application for providing a suite (currently just two) of musical applications to assist musicians with transposition and practice.

### Transposition

This allows the user to select a source instrument key (e.g. a C trumpet) and a target instrument key (e.g. a B𝄬 trumpet) and then transpose a key signature and/or a specific note from the source to the target

### Scales Practice

This presents the user with a list of different types of musical scale. One or more can be selected and the application will then choose a random scale for the user to practice from the selected choices.

# Building

Run in a local development server
```bash
npm run dev
```

# Build for production
```bash
npm run build
```
Then take the build output files from /dist

## TODO

- [X] Add help
- [X] Add circle of fifths
- [X] Display test results on dashboard
- [X] Display code coverage on dashboard
- [ ] Improve help text

## Bugs

- [ ] Help screen doesn't display properly on mobile
- [ ] Circle of fifths doesn't scale properly on mobile
- [X] Error message on running unit tests 'Not implemented: HTMLCanvasElement's getContext() method: without installing the canvas npm package'
- [ ] Flat symbols don't render on iOS
- [ ] Buttons are blue on iOS
- [X] Scales practice does not use the same sharps and flats symbols as the rest of the application
