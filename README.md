# [Next.js](https://nextjs.org/) Project

## Getting Started

### Install dependencies

- `yarn`

### Run development server

- `yarn dev`

Open [http://localhost:3030](http://localhost:3030) with your browser to see the result.

## About the project

Project - Stabilan. Developed during two hackathons, ETH - Belgrade && ETH - Istambul

## Suggestions for review

Run `yarn` before you review the project, it will quickly install deps, and you will be able to play with typesafe strings in hooks for contract calls.

## Project Structure and Philosophy

This project is implemented following the new folder structure in Next.js 13 with an `app` directory.

### Folder Structure

The first separation that can be seen is between `app` and `lib`.

#### Why this Structure?

The reason behind this structure is to maintain a generic and reusable codebase in the `lib` folder, which is independent of this specific project. It doesn't contain any references from files in the `app` folder and can easily be copied and used as a starter template in new projects. This approach is already in practice with the `lib` folder in several projects.

##### Pros

- Saves a lot of time in new projects.
- Clean code and separation of concerns.
- Clear responsibilities.

##### Cons

- A bit more complexity.
- Unconventional folder structure.
- Increased initial coding effort.

The `lib` folder is designed to avoid unnecessary dependencies, making it feasible to eventually publish it as a standalone library. It's important to have fewer dependencies for this purpose. However, this means implementing some complex functions that could have been solved by external libraries.

#### App Folder

The `app` folder is dedicated to implementing specific use cases and business requirements for Stabilan. It relies on both the `lib` folder and external dependencies.

### Additional Info

"Wings" in the name represents a brand I am trying to establish. I use it in hooks that show potential or those that have been modified from Scaffold to meet my specific needs.
