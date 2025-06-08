# Crime Monitoring Dashboard for Yogyakarta Police Command Center

## Overview

The city of Yogyakarta, as one of Indonesia's major cities, requires a real-time monitoring system for criminal incidents and public order disturbances. Such a system enables law enforcement officers to respond quickly and accurately. Key information such as crime type, incident location, victim count, and officer response time must be presented concisely and clearly to support decision-making processes.

## Problem Statement

The Yogyakarta Police Command Center currently faces the following challenges:

* **Data Fragmentation**: Crime-related information is scattered across various sources such as field reports, historical databases, and external agencies.
* **Delayed Response**: Without centralized monitoring, officers rely on manual instructions, increasing the risk of delayed responses.
* **Difficulty Identifying Hotspots**: Without spatial analysis and mapping, it is hard to determine which districts have the highest number of incidents.
* **Need for Summarized Visual Insights**: In addition to raw data, key performance indicators (KPIs) such as total incidents, average response time, and victim counts are essential for understanding trends and guiding decisions.

## Dashboard Solution

To address these problems, a web-based real-time dashboard is developed, which includes:

* Summary KPI Cards
* Bar Charts for incident and response distributions
* Interactive Map for spatial context
* Detail Table for comprehensive analysis

### Components and Expected Insights

#### Top Summary Cards (Grid of 3)

* **Total Districts**: Number of districts with at least one recorded incident. Provides insight into the monitored area coverage.
* **Top Hotspot**: District with the highest number of incidents. Helps allocate personnel and focus patrols effectively.
* **Fastest Response**: The district with the lowest average response time. Serves as a benchmark for efficient operations.

#### Bar Chart: Incidents per District

* Displays the distribution of incidents across districts.
* X-axis: District names (rotated 45 degrees)
* Y-axis: Number of incidents
* Insight: Helps compare which districts are experiencing the highest crime rates.

#### Map: Crime Locations

* Interactive map using OpenStreetMap and Leaflet.
* Markers for each reported incident, containing details (type, district, status, time).
* Insight: Identifies geographical clusters of crimes, e.g., highways, residential areas.

#### Bar Chart: Average Response Time

* X-axis: District names
* Y-axis: Average response time (in minutes)
* Insight: Highlights which areas have the most efficient or slowest response times.

#### Detail Table: Per-District Analysis

* Columns: District Name, Total Incidents, Victim Count, Average Response Time, Dominant Crime Type
* Insight: Provides granular context to support qualitative analysis and reporting.

## Data Source and Transformation

* The data is synthetic but generated to reflect realistic crime patterns.
* The total number of cases and completed cases is based on statistical reports from Badan Pusat Statistik.
* Data is sourced from a dataset containing per-incident records: `ID`, `Crime Type`, `Date`, `Time`, `City`, `District`, `Latitude`, `Longitude`, `Victims`, `Status`, `Response Time`.

### Data Aggregation Examples

* `districtData`: \[{ district, count, avgResponse, totalVictims }]
* `crimeTypeByDistrict`: Dominant crime types in the top 5 districts
* Spatial points are visualized using coordinates (latitude, longitude) for mapping.

## Design Principles

### Chart Selection

* **Bar Charts**: Effective for comparing quantities between categories (district names). Rotated labels ensure readability.
* **Interactive Map**: Provides intuitive spatial awareness of crime clusters and areas of concern.
* **Detail Table**: Offers in-depth information that supports the visuals, including fields that are not easily represented in charts.

### Color and Visual Hierarchy

* **Dark Theme**: Backgrounds use dark tones (e.g., slate) to emphasize bright charts and data.
* **KPI Color Coding**:

  * Green for total districts (stability)
  * Red for top hotspot (critical alert)
  * Blue for fastest response (efficiency)
* **Chart Colors**:

  * Incident bars in green (#10B981)
  * Response time bars in orange (#F59E0B)

### Layout and Accessibility

* Consistent height across charts for visual balance
* 45° rotated X-axis labels for better legibility
* Cards and charts use subtle borders and shadows for separation and focus

### Cognitive Design

* **Proximity**: Related elements (titles and charts) are grouped visually
* **Similarity**: Unified style across charts and cards builds visual consistency
* **Continuity**: The layout flows from high-level summaries to detailed analysis in a top-down structure

## Conclusion

This dashboard provides the Yogyakarta Police Command Center with a centralized, real-time view of criminal incidents. With clear KPIs, comparative charts, spatial visualizations, and detailed data, it enhances operational decision-making, supports rapid response, and highlights areas requiring strategic focus.
