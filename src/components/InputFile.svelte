<script lang="ts">
	import clsx from 'clsx';
	import type { ChangeEventHandler, HTMLInputAttributes } from 'svelte/elements';

	export let id: string;
	export let files: FileList;
	export let label: string = '';

	interface $$Props extends HTMLInputAttributes {
		id: string;
		files: FileList;
		label?: string;
		change?: ChangeEventHandler<HTMLInputElement>;
	}

	let input: HTMLInputElement;
</script>

<div>
	<div class="flex flex-col w-full gap-1">
		{#if label}
			<label
				for={id}
				class={clsx(
					$$restProps.required && "after:content-['*'] after:text-red-500 after:ml-1 align-middle"
				)}>{label}</label
			>
		{/if}
		<div class={clsx('hover:border-blue-400', 'focus-within:border-blue-400', 'transition-colors')}>
			<input
				{id}
				name={id}
				type="file"
				class={clsx(
					'block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none',
					'file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4',
					'hover:border-blue-400 focus-within:border-blue-400 transition-colors'
				)}
				bind:files
				bind:this={input}
				on:change
				{...$$restProps}
			/>
		</div>
	</div>
</div>

<style></style>
