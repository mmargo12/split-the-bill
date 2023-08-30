<template>
    <div class="container">
        <h1 class="title">Split the bill</h1>
        <p class="text">To use with friends
            <font-awesome-icon icon="fa-regular fa-face-smile" />
        </p>
        <router-link to="/guests">
            <BButton class="btn btn-start">Start</BButton>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'AppStart'
}
</script>

<style scoped lang="scss">
@import "../styles.scss";

.container {
    width: auto;
    text-align: center;
    min-height: 650px;
    max-width: inherit;
    display: flex;
    justify-content: center;
    gap: 5px;
    flex-direction: column;
    background-color: #ffe7d5;
    color: #d27054;
    border-radius: 30px;
}

.btn-start {
    margin: auto;
    width: 300px;
    height: 70px;
    font-size: 28px;
    border-radius: 20px;
    border: 10px solid #feb1aa;
}

.title {
    font-weight: 700;
}

.text {
    font-size: 16px;
}
</style>