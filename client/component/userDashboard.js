Vue.component('user-dashboard', {
    data() {
        return {
            activity : 'edit',
            userArticles : []
        }
    },
    props : ['all-articles', 'is-loading'],
    mounted () {
        this.getUserArticles()
    },
    computed : {
        articles : {

            get: function () {
                return this.allArticles
              },
              // setter
              set: function (newValue) {
                return newValue
              }
           
        }
    },
    watch : {
        
            allArticles(newVal, oldVal) {
              this.articles = newVal
              this.getUserArticles()
            }
          
    },
    methods : {
        sidenavReponse(payload) {
            this.activity = payload
        },
        createNewArticle(payload) {
            this.$emit('create-new-article', payload)
        },
        getUserArticles() {
            let id = localStorage.getItem('user')
            this.userArticles = this.articles.filter(a => {                
                return a.author._id == id
            })
        },
        deleteArticle(payload) {
            this.$emit('delete-article', payload)
        },
        editArticle(payload) {
            this.$emit('edit-article', payload)
        },
        home(){
            this.$emit('back-to-home')
        }
    },
    template : `
    <v-container fluid>
        <navbar
            @back-to-home="home">
        </navbar>
        <v-layout>
            <user-dashboard-sidenav
                @sidenav-response="sidenavReponse">
            </user-dashboard-sidenav>

                <edit-article
                    @edit-done="editArticle"
                    @delete-article="deleteArticle"
                    v-if="activity == 'edit'"
                    :user-articles="userArticles"
                >
                </edit-article>
                <article-form
                    v-if="activity == 'create'"
                    :is-loading="isLoading"
                    @create-new-article="createNewArticle">
                </article-form>
        </v-layout>
    </v-container>
        `
})