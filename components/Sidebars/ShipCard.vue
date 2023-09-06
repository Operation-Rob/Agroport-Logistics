<template>
<li>{{ shipName }}</li>
</template>

<script lang="ts">
export default {
name: 'ShipCard',
props: {
    shipName: {
    type: String,
    required: true
    }
}
}
</script>

<style></style>  