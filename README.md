# Yogyakarta City Police Command Center Dashboard

A real-time monitoring dashboard for criminal incidents and public order disturbances in Yogyakarta, designed to support rapid and accurate operational decision-making.

## Overview

As a major Indonesian city, Yogyakarta requires an efficient monitoring system to respond to criminal incidents. This dashboard was built to present key information such as crime type, incident location, victim count, and officer response time in a concise and clear manner. This solution helps the Police Command Center overcome challenges like data fragmentation, slow response times, and difficulty in identifying high-risk areas (hotspots).

## Key Features

  - **At-a-Glance KPI Cards:** Displays key metrics like the total number of monitored districts, the top hotspot with the highest number of incidents, and the area with the fastest response time.
  - **Comparative Data Visualizations:**
      - **Incidents per District Bar Chart:** Compares crime rates across different areas.
      - **Average Response Time Bar Chart:** Highlights response efficiency in each district.
  - **Interactive Map (Leaflet):** Provides spatial context with markers for each incident location, complete with case details.
  - **Detailed Data Table:** Offers granular per-district analysis, including total incidents, victim counts, and the dominant crime type for deeper qualitative insights.

## Live Demo

[**Link to Live Demo**](https://crime-monitoring-dashboard-yogyakarta.netlify.app/)

## Tech Stack

This project is built with a modern technology stack to ensure a responsive, interactive, and maintainable interface.

  - **Frontend:**
      - **Framework:** React.js (with Vite)
      - **Language:** TypeScript
  - **UI & Components:**
      - **Styling:** Tailwind CSS
      - **Component Library:** Shadcn UI, Radix UI
      - **Icons:** Lucide React
  - **Data Visualization:**
      - **Charts:** Recharts
      - **Maps:** Leaflet & React-Leaflet
  - **State & Data Management:**
      - **Data Fetching:** TanStack Query (React Query)
  - **Routing:** React Router DOM
  - **Utilities:**
      - **Date Manipulation:** date-fns
      - **Excel Data Processing:** xlsx

## Installation and Setup

To run this project locally, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/dashboard-command-center.git
    cd dashboard-command-center
    ```

2.  **Install dependencies:**
    Use `npm` or `yarn` as you prefer.

    ```bash
    npm install
    ```

3.  **Run the development server:**
    This command starts the application in development mode.

    ```bash
    npm run dev
    ```

    Open [http://localhost:5173](https://www.google.com/search?q=http://localhost:5173) (or the port shown in your terminal) to view it in the browser.

4.  **Build for production:**
    This command creates an optimized build of the application in the `dist` directory.

    ```bash
    npm run build
    ```

## Data Source

  - The data used in this dashboard is synthetic and has been designed to reflect realistic crime patterns in Yogyakarta.
  - The total number of cases and completions is based on statistical reports from the Central Bureau of Statistics (Badan Pusat Statistik).
  - The primary data source is a dataset containing per-incident records with fields such as: `ID`, `Crime Type`, `Date`, `Time`, `City`, `District`, `Latitude`, `Longitude`, `Victims`, `Status`, and `Response Time`.

## Design Principles

  - **Dark Theme:** The background uses dark shades (like slate) to emphasize bright charts and data, reducing eye strain.
  - **Visual Hierarchy:** The layout flows from a high-level summary (KPIs) to in-depth analysis (detailed charts and tables), facilitating a gradual understanding of the information.
  - **Effective Chart Selection:** Bar charts are used for comparing quantities, while the interactive map provides intuitive spatial awareness.
