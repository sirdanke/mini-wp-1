Vue.component('all-article', {
    data() {
        return {
            
        }
    },

    props: ['page-articles', 'searchedArticles'],
    computed: {


        articles: {

            get: function () {
                if (this.searchedArticles != null) {
                    return this.searchedArticles
                } else {
                    return this.pageArticles
                }
            },
            // setter
            set: function (newValue) {
                return newValue
            }

        }
    },
    watch: {

        searchedArticles(newVal, oldVal) {
            this.articles = newVal
        }

    },

    template: `
        <v-layout justify-space-between class="mt-5">
        <v-flex xs10 offset-xs1>
            <v-layout wrap>
                <v-flex
                class="article-card"
                v-for="article in articles"
                :key="article._id"
                @click.prevent="$emit('read-article', article)"
                
                xs4 >
                    <v-card

                    class="article ma-3"
                    elevation="5">
                        <v-img 
                        class="zoom"
                        height="200px"
                        :src="article.image"
                        >
                            <v-container fill-height fluid>
                                <v-layout fill-height>
                              
                                </v-layout>
                            </v-container>
                        </v-img>
                        <v-card-title>
                        <div>
                            <span class="grey--text"></span><br>
                            <span  class="title font-weight-thin mb-3">{{article.title}}</span><br>
                        </div>
                        </v-card-title>
                        <v-card-actions>
                            <ul>
                                <li class="tag" v-for="tag in article.tags">
                                    <v-btn small color="transparent" class="ma-1">{{tag.name}}</v-btn>
                                </li>
                            </ul>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>

        </v-flex>
 

       
    </v-layout>
    

    
    `
})