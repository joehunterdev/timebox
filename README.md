# Laravel + React Timeboxer

Timeboxer is a drag-and-drop todo application with visually re-adjustable time slots to fill an 8-hour day. It's designed to help manage your time effectively and focus on what truly matters. This happens to have been **Steve Jobs** goto method for todo management. 

[See the Demo](https://timebox.joehunter.dev)

## Features

- 📝 Drag and Drop: Easily organize your tasks with a user-friendly interface.
- 🌅 Time Management: Set specific time periods for tasks to improve productivity.
- 🧩 Task Prioritization: Prioritize your tasks.
- 🎨 API: The application includes an API with a well-defined data structure. 

## 🏁 Getting Started

The application is built using Laravel and React. 

Here are the steps to set it up:

1. Clone the repository 
2. Install `package.json`, `composer.json` dependancies. 
3. Create MySQL database and update `.env` file with your database credentials
4. `php artisan migrate` to create the database
5. `php artisan db:seed` to seed the database
6. See package.json for commands and `webpack.mix.js` for build settings.
7. `$ php artisan serve` 


![Timebox](timebox-example.png)
