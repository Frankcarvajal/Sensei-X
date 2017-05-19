# Sensei-X

## Overview

Learn Japanese through spaced repetition in a simple and fun way.

### Front-end 

Technologies: React, Redux
Two pages: Splash page and spaced repetition page

Spaced repetition page:
Displays current word
Text input for answer
Notifies the user whether they were correct or incorrect
Displays a count of how many questions were answered correctly, tracking this data
Displays Users github data & score

### Back-end

Technologies: Node.js, Express, MongoDB, Passport, OAuth

Allow users to register/login using GitHub OAuth
Use the spaced repetition algorithm to generate the next word pair
Pairs of words are stored in a our Mongo database along with difficulty level
Using a queue of questions for an MVP
Store whatever information is needed for the algorithm about the user's answer history
