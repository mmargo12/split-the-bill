<template>
    <div class="container">
        <h1 class="title">Food</h1>
        <BButton class="btn" @click="onClickAddFood">
            Add food
        </BButton>
        <div class="empty" v-if="!hasFood">
            <h2>It's empty...</h2>
            <h4>Let's add something</h4>
            <font-awesome-icon icon="fa-regular fa-face-smile" size="xl"/>
        </div>
        <div v-else>
            <div class="form-group food-form form animate__animated animate__zoomIn" 
                 v-for="(dish, index) in food"
                 :key="dish.id"
            >
                <label>{{ index + 1 }}.</label>
                <BFormInput 
                    type="text" 
                    class="form-control input-name" 
                    :id="dish.id" 
                    :model-value="dish.title"
                    @input="e => updateFoodTitle(index, e)"
                    placeholder="Title" 
                />
                <BButton class="btn btn-delete" @click="onClickDeleteFood(index)">
                    <font-awesome-icon icon="fa-regular fa-trash-can" style="color: #FE9F84;" size="xl"/>
                </BButton>
                <BFormInput 
                    class="input-price" 
                    type="number" 
                    :model-value="dish.price"
                    @input="e => updateFoodPrice(index, e)"
                    placeholder="Price" 
                />
                <select 
                    class="input-paying" 
                    :value="dish.paying"
                    @change="e => updateFoodPaying(index, e)"
                >
                    <option value="" disabled selected>
                        Select who's paying
                    </option>
                    <option 
                        v-for="(guest) in guests" 
                        :key="guest.id" 
                        :value="guest.name"
                        >
                        {{ guest.name }}
                    </option>
                </select>
                <p class="text">Select who's eating</p>
                <label 
                    class="label" 
                    v-for="(guest) in guests" 
                    :key="guest.id"
                >
                    <input 
                        type="checkbox" 
                        :name="guest.name + dish.id" 
                        :id="`${guest.name}${dish.id}`" 
                        :value="{name: guest.name, food: dish.id}"
                        @change="sendArrToFood()" 
                        v-model="selected"
                    /> 
                        {{ guest.name }}
                </label>
            </div>
            <router-link to="/guests">
                <BButton class="btn btn-info">
                    <font-awesome-icon icon="fa-solid fa-arrow-left" /> Previous
                </BButton>
            </router-link>
            <router-link :to="isFoodEmpty ? '' : '/result'">
                <BButton 
                    class="btn btn-info" 
                    @click="onClickCalcResult" 
                    :disabled="isFoodEmpty"
                >
                    Next <font-awesome-icon icon="fa-solid fa-arrow-right" />
                </BButton>
            </router-link>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
    name: 'AppFood',
    data() {
        return {
            selected: []
        }
    },
    computed: {
        ...mapState([
            'guests', 'food'
        ]),
        ...mapGetters([
            'hasFood', 'isFoodEmpty'
        ])
    },
    methods: {
        ...mapActions({
            onClickAddFood: 'addFood',
            onClickDeleteFood: 'deleteFood',
            onClickCalcResult: 'calcResult'
        }),
        sendArrToFood() {
            for( let i = 0; i < this.food.length;i++) {
                this.$store.dispatch('resetFoodEating', i )
            }
            for (let i = 0; i < this.selected.length; i++) { 
                let name = this.selected[i].name             
                let dish = this.selected[i].food            
                for (let j = 0; j < this.food.length; j++) { 
                    if (dish === this.food[j].id) {           
                        if (this.food[j].eating.indexOf(name) === -1) { 
                            this.$store.dispatch('pushEatingName', {value: name, index: j} )       
                        }
                    }
                }
            }
        },
        updateFoodTitle(index, event) {
            this.$store.dispatch('updateFoodTitle', {value: event, index} )
        },
        updateFoodPrice(index, event) {
            this.$store.dispatch('updateFoodPrice', {value: event, index} )
        },
        updateFoodPaying(index, event) {
            this.$store.dispatch('updateFoodPaying', {value: event.target.value, index})
        }
    },
    mounted() {
        for (let i = 0; i < this.food.length; i++) {
            if (this.food[i].eating.length) {
                for (let j = 0; j < this.food[i].eating.length; j++) {
                    this.selected.push({
                        name: this.food[i].eating[j],
                        food: this.food[i].id
                    })
                }
            }
        }
    }
}
</script>

<style scoped lang="scss">
@import "../styles.scss";

.food-form {
    gap: 7px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}

.input {
    &-price {
        height: 30px;
        padding: 6px 12px;
        font-size: 14px;
        margin-left: 19px;
        color: #d27054;
        min-width: 200px;
        max-width: 235px;
    }

    &-paying {
        height: 30px;
        padding: 6px 12px;
        font-size: 14px;
        background-color: #fdf7f5;
        border: 2px solid #FE9F84;
        border-radius: 4px;
        color: #d27054;
        min-width: 200px;
        max-width: 235px;
    }

    &-name {
        max-width: 430px;
        color: #d27054;
    }
}

.label {
    font-weight: 400;
    margin: 0;
}

.text {
    margin: 0;
    margin-left: 19px;
    text-decoration: underline;
}
</style>