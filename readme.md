<div align="center"> 

:soccer::soccer:
# AUFC MasterMind
:soccer::soccer:

[Direct Link to Game](https://ewotoolejc.github.io/MasterMind-Proj-1/)
</div>

-----

MasterMind is "code breaker" or sequence guessing challenge using colored "pegs" on a board that is 4 pegs across and can be up to 12 guesses long. This version uses 6 color options stemming from Atlanta United FC colors and 6 rows in which to make guesses. Also, this version allows for multiples of colors (typically a house rule setup in person). The game will begin right away because as soon as the page loads, the algorithm will fire off a randomly generated sequence for the player to guess.

A player will then:
1. Select a color in the beginning bottom row for all four "pegs".
2. Upon making all selections and leaving none "white"/blank, they will click the "Enter" button to have their guess checked.
3. One of three things will be returned by the system: 
    - An un-highlighted peg, which means there was no match in color or sequence to the answer.
    - A yellow highlight/border to indicate the color is included in the answer but not in that sequence.
    - A green highlight/border to indicate both the color and sequence are correct.
4. The player will not be able to select any pegs above the current row in play.
5. The player has up to 6 guesses or the game is over and a message indicating as such will be rendered.
------------------

<div align="center">

## Gameplay Screenshots

</div>

Initial Game play:
![Initial Screen](https://i.imgur.com/uSppwPL.jpg)

Guess Screen:
![Guess Screen](https://i.imgur.com/TIVA5lH.jpg)

Win Screen:
![Win Screen](https://i.imgur.com/dWrmIQZ.jpg)

Loss Screen:
![Loss Screen](https://i.imgur.com/n6hNxs6.jpg)

----

<div align="center">

:desktop_computer: :desktop_computer: :desktop_computer:
## Technologies Used
:keyboard: :keyboard: :keyboard:


![HTML5](https://img.shields.io/badge/-HTML5-05122A?style=flat&logo=html5)
  ![CSS3](https://img.shields.io/badge/-CSS-05122A?style=flat&logo=css3)
  ![Github](https://img.shields.io/badge/-GitHub-05122A?style=flat&logo=github)
  ![VSCode](https://img.shields.io/badge/-VS_Code-05122A?style=flat&logo=visualstudio)
   ![JavaScript](https://img.shields.io/badge/-JavaScript-05122A?style=flat&logo=javascript)

</div>

---------

<div align="center">

:ice_cube: :package: :ice_cube: 
## Icebox Items

</div>

- Locking the already selected row(s)
- More flexible by screen size (Didn't start with an MFD approach or build with flexible params everywhere)
- Other CSS elements don't do exactly what I had intended
