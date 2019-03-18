
const urlLink = 'http://localhost:3000'



function onSignIn(googleUser) {
    console.log('masuk ke function');

    var id_token = googleUser.getAuthResponse().id_token;
    axios
        .post(`${urlLink}/users/login/google`, { id_token })
        .then(({ data }) => {
            localStorage.setItem('access_token', data.data)
            localStorage.setItem('user', data.user)
            Vue.isLogin = true

        })
        .catch(err => {
            swal('opp, our server is busy, please try again')
        })
}



function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        Vue.isLogin = false
        localStorage.removeItem('access_token')
        localStorage.removeItem('user')
        Vue.loginCheck()
    });
}


const Toast = Swal.mixin({
    animation: true,
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});


var server = axios.create({
    baseURL: 'http://localhost:3000',
});

var Vue = new Vue({
    el: '#app',
    data: {
        isLogin: false,
        isRegister: false,
        currentPage: 'default',
        allArticles: [],
        selectedArticle: '',
        isLoading: false
    },
    created() {
        this.fetchData()
        this.loginCheck()
    },
    methods: {
        loginCheck() {
            if (localStorage.getItem('access_token')) {
                server
                    .post('/users/verification', {
                        token: localStorage.getItem('access_token')
                    })
                    .then(({ data }) => {
                        this.isLogin = true
                    })
                    .catch(({ err }) => {
                        // 
                        this.isLogin = false
                    })
            }
        },
        successLogin() {
            this.isLogin = true
        },
        fetchData() {
            axios
                .get(`${urlLink}/postings`, { headers: { page: 0, limit: 0 } })
                .then(({ data }) => {
                    this.allArticles = data
                })
                .catch(({ response }) => {
                    log(response)
                })

        },
        createNewArticle(payload) {
            this.isLoading = true
            axios
                .post(`${urlLink}/postings`, payload, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        access_token: localStorage.getItem('access_token')
                    }
                })
                .then(({ data }) => {
                    this.isLoading = false
                    
                    
                    this.allArticles = data
                    
                })
                .catch(err => {
                    this.isLoading = false
                    swal('oops! field cannot be blank make sure all the field is fullfillment')
                })
        },
        readArticle(payload) {
            this.currentPage = 'read'
            this.selectedArticle = payload 

        },
        deleteArticle(id) {
            swal({
                title: "Are you sure?",
                text: "You will not be able to recover this file!",
                icon: "warning",
                buttons: [
                    'No, cancel it!',
                    'Yes, I am sure!'
                ],
                dangerMode: true,
            }).then((isConfirm) => {
                if (isConfirm) {
                    swal({
                        title: 'Deleted!',
                        text: 'your article are successfully deleted!',
                        icon: 'success'
                    })
                        .then(() => {
                            axios
                                .delete(`${urlLink}/postings/${id}`, { headers: { access_token: localStorage.getItem('access_token') } })
                                .then((data) => {
                                    this.allArticles = data.data
                                })

                        })
                        .catch(err => {
                            swal('our server are busy, please try again')
                        })
                } else {
                    swal("Cancelled", "Your posting is safe :)", "error");
                }
            })

        },

        editArticle(payload) {
            this.allArticles = payload   
        },
        home() { 
            this.currentPage = 'default'
        }

    }
})