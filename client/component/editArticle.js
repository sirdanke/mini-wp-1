Vue.component('edit-article', {
    data () {
        return {
            image : '',
            text : '',
            title : '',
            tags : ['test'],
            category : [
                'Programming',
                'Entertaiment',
                'Sport',
              ],
            select : '',
            activity : 'default',
            preview : '',
            articleId : ''
        }
    },
    created() {
        this.activity = 'default'
    },
    methods : {
        editPreparation(payload) {
            this.activity = 'edit'
            this.title = payload.title
            this.text = payload.text
            this.image = payload.image
            this.preview = payload.image
            this.select = payload.category
            this.articleId = payload._id
            this.tags = payload.tags.map(a =>  a.name)

        },
        getFile(e) {
            this.preview = URL.createObjectURL(e.target.files[0])
            this.image = e.target.files[0]
        },
        editArticle() {
            
            let obj = {
                title : this.title,
                text : this.text,
                tags : this.tags,
                category : this.select,
                image : this.image
            }
            let formData = new FormData()
            formData.append('image', this.image)
            formData.append('data', JSON.stringify(obj))
            axios
                .patch(`${urlLink}/postings/${this.articleId}`, formData, {
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    }

                })
                .then(data => {
                    console.log(data);
                    this.activity = 'default'
                    this.$emit('edit-done', data.data)
                    swal('edit success')
                })
                .catch(err => {
                    swal('opps, our sever is busy please try again')
                })
        },

        deleteArticle(id) {
            this.$emit('delete-article', id)
        },
    },
    components : {
        wysiwyg: vueWysiwyg.default.component,
        // VueTagsInput,
    },
    props : ['user-articles'],
    template: `
    
            <v-flex xs8 offset 2 ma-3>
                <v-card color="blue-grey darken-2" class=" ma-3  white--text" 
                    v-if="activity == 'default'"
                    v-for="article in userArticles"
                    :key="article._id">
                    <v-card-actions>
                        <v-btn flat dark>{{article.title}}</v-btn>
                    </v-card-actions>
                    <v-card-actions>
                        <v-btn flat dark @click.prevent="editPreparation(article)">preview</v-btn>
                        <v-btn flat dark @click.prevent="deleteArticle(article._id)">delete</v-btn>
                    </v-card-actions>
                </v-card>

                <v-form ma-3
                    ref="form"
                    enctype="multipart/form-data"
                    v-if="activity == 'edit'"
                    >
                        <v-text-field
                            v-model="title"
                            label="title" 
                            >
                        </v-text-field>

                        <v-select
                            v-model="select"
                            :items="category"
                            label="Category"
                            required
                        >
                        </v-select>
                        <v-img :src="preview"></v-img>
                        <input
                            v-show="true" 
                            ref="inputUpload"
                            label="Image Attachment"
                            type="file"
                            @change="getFile"
                        ></input><br>
                        <label>Tags</label>
                        <input-tag v-model="tags"></input-tag>

                        <wysiwyg v-model="text" />

                        <v-btn
                        @click.prevent="editArticle"
                        >
                        Edit
                        </v-btn>

                        <v-btn
                        @click.prevent="reset">
                        Reset Form
                        </v-btn>

                </v-form>
            </v-flex>
    `
})