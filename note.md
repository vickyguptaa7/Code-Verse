# Code Verse

<p align="center">
<img src="./front-end/public/favicon.svg" alt="Image" style="width: 100px;">
</p>

> Welcome to CodeVerse, an online code editor and compiler designed to support various programming languages including Java, C++, Python, and more. With CodeVerse, you can write, edit, and execute your code seamlessly within a web-based environment.

<br>

[![Thumnail](./extra/editor.png)](https://drive.google.com/file/d/1fb9qxVC3P0jJJSlBV9ZefCoFSuXPaV3M/view?usp=sharing)

<br>

## Features

- **Multi-Language Support**: CodeVerse supports multiple programming languages, providing a versatile platform for coding in Java, C++, Python, and other popular languages.
- **Online Compilation**: Compile your code online without the need for a local compiler. CodeVerse provides a convenient way to compile and run your code directly from your browser.
- **Multiple Tabs**: CodeVerse allows you to work on multiple files simultaneously. You can open multiple tabs within the application, each representing a different file. This feature enables seamless navigation and editing across multiple projects or files.
- **Integrated Terminal**: The app provides an integrated terminal right within the interface. This terminal allows you to execute commands and interact with your project's environment without needing to switch to external terminal applications.
- **Search and Replace**: CodeVerse offers a powerful search and replace functionality. You can search for specific code snippets, variables, or keywords within a file or across your entire project.
- **Code Folding**: When dealing with large code files, readability becomes crucial. CodeVerse allows you to collapse or fold sections of code, such as functions, classes, or loops, to hide their details temporarily. This feature helps you focus on specific parts of your code and improves overall code organization.
- **Import files and folders**: I integrated a feature that allows me to import files and folders from my local system directly into the code editor web app. This makes it seamless to integrate my existing codebase into the editor.
- **Download files and folders**: Another convenient feature I added is the ability to download files and folders from the web app. This functionality makes it effortless to save and share code with others.
- **Persistent data**: One critical aspect I focused on was data persistence. The code editor automatically saves my work, ensuring that I never lose progress, even if I close the app or refresh the browser.
- **Autocomplete Suggestions**: CodeVerse offers intelligent autocomplete suggestions as you type. The app analyzes your code context and provides suggestions for variables, functions, and other relevant code snippets. This feature saves time, reduces typos, and helps you write code more efficiently.

<br>

## Technologies Used

CodeVerse is built using modern web technologies and frameworks, including:

- **Frontend**: The frontend is developed using HTML, CSS, and JavaScript. It utilizes popular libraries like React.js to create a dynamic and responsive user interface.
- **Backend**: The backend is powered by Node.js and Express.js. It handles code compilation, and other server-side functionalities.

# Front-end

## Performance Optimizations

The code editor app incorporates various performance optimizations to provide a fast and responsive experience, especially when handling directory and file operations. These optimizations enhance rendering speed, reduce unnecessary computations, and leverage web workers for efficient background processing. Let's explore the specific optimizations implemented in the code editor app:

- **Virtualized Rendering** : The code editor app utilizes virtualized rendering techniques to efficiently handle large directories and files. By rendering only the visible portion of the directory/file tree, the app significantly reduces memory usage and improves overall performance. This optimization ensures smooth navigation and scrolling, even when working with extensive directory structures.
- **Debounced Updates** : When performing directory or file operations, such as searching or renaming, the app uses debounced updates. This technique limits the frequency of re-rendering and processing, reducing unnecessary computations and improving performance. It ensures that the app remains responsive, even during rapid and frequent operations.
- **Web Workers** : The code editor app employs web workers for background processing of directory and file operations. Web workers run tasks in a separate thread, offloading heavy computations from the main thread, and preventing UI blocking. This optimization enables smooth interaction with the app while performing time-consuming tasks like searching, indexing, and analyzing files.
- **Memoization** : To optimize directory and file handling operations, the app incorporates memoization. Memoization stores the results of expensive function calls and retrieves them when the same operation is requested again. By caching and reusing computed results, the app avoids redundant computations, improving response times for repetitive operations.
- **Optimized Data Structures**: The code editor app leverages optimized data structures, such as trees or hash maps, for efficient organization and retrieval of directory and file information. These data structures enhance search and retrieval operations, reducing the time required to locate and process files within the app.

By combining virtualized rendering, debounced updates, web workers, and memoization, the code editor app delivers fast and efficient directory and file handling operations. Users can seamlessly navigate directories, search for files, and perform various operations without experiencing performance degradation.

<br>

## Themes

The code editor app offers multiple themes to customize the editor's appearance. Themes provide different color schemes and styles, allowing you to personalize the coding environment. Here are some available themes:

- Dark Theme: A sleek and modern dark-themed editor with a dark background and vibrant syntax highlighting colors. It is easy on the eyes and suitable for coding in low-light conditions.
- Light Theme: A clean and bright light-themed editor with a white background and contrasting syntax highlighting colors. It offers a refreshing and professional coding experience.
- Monokai Theme: A popular theme inspired by the Monokai color scheme, known for its vibrant and visually appealing syntax highlighting. It provides a stylish and energetic coding environment.
- Solarized Theme: The Solarized theme is a balanced and well-thought-out color scheme designed for code legibility. It offers both light and dark variants, ensuring comfortable coding in different lighting conditions.
- Dracula Theme: A dark-themed editor inspired by the popular Dracula color scheme. It features a dark background with contrasting syntax highlighting colors, creating an atmospheric and visually appealing coding environment.
- Night Owl Theme: A sophisticated dark theme with carefully selected colors for optimal code readability. The Night Owl theme provides a pleasant contrast between the background and syntax elements, making code stand out while reducing eye strain.

You can easily switch between themes within the app to find the one that suits your preferences.

<br>

## Responsive Design

The code editor app is built with a responsive design approach, allowing it to adapt to different screen sizes and devices. Here are some key aspects of its responsive design:

- **Mobile-friendly**: The app's user interface is optimized for mobile devices, ensuring a seamless experience on smartphones and tablets. The code editor, tabs, terminal, and other features are all designed to work effectively on smaller screens.
- **Responsive Layout**: The app's layout adjusts dynamically based on the available screen space. This ensures that the code editor, toolbar, and other elements are appropriately positioned and sized, regardless of the device's screen size.
- **Flexible Components**: The individual components within the app are designed to be flexible and responsive. They can adjust their size and behavior based on the available screen space, providing an optimal user experience across devices.
- **Touch Support**: The app supports touch gestures, allowing users to interact with the code editor, tabs, and other elements using touch-based input. This makes it easy to navigate and edit code on touch-enabled devices.

Whether you're using a desktop computer, laptop, tablet, or smartphone, the code editor app will provide a consistent and user-friendly experience.

# Back-end

> Welcome to the Code Verse Backend! This backend application is responsible for executing code and returning the output to the Code Verse Code Editor. It provides a secure and isolated environment for running code snippets submitted by users.

## Features

- **Docker Containerization** : The backend is containerized using Docker, providing a lightweight and isolated runtime environment.
- **Non-root Execution** : The child processes responsible for executing user code run in a non-root context. This helps mitigate the impact of any potential vulnerabilities or exploits within the executed code.
- **Rate Limiter** : A rate limiter is in place to prevent excessive requests from a single client or IP address, protecting against abuse and potential Denial of Service (DoS) attacks.
- **Speed Limiter** : To prevent abuse and resource exhaustion, a speed limiter restricts the rate at which code executions can occur. This helps maintain optimal performance and ensures fair resource allocation.
