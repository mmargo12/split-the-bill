<template>
    <div class="container">
        <h1 class="title">Guests</h1>
        <BButton class="btn" @click="onClickAddGuest">
            Add guest
        </BButton>
        <div class="empty" v-if="!hasGuests">
            <h2>It's empty...</h2>
            <h4>Let's add someone</h4>
            <font-awesome-icon icon="fa-regular fa-face-smile" size="xl" />
        </div>
        <div v-else>
            <div 
                class="form-group form" 
                v-for="(guest, index) in guests" 
                :key="guest.id"
            >
                <div class="guests-input animate__animated animate__zoomIn">
                    <label class="label">
                        {{ index + 1 }}.
                    </label>
                    <BFormInput 
                        type="text" 
                        class="form-control input" 
                        :id="guest.id" 
                        :model-value="guest.name"
                        @input="e => updateGuestName(index, e)"
                    />
                    <BButton 
                        class="btn-delete" 
                        @click="onClickDeleteGuest(index)"
                    >
                        <font-awesome-icon icon="fa-regular fa-trash-can" style="color: #FE9F84;" size="2xl"/>
                    </BButton>
                </div>
            </div>
            <router-link :to="isGuestsEmpty ? '' : '/food'">
                <BButton class="btn" :disabled="isGuestsEmpty">
                    Next <font-awesome-icon icon="fa-solid fa-arrow-right" />
                </BButton>
            </router-link>
        </div>
    </div>
</template>

<script >
import { mapGetters, mapActions, mapState} from 'vuex';

export default {
    name: 'AppGuests',
    data() {
        return {
        }
    },
    computed: {
        ...mapState([
            'guests'
        ]),
        ...mapGetters([
            'hasGuests', 'isGuestsEmpty'
        ]),
        
    },
    methods: {
        ...mapActions({
            onClickAddGuest: 'addGuest',
            onClickDeleteGuest: 'deleteGuest'
        }),
        updateGuestName(index, event) {
            this.$store.dispatch('updateGuestName', {value: event, index} )
        }
    }
}

</script>

<style scoped lang="scss">
@import "../styles.scss";

.guests {
    &-input {
        display: flex;
        align-items: center;
        gap: 7px;
        margin: 10px 0;
        font-weight: bold;
        color: #d27054;
    }
}

.label {
    margin: 0;
}
</style>