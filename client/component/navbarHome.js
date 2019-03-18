

Vue.component('navbar', {
    methods : {
        navigateToProfile() {
            this.$emit('navigate-to-profile')
        },
        logout() {
            localStorage.removeItem('access_token')
            localStorage.removeItem('user')
        }
    },
    props : ['on-main-page'],
    template : `
    <v-layout height="50">
        <v-toolbar
        color="transparent">
            <div class ="profile" @click.prevent="$emit('back-to-home')">
                <img src="https://dewey.tailorbrands.com/production/brand_version_mockup_image/29/1793090029_83029712-e81a-4f6a-8ebe-51b2f07fc200.png?cb=1552701130" height="50">
            </div>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn flat v-if="onMainPage" @click.prevent="$emit('search-category', 'Programming')">Programming</v-btn>
                <v-btn flat v-if="onMainPage" @click.prevent="$emit('search-category', 'Entertaiment')">Entertaiment</v-btn>
                <v-btn flat v-if="onMainPage" @click.prevent="$emit('search-category', 'Sport')">Sports</v-btn>
                <v-avatar elevation="0" class="profile">
                    <v-img contain 
                        src="https://storage.googleapis.com/mini-wp-storage-multer/1550383407423gender-neutral-user.png" 
                        height="50"
                        width="50"
                        @click="navigateToProfile">
                    </v-img>
                </v-avatar>                       
           
            </v-toolbar-items>  
            <v-btn flat onClick="signOut()">
                logout
            </v-btn>
        </v-toolbar>
    </v-layout>
    `
})