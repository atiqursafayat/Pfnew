<script lang="ts">
	import Cropper from 'svelte-easy-crop';
	import getCroppedImg from '../utils/crop';
	import Button from '../components/Button.svelte';
	import InputFile from '../components/InputFile.svelte';
	import Link from '../components/Link.svelte';
	import BranchOption from '../components/BranchOption.svelte';
	import { Branch } from '$lib/constants/branch';

	let image = '';
	let croppedImage = '';
	let crop = { x: 0, y: 0 };
	let zoom = 1;
	let files: FileList;
	let pixelCrop = { x: 0, y: 0, width: 0, height: 0 };
	let previewImage: string;
	let branch: Branch = Branch.PROGRAMMING;

	// Update the image data when a new file is selected
	function onFileSelected() {
		if (files && files[0]) {
			const reader = new FileReader();
			reader.readAsDataURL(files[0]);
			reader.onload = () => {
				image = reader.result as string;
			};
			croppedImage = '';
		}
	}

	async function previewCrop(e: CustomEvent) {
		pixelCrop = e.detail.pixels;
		const newImage = await getCroppedImg(image, pixelCrop, branch);
		if (newImage) {
			previewImage = newImage;
		}
	}

	async function cropImage() {
		const newImage = await getCroppedImg(image, pixelCrop, branch);
		if (newImage) croppedImage = newImage;
	}
</script>

<main class="flex flex-col items-center justify-center w-full h-full gap-8 p-4 mt-10">
	<h1 class="font-bold text-4xl">Profile Framing</h1>
	<div class="flex flex-col gap-2">
		<BranchOption bind:value={branch} />
		<InputFile id="file" type="file" accept="image/*" bind:files on:change={onFileSelected} />
	</div>
	{#if image && !croppedImage}
		<Cropper {image} bind:crop bind:zoom on:cropcomplete={previewCrop} aspect={1} />
		<div class="absolute bottom-4 z-50">
			<Button on:click={cropImage}>Crop Image</Button>
		</div>
	{/if}

	<!-- {#if image && !croppedImage}
		<h2>Preview</h2>
		<div class="h-[400px] w-[400px] relative border-2 border-slate-500 overflow-hidden">
			<img class="prof-pic" src={previewImage} alt="Profile example" />
		</div>
	{/if} -->

	{#if croppedImage}
		<div class="flex flex-col gap-3 items-center">
			<h1 class="font-bold text-4xl text-center">Result</h1>
			<div class="border-2 border-slate-500">
				<img src={croppedImage} alt="Cropped profile" />
			</div>
			<Link href={croppedImage} download="profile.png" class="w-full text-center">Download</Link>
		</div>
	{/if}
</main>
