

Vue.component('article-form', {
    data () {
        return {
            image : '',
            text : '',
            title : '',
            tags : [],
            category : [
                'Programming',
                'Entertaiment',
                'Sport',
              ],
            select : '',
            preview : ''
        }
    },
    props : ['is-loading'],
    components : {
        wysiwyg: vueWysiwyg.default.component,
        // VueTagsInput,
    },
    methods : {
        getFile(e) {
            console.log('masuk at change');
            this.preview = URL.createObjectURL(e.target.files[0])
            this.image = e.target.files[0]
        },
        createArticle() {
            let obj = {
                title : this.title,
                text : this.text,
                tags : this.tags,
                category : this.select
            }
            let formData = new FormData()
            formData.append('image', this.image)
            formData.append('data', JSON.stringify(obj))
            this.$emit('create-new-article', formData)

        }
    },
    template: `
    <v-flex xs9
    class="ma-3">
        <v-form
        ref="form"
        enctype="multipart/form-data"
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
            @click.prevent="createArticle"
            >
            Submit
            </v-btn>

            <v-btn
            @click.prevent="reset"
            >
            Reset Form
            </v-btn>
            <div class="loader" v-if="isLoading"></div>

        </v-form>
    </v-flex>
    `
})