<template>
    <div class="container">
        <h1 class="title">Result</h1>
        <div class="empty" v-if="!hasAllInfo">
            <h2>It's empty...</h2>
            <h4>Let's add more info</h4>
            <font-awesome-icon icon="fa-regular fa-face-smile" size="xl"/>
        </div>
        <div class="result" v-else>
            <div v-for="(person) in result" :key="person.id">
                <p>{{ person.name }} owse {{ person.money }} to {{ person.whom }}</p>
            </div>
        </div>
        <router-link to="/food">
            <BButton class="btn btn-info">
                    <font-awesome-icon icon="fa-solid fa-arrow-left" /> Previous
            </BButton>
        </router-link>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
    name: 'AppResult',
    computed: {
        ...mapState([
        'food', 'guests', 'result'
        ]),
        ...mapGetters([
            'hasAllInfo'
        ])
    }
}
</script>

<style scoped lang="scss">
@import "../styles.scss";

.result {
    color: #e47152;
    background-color: #fee0d8;
    border-radius: 20px;
    padding: 10px;
    margin: 10px 0;
    font-size: 20px;
}
</style>