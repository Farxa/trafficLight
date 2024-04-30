# Traffic Lights Demo

This project is a simple demonstration of a traffic light system using React and TypeScript. It simulates the behavior of traffic lights at an intersection, including pedestrian crossing functionality.

## Features

- Main road traffic light with red, yellow, and green states
- Side road traffic light with red, yellow, and green states
- Pedestrian traffic light with red and green states, and a blinking state
- Pedestrian button to request crossing
- Responsive layout using Material-UI components

## Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher) or yarn (version 1 or higher)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Farxa/trafficLight.git
```

2. Navigate to the project directory:

```bash
cd trafficLight
```

3. Install the dependencies:

```bash
npm install
# or
yarn install
```

## Usage

1. Start the development server:

npm run dev

# or

yarn dev

````

2. Open your browser and visit `http://localhost:5173` to see the application running.

## Building for Production

To build the project for production, run:

```bash
npm run build
# or
yarn build
````

The optimized and minified files will be generated in the `dist` directory.

## Linting

To run the linter and check for any code style or syntax issues, run:

```bash
npm run lint
# or
yarn lint
```

## Project Structure

- `src/App.tsx`: The main component that renders the traffic light system and handles the overall layout.
- `src/components/`: Contains reusable components used in the application.
  - `TrafficLight.tsx`: Represents a traffic light component with configurable light states and orientation.
  - `PedestrianButton.tsx`: Represents a button for pedestrians to request crossing.
  - `Layout.tsx`: Contains layout components (`Root`, `Row`, `Container`) for structuring the application.
- `src/hooks/`: Contains custom hooks used in the application.
  - `useTrafficLights.ts`: Manages the state and logic for the main road and side road traffic lights.
  - `usePedestrianLight.ts`: Manages the state and logic for the pedestrian traffic light and handles pedestrian requests.
- `src/types.ts`: Defines TypeScript types and interfaces used throughout the application.

The project utilizes the following libraries and frameworks:

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material-UI (MUI)](https://mui.com/)
- [Vite](https://vitejs.dev/)
- [ESLint](https://eslint.org/)
