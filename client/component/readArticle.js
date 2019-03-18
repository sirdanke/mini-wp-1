Vue.component('read-article', {
    props: ['selected-article'],
    methods: {
        navigateToProfile() {
            this.$emit('navigate-to-profile')
        },
        home(){
            this.$emit('back-to-home')
        }
    },
    template: `
        <v-container fluid>
            <v-parallax
                :src="selectedArticle.image">
                <navbar
                    @back-to-home="home"
                    @navigate-to-profile="navigateToProfile">
                </navbar>
                <v-layout align-center fill-height>
                    <v-flex xs8 offset-xs2 text-md-left>
                        <div>
                            <p class=" custom subheading font-weight-thin dark mb-3">{{new Date(selectedArticle.createdAt).toDateString()}}</p>
                        </div>
                        <div>
                            <p class=" custom display-3 font-weight-thin mb-3 white--text"">{{selectedArticle.title}}</p>
                            <p class=" custom headline font-weight-thin mb-3">posted by — {{selectedArticle.author.name}}</p>
                        </div>
                        <ul >
                            <li class="tag" v-for="tag in selectedArticle.tags">
                                <v-btn small color="transparent">{{tag.name}}</v-btn>
                            </li>
                        </ul>
                    </v-flex>
                </v-layout align-center justify-center fill-height>
            </v-parallax>

            <v-layout>
                <v-flex xs8 offset-xs2 class="mt-3">
                    <p class="title" v-html="selectedArticle.text">
                    </p>
                </v-flex>
            </v-layout>

        </v-container>
    `
})