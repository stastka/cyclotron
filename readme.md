# jquery.cyclotron.js ([Sample](https://stastka.ch/0xc9f44d74))

## New
- **Touch & Drag Support:** Works seamlessly on both desktop (mouse) and mobile/tablet devices (touch events).
- **Inertia Effect:** Provides smooth deceleration when dragged and released.
- **Modern Overlay Hint:** Includes a sleek, glassmorphism-style instruction badge centered over the panorama that automatically fades out on interaction.
- **Multilingual Support:** Easy localization for instructions (English, German, Czech, Japanes

## 1. You need some element with a background image. E.g.:

```html
<div class="cycle" style="background:url(panorama.jpg);height:512px"></div>
```

## 2. Cyclotronify:

```javascript
$(document).ready(function ($) {
	$('.cycle').cyclotron();
});

```
## 3. CSS Style
```css
.cycle {
    touch-action: none;
    -webkit-user-select: none;
    user-select: none;
}
```


## 4. Options:

`dampingFactor` - should be somewhere around 0.9, should be > 0 and < 1 (default: 0.93)

`historySize` - size of the array which stores the deltas (default: 5)
