<script>
  import Cropper from 'svelte-easy-crop'

  let image = '/images/dog.jpeg'
  let crop = { x: 0, y: 0 }
  let zoom = 1
</script>

<Cropper
 {image}
 bind:crop
 bind:zoom
 on:cropcomplete={e => console.log(e.detail)}
/>