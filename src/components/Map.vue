<template>

</template>

<script>
    export default {
        name: "Map",
        props: {
            locations: Array,
            msg: String,
            multiply: Function,
        },
        data() {
            return {
                switchValue: false,
            }
        },
        methods: {
            handleChange(a) {
                console.log(a);
            }
        }
    }
</script>

<style scoped>

</style>