## Redux

Global state would contain the set of all scene objects, plus the position of the camera. Render on the top-level
component would look through all the scene objects, decide which ones are in view, and add appropriate components
for them, setting a "scale" and "position" property to direct the component how and where to display itself.

The global state will define, for each scene object, an object that includes it's global position in XYZ space,
and a render function. The Render function takes a React module and a props object as it's argument, as can use
React's methods to render a React shadow DOM representation of the object, based on the props. The top-level
component will create wrapper components for each of these that are in view, and the wrapper component
calls the provided render function with appropriate arguments as it's render method.

The global state might be an R-tree or something similar to make it quicker to figure out what objects are in view
at a given time.
