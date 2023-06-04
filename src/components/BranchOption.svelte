<script lang="ts">
	import clsx from 'clsx';
	import type { HTMLSelectAttributes } from 'svelte/elements';

	let className: string = '';
	export { className as class };
	export let value: string = '';

	interface $$Props extends HTMLSelectAttributes {
		class?: string;
	}

	let select: HTMLSelectElement;
</script>

<select
	{...$$restProps}
	bind:value
	on:change
	class={clsx(
		'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ',
		className
	)}
	bind:this={select}
>
	<option value="MK">Marketing</option>
	<option value="CT">Content</option>
	<option value="PG">Programming</option>
	<option value="DS">Design</option>
</select>
