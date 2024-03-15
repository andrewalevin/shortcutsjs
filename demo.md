# What to do

Some descriptiption text


### Impact


Text Before shortcut

[shortcut-rows-to-columns]

col-1

col-2

col-3

[/shortcut-rows-to-columns]

Text After shortcut


### Impact in HTML

```html
<p>Text Before shortcut</p>

<p>[shortcut-rows-to-columns]</p>

<p>col-1</p>

<p>col-2</p>

<p>col-3</p>

<p>[/shortcut-rows-to-columns]</p>

<p>Text After shortcut</p>
```


### Effect


```html
<p>Text Before shortcut</p>

<p>
<div class="row">
	<div class="col">
		col-1
	</div>
	<div class="col">
		col-2
	</div>
	<div class="col">
		col-3
	</div>
</div>
</p>

<p>Text After shortcut</p>
```





