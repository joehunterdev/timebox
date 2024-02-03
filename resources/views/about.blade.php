<!doctype html>

<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <title>Laravel React Timebox</title>
    <meta name="description" content="TimeBox, a Laravel, React & Redux based todo app, inspired by Steve Jobs' favorite method of focus and prioritization. A tool designed to help you manage your tasks and time more efficiently. With custom features and intuitive design, take control of your time today.">
    <meta name="author" content="Joseph Hunter">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://timebox.joehunter.dev/">
    <meta property="og:title" content="Laravel + React + Redux Timeboxing ">
    <meta property="og:description" content="Laravel, React & Redux based todo app, inspired by Steve Jobs' favorite method of focus and prioritization. A tool designed to help you manage your tasks and time more efficiently. With custom features and intuitive design, take control of your time today.">
    <meta property="og:image" content="https://timebox.joehunter.dev/images/timebox-example.png">
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://timebox.joehunter.dev/">
    <meta property="twitter:title" content="Laravel + React + Redux Timeboxing">
    <meta property="twitter:description" content="TimeBox, a Laravel, React & Redux based todo app, inspired by Steve Jobs' favorite method of focus and prioritization. A tool designed to help you manage your tasks and time more efficiently. With custom features and intuitive design, take control of your time today.">
    <meta property="twitter:image" content="https://timebox.joehunter.dev/images/timebox-example.png">
    <link rel="me" href="https://github.com/joehunterdev" type="text/html">
    <link rel="me" href="https://www.linkedin.com/in/joehunterdev/" type="text/html">
    <link rel="icon" type="image/png" href="/images/favicon-96x96.png" sizes="96x96">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link href="{{ asset('css/all.min.css') }}" rel="stylesheet">
    <meta name="robots" content="index, follow">
</head>

<body>
    <div id="root d-flex align-items-center justify-content-evenly shadow-sm bg-body p-2 row">
        <main class="py-4 px-4 container">
            <div class="col-md-8 mx-auto ">
                <div class="jumbotron text-center">
                    <h1 class="display-4">TimeBox</h1>
                    <p class="lead">Welcome to the demo of this drag-and-drop todo application. It features visually re-adjustable time slots to fill an 8-hour day. It's designed to help manage your time effectively and focus on what truly matters. This happens to have been<strong> Steve Job's</strong> goto method for todo management.</p>
                    <hr class="my-4">
                    <a href="/" class="btn btn-primary rounded-0 shadow-sm "><i class="fas opacity-75 fa-chalkboard-teacher"></i> See The demo</a>
                </div>
                <hr>

                <h2><i class="fas opacity-75 fa-layer-group"></i>Stack</h2>
                <ul class="d-flex flex-row list-unstyled mt-2 align-items-center justify-content-between mx-2">
                    <li><i class="fab fa-react fa-2x" style="color: rgb(97, 219, 251);"></i> React</li>
                    <li><i class="fas fa-undo-alt fa-2x" style="color: rgb(118, 74, 188);"></i> Redux</li>
                    <li><i class="fab fa-laravel fa-2x" style="color: rgb(255, 45, 32);"></i> Laravel</li>
                </ul>
                <hr>
                <h2><i class="fas opacity-75 fa-tasks"></i> Features</h2>
                <ul class="list-unstyled ml-4 pl-4">
                    <li><i class="fas opacity-75 fa-pencil-alt"></i> Drag and Drop: Easily organize your tasks with a user-friendly interface.</li>
                    <li><i class="fas opacity-75 fa-sun"></i> Time Management: Set specific time periods for tasks to improve productivity.</li>
                    <li><i class="fas opacity-75 fa-puzzle-piece"></i> Task Prioritization: Prioritize your tasks.</li>
                    <li><i class="fas opacity-75 fa-paint-brush"></i> API: The application includes an API with a well-defined data structure.</li>
                    <li><i class="fas opacity-75 fa-palette"></i> Color Tagging: Assign colors to tasks for easy identification and organization.</li><i class="fas opacity-75 fa-user-alt"></i> User Features<li>
                        <ul class="list-unstyled m-2">
                            <li><i class="fas opacity-75 fa-user-plus"></i> Signup</li>
                            <li><i class="fas opacity-75 fa-user-check"></i>Register</li>
                            <li><i class="fas opacity-75 fa-sign-in-alt"></i> Login</li>
                            <li><i class="fas opacity-75 fa-user-lock"></i> Forgot password</li>
                            <li><i class="fas opacity-75 fa-envelope"></i> Email verification</li>
                        </ul>
                    </li>
                </ul>
                <hr>
                <h2><i class="fas opacity-75  fa-flag-checkered"></i> Getting Started</h2>
                <pre><code><div><ol><li>Clone the repository</li><li>Install `package.json` and `composer.json` dependencies</li><li>Create a MySQL database and update the `.env` file with your database credentials</li><li>Run `php artisan migrate` to create the database</li><li>Run `php artisan db:seed` to seed the database</li><li>Refer to the `package.json` for available commands and `webpack.mix.js` for build settings</li><li>Start the application by running `$ php artisan serve`</li></ol></div></code></pre><a href="https://github.com/joehunterdev/timebox" target="_blank" rel="noopener noreferrer">See GitHub Repository</a>
            </div>
            </hr>
            <div class="container col-md-8 mx-auto mt-5">
                <h2>History</h2>
                <p>The concept of timeboxing has deep roots in <strong>Scrum</strong> methodologies, particularly <strong>Scrum</strong> and <strong>Extreme Programming</strong>, but its origins can be traced back even further:</p>
                <ul>
                    <li>Scott Schultz's "Rapid Iterative Production Prototyping" method, which was implemented at Information Engineering Associates, a spin-off of Du Pont, introduced the timebox as a fundamental element in 1988.</li>
                    <li>In 1991, James Martin extensively discussed the specifics of the timebox approach in a chapter of his book "Rapid Application Development".</li>
                </ul>
                <p>Thus, while timeboxing is a key feature of modern Agile practices, its history and influence span several decades and various fields of application.</p>
            </div>
            <div class="container col-md-8 mx-auto mt-5">

                <h2><i class="fas fa-clock"></i> Benefits of Timeboxing</h2>
                <ul>
                    <li><i class="fas fa-check"></i> Helps estimate deadlines: Determine if there's enough time to accomplish a project.</li>
                    <li><i class="fas fa-check"></i> Measures team availability: Determine how much time a team can dedicate to a new project.</li>
                    <li><i class="fas fa-check"></i> Fights procrastination: Timeboxing your schedule/to-do list can help combat procrastination tendencies.</li>
                    <li><i class="fas fa-check"></i> Improves focus: Stay on track and prioritize tasks effectively.</li>
                </ul>
            </div>
            <div class="container col-md-8 mx-auto mt-5 p-2 m-4  shadow-sm d-flex flex-row">
                <div class="row">
                    <div class="col-md-4 pl-4">
                        <img src="https://avatars.githubusercontent.com/u/87482127?v=4" class="img-fluid rounded-circle w-50 p-2" alt="See More Projects">
                    </div>
                    <div class="col-md-8 text-center">
                        <h2>Explore more of my Projects</h2>
                        <p>If you're interested in seeing more of my work see my website.</p>
                        <a href="https://joehunter.es" class="btn btn-primary bg-none rounded-0"> Visit My Site</a>
                        <a href="https://github.com/joehunterdev" class="btn btn-primary bg-none rounded-0"> Git Hub</a>

                    </div>
                </div>
            </div>
    </div>
    </main>



</body>

</html>