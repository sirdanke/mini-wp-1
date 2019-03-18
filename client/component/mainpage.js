Vue.component('main-page', {
    data() {
        return {
            querySearch: '',
            searchedArticles: null,
            page: 1,
            pageArticles: [],
            icons: [
                'fab fa-facebook',
                'fab fa-twitter',
                'fab fa-google-plus',
                'fab fa-linkedin',
                'fab fa-instagram'
            ],
            onMainPage: true
        }
    },
    created() {
        this.fetchData()
    },
    props: ['is-login', 'current-page', 'all-articles'],
    components: {
        wysiwyg: vueWysiwyg.default.component,
        // VueTagsInput,
    },
    watch: {

        allArticles(newVal, oldVal) {
            this.allArticles = newVal
        }

    },
    methods: {
        search() {

            let regex = new RegExp('.*' + this.querySearch + '.*', "i")

            let array = []
            this.allArticles.forEach(e => {
                e.tags.forEach(tag => {
                    if (tag.name.match(regex)) {
                        array.push(e)
                    }
                })
            })
            this.searchedArticles = array


        },
        navigateToProfile() {
            this.$emit('navigate-to-profile')

        },
        readArticle(payload) {
            this.$emit('read-article', payload)
        },
        fetchData() {
            axios
                .get(`${urlLink}/postings`, { headers: { page: Number(this.page) - 1, limit: 9 } })
                .then(({ data }) => {
                    this.pageArticles = data

                })
                .catch(({ response }) => {
                    swal('sorry our server is busy');

                })

        },
        searchCategory(payload) {
            let data = this.allArticles.filter(a => {

                return a.category == payload
            })

            this.searchedArticles = data

        },
        home() {
            this.$emit('back-to-home')
            this.searchedArticles = null
            this.fetchData()
        }
    },
    template: `
        <v-container fluid v-if="currentPage == 'default'">

            <v-parallax src="../assets/mainpage.jpg"
            height="500"
            >   
                
                <navbar
                    :on-main-page="onMainPage"
                    @back-to-home="home"
                    @search-category="searchCategory"
                    @navigate-to-profile="navigateToProfile">
                </navbar>
                <v-layout align-center fill-height>
                    <v-flex sm8 text-md-center>
                            
                            <div>
                                <p class="display-3 font-weight-thin mb-3">"Discover our articles, tutorials 
                                and awesome tips”</p>
                                <p class="display-1 font-weight-thin mb-3"> find here </p>
                            </div>
                            <div>
                            <v-text-field
                                v-model="querySearch"
                                @change="search"
                                label="search by tag"
                            >
                            </v-text-field>
                            </div>
                    </v-flex>
                </v-layout>
                

            </v-parallax>

            <all-article
            @read-article="readArticle"
            :all-articles="allArticles"
            :page-articles="pageArticles"
            :searched-articles="searchedArticles"
            :current-page="currentPage"
            >
            </all-article>

            <v-layout align-center fill-height>
            <v-flex  text-md-center>
                <div class="text-xs-center">
                    <v-pagination
                        v-model="page"
                        :length="4"
                        circle
                        @input="fetchData"
                    ></v-pagination>
                </div>
            </v-flex>
            </v-layout>

            <v-footer
            class="light-blue darken-4" 

                height="auto"
            >
                <v-card
                class="flex"
                flat
                tile
                >
                    <v-card-title class="light-blue darken-4">
                        <strong class="subheading">Get connected with us on social networks!</strong>

                        <v-spacer></v-spacer>

                        <v-btn
                        v-for="icon in icons"
                        :key="icon"
                        class="mx-3"
                        lighten
                        icon
                        >
                        <v-icon size="24px">{{ icon }}</v-icon>
                        </v-btn>
                    </v-card-title>

                    <v-card-actions class="grey darken-3 justify-center">
                        &copy;2019 — <strong>MyMiniWp</strong>
                    </v-card-actions>
                </v-card>
            </v-footer>   
        </v-container>
    `
})


