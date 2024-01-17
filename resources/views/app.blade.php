<!doctype html>

<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <title>Laravel React Timebox</title>
    <meta name="description" content="TimeBox, a Laravel, React & Redux based todo app, inspired by Steve Jobs' favorite method of focus and prioritization. A tool designed to help you manage your tasks and time more efficiently. With custom features and intuitive design, take control of your time today.">
    <meta name="author" content="Joseph Hunter">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://timebox.joehunter.dev/">
    <meta property="og:title" content="Laravel + React + Redux Timeboxing ">
    <meta property="og:description" content="TimeBox, a Laravel, React & Redux based todo app, inspired by Steve Jobs' favorite method of focus and prioritization. A tool designed to help you manage your tasks and time more efficiently. With custom features and intuitive design, take control of your time today.">
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
</head>

<body>
    <div id="root"></div>
    <script src="{{ mix('js/App.js') }}"></script>
</body>

</html>