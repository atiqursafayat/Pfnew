<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	let className: string = '';
	export { className as class };
	export let variant: 'solid' | 'outlined' = 'solid';

	interface $$Props extends HTMLButtonAttributes {
		class?: string;
		variant?: 'solid' | 'outlined';
	}
</script>

<button
	{...$$restProps}
	on:click
	class={twMerge(
		'focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none',
		'font-bold transition-colors',
		variant === 'solid' && 'text-white bg-indigo-700 hover:bg-indigo-800',
		variant === 'outlined' &&
			'text-indigo-700 border border-indigo-700 bg-transparent hover:border-indigo-800 hover:text-indigo-800',
		className
	)}><slot /></button
>
