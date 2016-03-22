<img alt='MIST' src='https://github.com/AI428/mist/blob/master/logos/mist.png' width='300'>

# MIST
> _A JavaScript framework for the reactive style_

This is a solution for the development of CSS library.

In order to control CSS, Do you use such heavy weight library of `Angular`, `jQuery` and `React`? With `MIST`, you can define the reactive style without defile the DOM.

## USAGE
### INSTALL
[Get](https://github.com/AI428/mist/releases) the latest version.

```html
<script src=mist.min.js></script>
```

### DEFINE CLASS
Any selector or element style define. The following code is a class that red the elements when you click. It's still non-existent class.

```js
mist('*').on('click').then(

  function() {

    mist('.redden').style.set({

      background: 'red'
    });
  }
);
```

### ADD THIS
Add this class to any selector.

```js
mist('any selector').class.add('redden');
```

So, try red flashes the element to use this class. The following code will flashes at one second intervals.

```js
mist('any selector').class.pulse(1000).toggle('redden');
```

### REMOVE THIS
You can also remove this.

```js
mist('any selector').class.remove('redden');
```

Run after one second, it can also be that.

```js
mist('any selector').class.time(1000).remove('redden');
```

Turn off in one second after you add this class, such as the combination can also. `add()` respond `Promise` that notice the success of the method.

```js
var statement = mist('any selector');

statement.class.add('redden').then(

  function() {

    statement.class.time(1000).remove('redden');
  }
);
```

### REACT TO STYLE
The style, in addition to string, you can pass a function or `Mist`.`Promise` that like Promise / A+.

Function is evaluated just to pass the element. `Mist`.`Promise` in the response value, such as `on()`, is evaluated each time the callback function is called. A combination of these to develop a CSS library. Code to red the elements, it can be rewritten as follows.

```js
mist('.redden').style.set({

  background: mist('*').on('click').then(

    function() {

      return 'red';
    }
  )
});
```

## LICENSE
This is released under the [MIT](//opensource.org/licenses/MIT). © AI428
