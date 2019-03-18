

Vue.component('user-form',{
    data() {
        return {
            name : '',
            password : '',
            email :''
        }
    },
    props : ['task'],
    methods : {
      register() {
        axios
          .post('http://localhost:3000/users', 
          {
            name : this.name,
            email : this.email,
            password : this.password
          })
          .then(({data})=> {
            this.$emit('form-response', 'login')
            console.log(data);
            
          })
          .catch(({response})=> {
            swal('field cannot be blank, make sure you fill all the field')
            console.log(response);
            
          })
          
      },
      login() {
        axios
          .post(`${urlLink}/users/login`, {email :this.email, password : this.password})
          .then(({data})=> {
            localStorage.setItem('user', data.user)
            localStorage.setItem('access_token', data.data)
            this.$emit('success-login')
          })
          .catch(({response})=> {
            swal('password or email wrong, please try again')
          })
      },
      clear() {

      }
    },
    template : `
    <v-container>
      <v-form>
        <v-text-field
          v-model="name"
          label="Name"
          required
          v-if="task === 'register'"
        ></v-text-field>
        <v-text-field
          v-model="email"
          label="E-mail"
          required
        ></v-text-field>
        <v-text-field
          :type="'password'"
          v-model="password"
          label="password"
          required
        ></v-text-field>
        
        <v-btn @click="register" v-if="task === 'register'">Register</v-btn>
        <v-btn @click="login" v-if="task === 'login'">login</v-btn>
        <v-btn @click="clear">clear</v-btn>
    </v-form>
  </v-container>
    `
})