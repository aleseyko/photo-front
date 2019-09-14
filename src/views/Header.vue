<template>
    <div>
        <ul>
            <li v-bind:key="links" v-for="links in elements">
                <a :href="link">{{text}}</a>
            </li>
        </ul>
    </div>
</template>
<script>
    import Map from "../components/Map";

    export default {
        components: {Map},
        data() {
            return {
                elements: {
                    links: {
                        link: 'google.com',
                        text: 'Site'
                    }
                }
            }
        }
    }
</script>
<style>

</style>