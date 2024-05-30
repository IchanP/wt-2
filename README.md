# Aninac

## Description

Aninac is a data visualizer and a search tool for anime titles. It provides an interesting overview of the trends in the anime industry ranging back to it's surge in popularity in the 1970s and 1980s. The application also allows users to search for specific anime and view detailed information about each title.

The application is accessible on the web at [https://cscloud8-71.lnu.se](https://cscloud8-71.lnu.se)

## Features

- **Total Anime Graph**: Visualize the growth in the number of anime titles since 1975.
- **Genre Popularity Timeline**: Explore how different genres and tags have varied in popularity over the years.
- **Search Functionality**: Look up anime by titles.
- **Anime Detail Pages**: View detailed information about each anime title, from several sources.
- **Genre Search**: You can display anime titles by genre by selecting a genre and year combination on the timechart or by selecting a genre tag on an individual anime page.   More robust search functionality by genre may be added in the future.

## External API

The application uses the [Jikan API](https://jikan.moe/) and [Kitsu's Public API](https://kitsu.docs.apiary.io/) to fetch additional information about each title and augment the existing dataset.

## Limitations and Considerations

The application relies heavily on a seperate internal backend API to fetch and talk with the database. This means that the application will not work without the backend service running.

## Core Technologies

- Datavisualization: [Plotly](https://plotly.com/) - Plotly is used to draw the graphs and charts in the application.
- Framework: [Nextjs](https://nextjs.org/) - Next.js was used as the Meta framework of choice.
- Typescript: [Typescript](https://www.typescriptlang.org/) - Typescript was used to provide static typing to the application.
- Styling: [Tailwind CSS](https://tailwindcss.com/) - Tailwind CSS was used to style the application.

## Acknowledgements

- [manami-project](https://github.com/manami-project/anime-offline-database) - The app uses the anime dataset from this repository internally.
- [Jikan API](https://jikan.moe/) - The app uses the Jikan API to fetch additional information about each anime title.
- [Kitsu's Public API](https://kitsu.docs.apiary.io/) - The app uses Kitsu's Public API to fetch additional information about each anime title.