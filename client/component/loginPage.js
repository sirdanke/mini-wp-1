

Vue.component('login-page', {

    data() {
        return {
            task: 'default'
        }
    },
    props: ['islogin'],
    methods: {
        toRegisterForm() {
            this.task = 'register'
        },
        formResponse(payload) {
            this.task = payload
        }
    },
    template: `
    <v-container fluid>

        <v-parallax src="../assets/parallax.jpg"
            height="700">   
                <v-layout>
                    <v-toolbar
                    color="transparent">
                        <div>
                            <img src="https://dewey.tailorbrands.com/production/brand_version_mockup_image/29/1793090029_83029712-e81a-4f6a-8ebe-51b2f07fc200.png?cb=1552701130" height="50">
                        </div>
                        <v-spacer></v-spacer>
                        <div v-if="!islogin" class="g-signin2" data-onsuccess="onSignIn"></div>
                        <v-btn @click.prevent="task = 'login'">
                            login
                        </v-btn>
                    </v-toolbar>
                </v-layout>

                <user-form v-if="task !== 'default'"
                @success-login="$emit('success-login')"
                @form-response="formResponse"
                :task="task"></user-form>

                <v-layout align-center justify-center fill-height v-if="task === 'default'">
                    <v-flex sm4 text-md-center>
                        <div> 
                            <img src="https://dewey.tailorbrands.com/production/brand_version_mockup_image/29/1793090029_83029712-e81a-4f6a-8ebe-51b2f07fc200.png?cb=1552701130">      
                        </div>
                        <div>
                            <p class="display-2 font-weight-thin mb-3">“A professional writer is an amateur who didn’t quit.”</p>
                            <p class="display-1 font-weight-thin mb-3"> — Richard Bach</p>
                        </div>
                        <div>
                            <v-btn large @click.prevent="task = 'register'">Join with Us</v-btn>
                        </div>
                    </v-flex>
                </v-layout align-center justify-center fill-height>
                
        </v-parallax>
        
        <v-layout row align-center justify-center fill-height>
            <v-flex>
                <div class="p-5">
                    <img src="../assets/idea.gif">
                </div>
                <div class="p-5">

                </div>
            </v-flex>

            <v-flex>          
                <div>
                    <p class="display-2 font-weight-thin mb-3 white--text">Share your Idea</p> 
                </div>
                <div>
                    <p class="headline font-italic mb-3 white--text">Join with many Independent writer from all over the World</p> 
                </div>
            </v-flex>
        </v-layout align-center justify-center fill-height>
    
       

        <v-parallax src="../assets/parallax.jpg">
            <v-layout align-center justify-center fill-height>
                <v-flex text-md-center>
                    <div>
                        <p class="display-2 font-weight-thin mb-3 black--text">Make A new Movement form Writing</p>
                    </div>
                    <div>
                        <p class="headline font-italic mb-3 black--text">Empowering your passion to change the World around you with the power of your writing</p>
                    </div>
                </v-flex>
                <v-flex>
                    <div>              
                        <v-btn @click.prevent="task = 'register'">Join with Us</v-btn>
                    </div>
                </v-flex>
            </v-layout align-center justify-center fill-height>
                    
        </v-parallax>

        <v-layout justify-center footer>
 
            <v-flex text-md-center>
                <div>
                    <p>
                        <img src="https://dewey.tailorbrands.com/production/brand_version_mockup_image/29/1793090029_83029712-e81a-4f6a-8ebe-51b2f07fc200.png?cb=1552701130">
                    </p>
                </div>
            </v-flex>
        </v-layout>
    
        </v-container>

    `,

})


