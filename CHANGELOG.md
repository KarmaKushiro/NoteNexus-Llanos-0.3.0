# Changelog
## [0.3.0] - 07-10-2024 - feature 5
### Added
- Created `ProtectedRoute.js` which protects the use of the full Survey 
- Coded `login.js` and `signup.js` for authorization 
- Made AuthRedirectRoute to handle redirect for authenticated user

### Progress Report
- Basic authentication and route protection are now functional
- Addition of login, signup, and logout 

## [0.2.0] - 07-01-2024 - feature 4 
### Added (Grant)
- Created `SongModel.js` and `GenreModel.js` for separate Parse queries.
- Updated `Main.js` get async data for songs, genres, and users.
- Added `SongsList.js` and `GenresList.js` components to render lists of songs and genres similarly to `MainList.js`.
- Added `parse` initialization in `App.js` and `enviroemtns.js`.
### Added (JP)
- File Structure/Organization
- Transferring from HTML to React for all files
- Routing for Home and Header are added as well as `Navigation.js` which is intended for routing
    - this routing will later be incorporated into the header bar as well as have its own page to function on

### Fixes
- no longer calling for non existent css file in `index.html`.

### Current Problems/Issues
- Genres and Songs won't connect through routing

### Progress Reports
- About, Login and Sign Up are in the works for the next feature

## [0.1.0] - 06-20-2024 - feature 3
### Added
- Initial project creation.