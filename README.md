# Intersection Observer Demo

A demonstration of a basic use case of the new Intersection Observer API, contrasted with the equivalent scroll listener implementation. The demo is not at a scale sufficient for the user to visually notice the performance advantage, but still useful for demonstrative purposes. If you dive into the performance tab in browser dev tools, intersection observer should have a ~20ms advantage over the alternative in the test case. 

See the associated [slide deck](http://slides.com/seanbennett-1/intersection-observer-api).

## Usage 

Install packages by running `yarn` in the base directory, then simply run `yarn serve` and navigate to the given address. To fiddle around with the inner workings and see the changes reflected live in real time, run `yarn dev`. 
