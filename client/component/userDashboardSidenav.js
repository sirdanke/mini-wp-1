Vue.component('user-dashboard-sidenav', {
    data () {
        return {
        }
    },
    template : `

    <v-flex sm2>
                <v-list class="elevation-5">


                    <v-list-tile class="sidenav-button" @click.prevent="$emit('sidenav-response', 'create')">

                        <v-list-tile-action>
                            <i class="material-icons">create</i>
                        </v-list-tile-action>

                        <v-list-tile-content>
                            <v-list-tile-title>Create</v-list-tile-title>
                        </v-list-tile-content>

                    </v-list-tile>

                    <v-list-tile class="sidenav-button" @click.prevent="$emit('sidenav-response', 'edit')">

                        <v-list-tile-action>
                            <i class="material-icons">edit</i>
                        </v-list-tile-action>

                        <v-list-tile-content>
                            <v-list-tile-title>Articles</v-list-tile-title>
                        </v-list-tile-content>

                    </v-list-tile>


                    </v-list-tile>
      

                </v-list>
                


            </v-flex>
        `
})