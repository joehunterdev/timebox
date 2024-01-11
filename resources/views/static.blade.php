<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <!-- Other head elements... -->
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Include Bootstrap CSS -->
    <link href="{{ asset('css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css">
    <style>
        .b-example-divider {
            width: 70%;
            height: 3rem;
            background-color: rgba(0, 0, 0, .1);
            border: solid rgba(0, 0, 0, .15);
            border-width: 1px 0;
            box-shadow: inset 0 0.5em 1.5em rgba(0, 0, 0, .1), inset 0 0.125em 0.5em rgba(0, 0, 0, .15);
            display: block;
        }

        .height-1 {
            height: 5.5vh;
            /* Adjust as needed */
        }

        .height-2 {
            height: 11.11vh;
            /* Adjust as needed */
        }

        .height-3 {
            height: 33vh;
            /* Adjust as needed */
        }

        .height-4 {
            height: 44vh;
            /* Adjust as needed */
        }

        .height-5 {
            height: 155vh;
            /* Adjust as needed */
        }
    </style>
</head>

<body class="">
    <div id="root">
       <?php /* <header class="">
            <nav class="navbar bg-body-tertiary  align-items-center justify-content-between border-bottom p-1">
                <div class="text-center">
                    <a href="/" class="link-body-emphasis text-decoration-none d-block">
                        <img src="{{ asset('images/logo_75.png') }}" alt="Logo" height="30px">
                        <!-- <span class="fs-4 mt-3">Timebox</span> -->
                    </a>
                </div>
                <ul class="nav mb-md-0">

                    <li>
                        <a href="#" class="nav-link px-2">
                            <i class="fas fa-calendar-alt me-2 text-secondary"></i>
                        </a>
                    </li>

                    <li><a href="#" class="nav-link px-2"> <i class="fas fa-sun me-2 opacity-1 text-secondary"></i>
                        </a></li>

                </ul>
                <div class="mr-4">
                    <!-- <button type="button" class="btn btn-outline-primary me-2">Login</button> -->
                    <button type="button" class="btn  bg-none text-secondary"><i class="fas fa-user"></i></button>
                </div>
            </nav>
        </header> */ ?>
        <!-- <div class="b-example-divider"></div> -->
        <main class="container">
            <!-- <div class="row  my-2">
                <div class="col-lg-6 col-lg-offset-2 col-md-6 col-sm-6 col-xs-12">
                    <div class="justify-content-center shadow-sm text-center bg-body pb-2">
                        <h1>Item</h1>
                        <div>Control</div>
                    </div>
                </div>
            </div>
            <div class="row  my-2">
                <div class="col-lg-6 col-lg-offset-2 col-md-6 col-sm-6  col-xs-12">
                    <div class="d-flex align-items-center justify-content-evenly shadow-sm bg-body p-3">
                        <i class="fas fa-2x fa-chevron-left text-secondary opacity-25"></i>
                        <h3 class="mx-2">Mon 26th</h3>
                        <i class="fas fa-2x fa-chevron-right text-secondary  opacity-25"></i>

                    </div>
                </div>
            </div> -->
            <div class="row  my-2">
                <div class="col-12">
                    <small class="opacity-50 text-nowrap">08:30</small>
                    <div class="d-flex align-items-start shadow-sm bg-body height-1  overflow-hidden">
                        <p class="opacity-75 w-100 py-2 px-3">Some placeholder content..</p>
                        <button type="button" class="btn btn-outline-secondary opacity-25 btn-xs border-0 ">
                            <i class="fas fa-pencil-alt small"></i> </b<link href="{{ asset('css/all.min.css') }}" rel="stylesheet">utton>
                        </p>
                        <!-- <button type="button" class="btn btn-outline-secondary btn-xs  border-0"><i class="fas fa-arrows-alt text-secondary opacity-25"></i></button> -->
                        <button type="button" class="btn btn-outline-secondary btn-xs border-0"> <i class="fas fa-clock "></i> </button>
                        <select class="form-select-xs mx-1 border-0 mb-0 opacity-75 d-none" name="" id="">
                            <option selected>20</option>
                            <option value="">1hr</option>
                            <option value="">1.5hr</option>
                            <option value="">3hrs</option>
                        </select>
                        <button type="button" class="btn btn-outline-secondary btn-xs border-0"> <i class="fas fa-check "></i> </button>
                    </div>
                </div>
            </div>

            <div class="row  my-2">
                <div class="col-12">
                    <small class="opacity-50 text-nowrap">09:00</small>
                    <div class="d-flex align-items-start shadow-sm bg-body height-2 bg-success-subtle overflow-hgidden">
                        <p class="opacity-75 w-100 py-2 px-3">Some placeholder content i Test placeholder content i Some placeholder nes i Some i</p>
                        <button type="button" class="btn btn-outline-secondary opacity-25 btn-xs border-0 ">
                            <i class="fas fa-pencil-alt small"></i> </button>
                        </p>
                        <!-- <button type="button" class="btn btn-outline-secondary btn-xs  border-0"><i class="fas fa-arrows-alt text-secondary opacity-25"></i></button> -->
                        <button type="button" class="btn btn-outline-secondary btn-xs border-0"> <i class="fas fa-clock "></i> </button>
                        <select class="form-select-xs mx-1 border-0 mb-0 opacity-75 d-none" name="" id="">
                            <option selected>20</option>
                            <option value="">1hr</option>
                            <option value="">1.5hr</option>
                            <option value="">3hrs</option>
                        </select>
                        <button type="button" class="btn btn-outline-secondary btn-xs border-0"> <i class="fas fa-check "></i> </button>
                    </div>
                </div>
            </div>
            <div class="row  my-2">
                <div class="col-12">
                    <small class="opacity-50 text-nowrap">09:30</small>
                    <div class="d-flex justify-content-between  align-items-end shadow-sm bg-body p-3 ">

                        <!-- <button type="button" class="btn btn-outline-secondary btn-xs  border-0"> <i class="fas fa-arrows-alt"></i> </button> -->
                        <button type="button" class="btn btn-outline-secondary btn-xs  border-0"> <i class="fas fa-plus "></i> </button>

                    </div>
                </div>
            </div>
            <div class="row  my-2">
                <div class="col-12">
                    <small class="opacity-50 text-nowrap">10:00</small>
                    <div class="d-flex align-items-start shadow-sm bg-body height-3 bg-primary-subtle overflow-hidden">
                        <p class="opacity-75 w-100 py-2 px-3">Some placeholder content i Some placeholder content i Some placeholder content i Some placeholder content i</p>
                        <button type="button" class="btn btn-outline-secondary opacity-25 btn-xs border-0 ">
                            <i class="fas fa-pencil-alt small"></i> </button>
                        </p>
                        <!-- <button type="button" class="btn btn-outline-secondary btn-xs  border-0"><i class="fas fa-arrows-alt text-secondary opacity-25"></i></button> -->
                        <button type="button" class="btn btn-outline-secondary btn-xs border-0"> <i class="fas fa-clock "></i> </button>
                        <select class="form-select-xs mx-1 border-0 mb-0 opacity-75 d-none" name="" id="">
                            <option selected>20</option>
                            <option value="">1hr</option>
                            <option value="">1.5hr</option>
                            <option value="">3hrs</option>
                        </select>
                        <button type="button" class="btn btn-outline-secondary btn-xs border-0"> <i class="fas fa-check "></i> </button>
                    </div>
                </div>
            </div>
            <div class="row  my-2">
                <div class="col-lg-6 col-lg-offset-3 col-xs-12">
                    <small class="opacity-50 text-nowrap">12:30</small>
                    <div class="d-flex align-items-start shadow-sm bg-body height-1 bg-warning-subtle overflow-hidden">
                        <p class="opacity-75 w-100 py-2 px-3">Some placeholder content..</p>
                        <button type="button" class="btn btn-outline-secondary opacity-25 btn-xs border-0 ">
                            <i class="fas fa-pencil-alt small"></i> </button>
                        </p>
                        <!-- <button type="button" class="btn btn-outline-secondary btn-xs  border-0"><i class="fas fa-arrows-alt text-secondary opacity-25"></i></button> -->
                        <button type="button" class="btn btn-outline-secondary btn-xs border-0"> <i class="fas fa-clock "></i> </button>
                        <select class="form-select-xs mx-1 border-0 mb-0 opacity-75 d-none" name="" id="">
                            <option selected>20</option>
                            <option value="">1hr</option>
                            <option value="">1.5hr</option>
                            <option value="">3hrs</option>
                        </select>
                        <button type="button" class="btn btn-outline-secondary btn-xs border-0"> <i class="fas fa-check "></i> </button>
                    </div>
                </div>
            </div>

            <!-- <div class="b-example-divider col-lg-8"></div> -->
            <div class="row my-2 d-none">
                <div class="col-lg-6 col-lg-offset-2 col-xs-12">
                    <div class="d-flex flex-column flex-md-row gap-4 py-md-5 align-items-center justify-content-center border-1 rounded-0 ">
                        <div class="list-group shadow-sm">
                            <div href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3 border-radia rounded-0" aria-current="true">
                                <div class="d-flex gap-2 w-100 justify-content-between">
                                    <div>
                                        <h6 class="mb-0">List group item heading</h6>
                                        <p class="mb-0 opacity-75">Some placeholder content in a paragraph.</p>
                                    </div>
                                    <small class="opacity-50 text-nowrap">now</small>
                                </div>
                            </div>
                            <div href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                                <div class="d-flex gap-2 w-100 justify-content-between">
                                    <div>
                                        <h6 class="mb-0">Another title here</h6>
                                        <p class="mb-0 opacity-75">Some placeholder content in a paragraph that goes a little longer so it wraps to a new line.</p>
                                    </div>
                                    <small class="opacity-50 text-nowrap">3d</small>
                                </div>
                            </div>
                            <div href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                                <div class="d-flex gap-2 w-100 justify-content-between">
                                    <div>
                                        <h6 class="mb-0">Third heading</h6>
                                        <p class="mb-0 opacity-75">Some placeholder content in a paragraph.</p>
                                    </div>
                                    <small class="opacity-50 text-nowrap">1w</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row  my-2">
                <div class="col-lg-12 col-lg-offset-2 col-xs-12  h-25">
                    <small class="opacity-50 text-nowrap">08:30</small>
                    <div class="d-flex justify-content-between  align-items-end shadow-sm bg-body p-3 ">

                        <!-- <button type="button" class="btn btn-outline-secondary btn-xs  border-0"> <i class="fas fa-arrows-alt"></i> </button> -->
                        <button type="button" class="btn btn-outline-secondary btn-xs  border-0"> <i class="fas fa-plus "></i> </button>

                    </div>
                </div>
            </div>
            <div class="example-divider" style="height:200px;"></div>
        </main>

        <!-- Include Bootstrap JS and its dependencies -->
        <!-- <script src="{{ asset('js/jquery.min.js') }}"></script>
    <script src="{{ asset('js/popper.min.js') }}"></script> -->
        <script src="{{ asset('js/bootstrap.min.js') }}"></script>

        <!-- <script src="{{ mix('js/App.js') }}"></script> -->

</body>

</html>