### Webfont - Material Design Icons

- Webfont distribution for the Material Design Icons.
### install
`$ npm install @mdi/font`

- Package built with @mdi/font-build.
- Material Design Icons' growing icon collection allows designers and developers targeting various platforms to download icons in the format, color and size they need for any project.
- The webfont is a quick way to integrate the icons into your application.

### Basic Example 

Each icon can be referenced by their name prefixed with mdi-. For instance to get the home icon mdi-home.
### Helper Classes 
Material Design Icons (MDI) contains many helper classes to quickly modify the look of the icons.
1. ### Rotate 
- mdi-rotate-45 - Rotates 45 Degrees.
- mdi-rotate-90 - Rotates 90 Degrees.
- mdi-rotate-135 - Rotates 135 Degrees.
- mdi-rotate-180 - Rotates 180 Degrees.
- mdi-rotate-225 - Rotates 225 Degrees.
- mdi-rotate-270 - Rotates 270 Degrees.
- mdi-rotate-315 - Rotates 315 Degrees.
2. ### Flip
- mdi-flip-h - Flip horizontal.
- mdi-flip-v - Flip vertical.
## Note:-
mdi-flip-* and mdi-rotate-* classes cannot be used on the same element at the same time.
### Sets of Icons (v1.6.80+) 
```html
<!DOCTYPE html>
<html>
    <head>
        <mate charest="utf-8" />
        <title>Hello world!</title>
    </head>
    <body>
        <div class="mdi-set">
    <span class="mdi-star"></span>
    <span class="mdi-star"></span>
    <span class="mdi-star"></span>
    <span class="mdi-star-outline"></span>
    <span class="mdi-star-outline"></span>
</div>
    </body>
</html>
```
### Accessibility 
There are a few aria- attributes that can be added to the icon's tag or the parent's element to make things easier for screen readers.
Decoration Icons 
Many times an icon has text next to it that explains the things. The icon is just for decoration so the screen reader can ignore it.