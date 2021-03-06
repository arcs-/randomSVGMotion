randomSVGMotion
=====================
![Example Picture](https://stillhart.biz/project/randomSVGMotion/banner.jpg)

## Introduction
randomSVGMotion will animte SVGs points and create some interesting effect,
with minimal file size.

- [Live project](https://stillhart.biz/)
- [Demo](https://stillhart.biz/project/randomSVGMotion/)


### Help
Please don't hesitate to contact me with any questions!


##Usage

###Including files
You need JQuerry and the plugin it self
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script type=text/javascript src=js/jquery.randomSVGMotion.min.js></script>
```

###Required HTML structure
You need a picture, something like this:

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 929 500" id=back>
	<g>
		<circle id="R0"  stroke="#888888" r="3.6" cy="188" cx="477" stroke-width="5" fill="#7f7f7f"/>
		<circle id="R1"  stroke="#888888" r="3.6" cy="233" cx="288" stroke-width="5" fill="#7f7f7f"/>
		<circle id="R2"  stroke="#888888" r="3.6" cy="135" cx="89" stroke-width="5"  fill="#7f7f7f"/>
	  
		<line id="R0_R1" stroke="#888888" y2="233" x2="288" y1="188" x1="477"  />
		<line id="R1_R2" stroke="#888888" y2="233" x2="288" y1="135" x1="89" />
		<line id="R2_C0" stroke="#888888" y2="188" x2="477" y1="135" x1="89" />

		<circle id="hR0" stroke="#888888" r="8.9" cy="188" cx="477" fill="#7f7f7f" fill-opacity="0"/>
		<circle id="hR2" stroke="#888888" r="8.9" cy="135" cx="89"  fill="#7f7f7f" fill-opacity="0"/>
	</g>
</svg>
```


###Initialization

```javascript
	$('id').randomSVGMotion({
    // options
	});
```


###Options
- `start`: (optional | default: point in svg tag) Set the centre fot the point to move around

- `points`: (optional | default:  ['cx', 'cy'] (for a circle)) The the of the values to affect

- `size`: (optional | default: 100) The area size to move in

- `speed`: (optional | default: 0.2) Pixels to move in a certin time

- `additional`: (optional | no default) Other points that are associated with this point

 - structure: `[" id "," x tag name "," y tag name "]`
 - e.g. `["#R2_C0","x2","y2"]`


###Example
A complete example can be found in index.html
```javascript
	$('#R0').randomSVGMotion({
		"start": [700,50],
		"size": 70,
		"speed": 0.5,
		"additional": [ ["#R2_C0","x2","y2"] , ["#R0_R1","x1","y1"] , ["#hR0","cx","cy"] ]
	});
	
	$('#R1').randomSVGMotion({
		"size": 30,
		"speed": 0.1,
		"additional": [ ["#R1_R2","x2","y2"] , ["#R0_R1","x2","y2"] ]
	});
```

##License
The MIT License (MIT)

Copyright (c) 2014 Patrick Stillhart

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
