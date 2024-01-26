# V1.7.7:

A drag and drop todo app with visually adjustable time slots to fill an 8 hour day.

-   # Backend

    -   # Configuration

        -   ### Setup
            -   [x] Install laravel + React scaffolding
            -   [x] webpack.mix.js
            -   package.json
                -   [x] remove module for webpack mix
            -   [x] Allow src mapping for debug
            -   [x] Setup database
            -   [x] config build

    -   ## API
        -   [x] Data structure
        -   [x] User tables relationships and retrieval
        -   [x] Seeder
            -   [x] Generate some dummy data
        -   [x] Define routes (additional)
        -   [x] Commit Minimum build
        -   [x] Soft delete
        -   [x] Fetch boxes by day

---

-   # Front End

    -   ## Wireframe HTML

        -   [x] Responsive fluiid header
        -   [x] Layout Mobile
        -   [x] Layout Tablet
        -   [x] Layout Desktop
        -   [x] Center col-8 on login and register

    -   ## Router
        - [] Demo
        -   [x] Login
        -   [x] Registr
        -   [x] Profile
        -   [x] Signup

    -   ## Header
            - [ ] Login button when logged out
              - [x] Icons profile
              - [x] Icons logout
              - [ ] Center calendar icon or add drop down menu on right icon
            - [ ] Home icon logic
    -   ## Box App
        -   BUG [x] Check and fix, Item id hack for prod

    -   ## Demo Page or Swtich
         - [x] Route / as TimeboxDemoController if not authed
            - used proxy controller but better use middleware 
        -  [] Route 
        -  [ ] First time welcome and notification  

    -   ## New Box

        -   [x] Should be plus icon (tick is confussing)
        -   [x] Close
        -   [x] Center Button
        -   [x] Submit validation
        -   [x] Empty slot on click
        -   [x] Duration
        -   [x] Start is based on todays day
        -   [x] Adjust start time on drop addBox / or prevent drag ?
                its related to seems to default to current day
        -   [x] Start needs to retain its value in form
        -   [x] Duration Can be reduced to 30mins
        -   [x] requires passing up duration and recalculate height before dispatching.
        -   [x] Dispatch only on submit Same for status color
            -   Status:
                -   [x] Test statuses x4
                        Doing: - Blue
                        Todo: - Future Amber, - Current Blue - Past: Red
                -   Done
                    -   green,
        -   [x] Rag status styling basic func

    -   ## Update Box
        -   [x] Form inputs squashed
        -   BUG [x] Duration being set to null and or not on delete
        -   BUG [x] start undefined on box 16
            -   Add box second from last make it 1 hour
            -   Repro Steps:
                -   Create a box second to last as 2 hours then increase or reduce.
        -   [x] Update text button press
        -   ~~on keypress sleep ? ~~
        - BUG [ ] Reducing box size seems to add a new box in between next placeholder
        -   Remember:
            -   that when in this update flow its unlikeyl many api call will be required (levarage this)
        -   [x] Center height color text size so its not jumping around
            -   Auto updating here is only required to adjust height and color
        -   [x] Update text area and form in general a bit squashed (minimix duration input width)
        -   [x] Style select s height affecting duration on select ? In all scenarios ?

        -   BUG [x] Is height affecting duration on select ? In all scenarios ?
        -   [x] Update Funcionality for duration and status
        -   BUG [x] Interactions here are the only way of updating next freePlaceholders. If we update another element the duration options are not updated
        -   [x] Start needs to retain its value in form
        -   [x] Need to adjust heights of boxes x30,x60,x90,x120
        -   Sanitization on duration
        -   [x] Manage placeholders splice pattern over the difference in duration - / + loop

        -   [x] Cannot read properties of start

            -   [x] Todo item must not overlap next todo item
                -   [x] Next free slots util()
                -   Its possible a feature would be to replace a free slot at some other point in the day (less intuitive & more complex)
            -   [x] Duration can be reduced to 30mins
            -   [x] Dont allow todo box to extend beyond the end of the day

        -   [x] Reset time on drop
        -   [x] Time allocation logic
        -   [x] Http client
        -   [x] If box height > 60 then move txt area down to occupie all that space

    -   ## Box Tab

        -   [x] Duration tap Feature
        -   [x] Status tap Feature

    -   ## Select nHours

        -   [] Store nHours redux
        
    -   ## Select Day
        - [ ] Needs to redirect to /
        -   BUG [x] Moving back and forward (after an item creation) reutrns `same key, 5. Keys should be unique` Solved by removing setDate dispatch on, also solved by adjusting boxes begore managing

    -   ## Select Calendar

        -   [x] Hover on select calendar
        -   BUG [ ] Select calendar when choosing in future defaults to 00:00
        -   [x] Center this button
        -   [x] Calendar should match design
        -   BUG [x] Doesnt retain highlighted correct date

        -   [x] Could do with finger hover .5
        -   BUG [x] Start time not merging correctly
            -   removed setStartDate() dispatch
        -   [x] Date picker
        -   [x] Set current date only
        -   [x] Calendar Select Component

    -   ## Select Hour

        -   [x] Set start hour just always do boxes of 8
        -   [x] Select duration of day

    -   ## Redux

        -   [ ] Do batch update
        -   [x] lastTotalToRemove: this needs to be grouped by day ? stack ?
        -   [x] lastUpdatedIndex: this needs to be updated
        -   [x] Basic crud slice methods
        -   [x] Get Id back from createBox api
        -   [x] Dispatch settIntialBoxes and set state in redux!
        -   [x] After fetch will require a mergeBoxes
        -   [x] Empty placeholder click needs to add
        -   [x] On duration reduction need to add back placeholders based on next placeholders
        -   [x] Check box is on 30 min intervals no 35mins

    -   ## Overview Daily List

        -   BUG [x] Dragging to top will cause all times to reset from dragged start point

        -   [x] Boxes should be uniform cmponent or markup getting too many differing results

        -   [x] RAG Status testing
        -   BUG [x] Two children same key
            -   removed startDate Dispatch
            -   [x] Add box on p2 p3 causes issues could not create
        -   BUG [x] Add box after drag creates two new items (one in place and anothre at its original index)
            -   Pass index to addBox
        -   [x] Old todo should be red
        -   [x] Fresh after laravel seed placeholders seems to add extra as if last total to remove is not being respected ?
        -   [x] Manage placeholders removes too many boxes if theres no next todo item 60 mins
        -   manage placeholders and its order
        -   [x] 30 min interavals daily background
        -   BUG [x] : when moving a box the time updates but does not respect the day
        -   [x] Moving box time does not correctly update the number of boxes
        -   BUG [X] when theres an empty element at the start of the day ?
        -   [x] Simply remove outline on empty boxes its not necesary
            -   To give the illusion of a large free box
        -   [x] Duration of an item needs to affect the number of boxes
        -   [x] Needs to run on everytime duration changes, new and update and read
        -   on change startTime / startDate order the boxes
        -   [x] Fix front end input to Y-m-d H:i:s for placeholders
        -   [x] Send / Receieve a start time
        -   [x] startDateTime / dueDateTime db
        -   [x] Set start time by index
        -   [x] Leaner addToStack
        -   [] refactor: stack.boxes.box ()
        -   [x] Need a way to close a box incase you accidentally open it which is likely to happen for new users
        -   [x] CSS Basic for debug 30 mins / 4 hrs
        -   [x] Fix overtime line
        -   [x] Generic Time handling utils
        -   [x] Box tab - Collapsed tab allows, Provides an over view but is made to
                be dragged and dropped
        -   [x] Sort timeline by hour rather than order
        -   [x] Separate timeline day
        -   [x] Adding two items of 1.5 + 2hrs limits the total number of boxes but too much ?
        -   [x] Add Box duration options need to implement sanitization
        -   BUG [x] Adding item and end then begging increases the number of slots
        -   BUG [x] Adding an item thats start is beyond the end of the day seemingly box is not created but removed
        -   [x] Adjust start times on delete of all replaced
        -   [x] Height of box is based on duration
        -   [x] 100% height divided by 16 ?
        -   [x] refactor time-utils to generic function taking format as param
        -   [x] Apply a height as duration

    -   ## Box Utils

        -   [x] Generic single add box instead of initializing a whole
                array

    -   ## Profile

            - [x] hello msg
            - [x] Delete with 2 step confirm

    -   ## Delete Button

        -   [x] Removing item must add a placeholder
        -   BUG [x] Resets times to 00:00 on remove first item ?

    -   ## Auth

        -   [x] 2fa
        -   [x] Delete ACC
        -   [x] Delete acc 2 step
        -   [x] Forgot password
        -   [ ] Logout needs t refresh home page to demo
        -   [x] Confirmed password
        -   [x] Refresh form reset.form() on auth form switch
        -   [x] Confirmed password nicer feedback ux
        -   [x] Container cmp for box to avoid nesting

    -   ## ReDesign Markup
            -   [x] Branch of timeline-ui bootstrap
            -   Design Elements
            -   [x] Box Card group with a shadow
            -   [x] Empty Box card
            -   [x] icons x4
            -   [x] Weekly ? or Alternative design for select day ? ulitmately
            -   [x] empty boxes (Removal of outline on )
            -   [x] Update Funcionality
                -   Popup sticky modal for editing ?
            -   [x] new branch of timeline-ui
            -   [x] Daily Timeline wrapper ? Shorten
            -   [x] Design Route for static dev switch

            -   [x] Mix Setup
            -   [x] Scss mix live integration test
            -   [x] 7 - 1 styleheet

        -   [x] bs implementation

            -   list group
            -   [x] Step 1: User research. Todo lists / Calendars / Jira /
            -   [] Step 2: Define objectives.
                -   Sortable
                -   Adjustable time slots
            -   [x] Step 3: Wireframing.

        -  [] 15 / Placeholders mins

    -   ## Notifications to ui

        -   [x] Success
        -   [x] Error
        -   [x] Warning

---

## Testing

-   [] Unit
-   [] Feature
-   [] Integration

    Mocks:

    -   [] Select day -> returns 16 boxes
    -   [] Add a box -> returns updated box
    -   [x] Add box [duration] -> 90 mins 13 boxes
    -   [] Update duration removes placeholders of next neighbour boxes
    -   [] Drag and drop updates start time
    -   [] Drag and drop does not add or remove boxes

-   ## [] Acceptance

---

## Bugs

-   [x] Your requirements could not be resolved to an installable set of packages.
    -   To enable extensions, verify that they are enabled in your .ini files:
        -   Enable fileinfo
-   [x] peer vite@"^3.0.0" from @vitejs/plugin-react@2.2.0 - npm install vite@3

-   [ ] There is a strictmode fix !! see original logrocket blog  
         [Adding Drag and Drop Functionality with React Beautiful DND](https://blog.logrocket.com/adding-drag-and-drop-functionality-with-react-beautiful-dnd/)

## Milestones

-   [x] Core Concept
-   [x] 2.0 Features
-   [x] Demo Web
-   [] User funcionality
-   [] and full launch
-   [] Testing and user feedback
