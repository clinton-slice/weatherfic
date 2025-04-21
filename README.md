### Date

April 20th, 2025

### Location of deployed application

[https://weatherfic-1io5.vercel.app/](https://weatherfic-1io5.vercel.app/)

### Time spent

Total time: Approximately 3 hours and 53 minutes.

Breakdown:

- 30 minutes: Planning, finding UI design inspiration, and reading OpenWeatherMap API documentation.
- 2 hours 30 minutes: Coding the application.
- 30 minutes: Writing and running tests.
- 3 minutes: Deployment.
- 20 minutes: Updating the README file.

### Assumptions made

- **Units:** Assumed metric units (Celsius for temperature, meters/sec for wind speed) are the desired format for displaying weather data, as explicitly requested in the API calls (`units=metric`).
- **API Consistency:** Assumed the OpenWeatherMap API endpoints (`/forecast` and the geocoding endpoint) and their response structures remain stable and consistent with the documentation available during development.
- **Error Handling Scope:** Primarily focused on handling common errors such as invalid/missing API keys, network connectivity problems, and locations not found via the API. Assumed that more obscure API error states or edge cases are less critical for this implementation.
- **Target Environment:** Assumed the application will run in a modern web browser environment that supports standard features like the Fetch API, ES Modules, and CSS Variables.
- **State Management Approach:** Assumed that React's built-in state management capabilities (like `useState`, `useEffect`, and `useContext` for theming) are sufficient for managing the application's state, without needing external libraries like Redux or Zustand.

### Shortcuts/Compromises made

- **Error Message Generality:** User-facing error messages (e.g., "Failed to fetch forecast", "Could not load current weather data") could be more specific and informative based on the actual API error or network condition encountered.
- **Limited Test Scope:** While the `ThemeToggle` component has unit tests, other key parts of the application lack automated tests. This includes components like `CurrentWeatherDisplay`, `HourlyForecastList`, `FiveDayForecastList`, utility functions (`weatherUtils`, `helpers`), and the `useWeatherData` hook. Additionally, no integration tests (verifying component interactions) or end-to-end tests (simulating user flows) were implemented.
- **Basic Loading State UI:** The application currently displays a simple loading animation. More advanced UI patterns, such as skeleton loaders that mimic the final layout could enhance the perceived loading performance and user experience.

### Stretch goals attempted

- **Add tests:** Partially Attempted.

  - _What went well:_ Unit tests were implemented for the `ThemeToggle` component using Vitest and React Testing Library, covering its core functionality. Basic tests for UI components like `StatItem`, `ErrorMessage`, and `LoadingIndicator` were also added.
  - _What could be better:_ Test coverage remains limited. Key areas like the main display components (`CurrentWeatherDisplay`, `HourlyForecastList`, `FiveDayForecastList`), the `useWeatherData` hook, utility functions, and integration/end-to-end flows were not covered by automated tests.

- **Use TypeScript:** Fully Achieved.

  - _What went well:_ TypeScript was consistently used throughout the project for defining types (API responses, component props), enhancing code reliability, maintainability, and developer experience.

- **Use Next.js:** Not Attempted.
  - _Reason:_ Used Vite instead of Next.js as it fulfilled the assignment's client-side needs. Migration was considered out of scope.

### Instructions to run assignment locally

1.  **Get an API Key:**

    - Go to [OpenWeatherMap](https://openweathermap.org/).
    - Sign up for a free account.
    - Navigate to the API keys section and generate/copy your API key.

2.  **Configure Environment Variable:**

    - Create a file named `.env` in the root directory of the project.
    - Add the following line to the `.env` file, replacing `your_actual_api_key` with the key you obtained:
      ```
      VITE_OPENWEATHERMAP_API_KEY=your_actual_api_key
      ```

3.  **Install Dependencies:**

    - Open your terminal in the project root directory.
    - Run the command:
      ```bash
      npm install
      ```

4.  **Run the Development Server:**
    - In the same terminal, run the command:
      ```bash
      npm run dev
      ```
    - The application should now be running, typically at `http://localhost:5173` (check your terminal output for the exact URL).

### What did you not include in your solution that you want us to know about?

Several potential features or enhancements were considered but not implemented, primarily to keep the scope focused on the core requirements or due to time constraints:

- **Displaying More Weather Details:** The OpenWeatherMap API provides a lot of additional data (e.g., pressure, visibility, UV index, wind direction). Integrating and displaying these was omitted to maintain UI simplicity and focus on key metrics.
- **More Granular Error Feedback:** Current error handling is generic; could be improved with specific messages for different API/network errors.

### Other information about your submission that you feel it's important that we know if applicable.

- **Core Technology Stack:** The application is built using React and TypeScript, ensured modern React practices like functional components and hooks (`useState`, `useEffect`, `useContext`, `useMemo`) was used.
- **Styling Approach:** Tailwind CSS was utilized for utility-first styling, facilitating the creation of a responsive design that includes both light and dark themes.

- **Development Tooling:** Vite serves as the build tool and development server. Code quality is maintained through ESLint for linting and Prettier for automatic formatting.
- **State Management:** React's Context API was employed for managing the theme state, considered sufficient for the application's current complexity without needing external libraries.

### Your feedback on this technical challenge

This was an enjoyable and well-defined challenge. It provided a good opportunity to work with APIs, asynchronous operations, and modern frontend practices within a practical context.
