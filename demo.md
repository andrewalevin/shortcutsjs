<style>
	@import url("/utils/css/bootstrap-grid.css");
	@import url("/utils/css/iframe-youtube.css");
</style>



# What to do

Some descriptiption text


### Impact

Starting

[shortcut]

https://www.youtube.com/watch?v=TUJmSgViGoM

https://www.youtube.com/watch?v=od5M5g42SSs Waltzes

https://www.youtube.com/watch?v=nGdFHJXciAQ Vivaldi - Four Seasons (Winter)

[/shortcut]

Additions

[shortcut]

https://www.youtube.com/watch?v=Uk1-NT91llM Беспилотный мир

https://www.youtube.com/watch?v=DknPnrAhzgk Тбилиси. Исани. Если ночью захотелось мороженое с шоколадом и карамелью.

[/shortcut]

Final

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



<script src="shortcutsjs.js"></script>

