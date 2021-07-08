<template>
  <v-app dark>
    <v-app-bar app color="deep-purple accent-4" dense dark>
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
      <nuxt-link
        to="/"
        style="text-decoration: none"
        class="text-h5 text--primary"
      >
        Tricking Library
      </nuxt-link>

      <v-toolbar-title></v-toolbar-title>

      <v-spacer/>
      <NavbarSearch/>
      <v-spacer/>
      <!-- <v-btn
        depressed
        @click="toggleActive"
      >
        Upload
      </v-btn> -->
      <!-- <Upload/> -->
      <v-btn to="/moderation" depressed class="mx-2">Moderation</v-btn>

      <IfAuthenticated>
        <template v-slot:allowed>
          <div>
            <ContentCreationDialog />

            <v-menu offset-y >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-avatar size="36">
                    <img v-if="profile.image"
                         :src="profile.image"
                         alt="profile image"
                    />
                    <v-icon v-else>mdi-account</v-icon>
                  </v-avatar>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="$router.push('/profile')">
                  <v-list-item-title>
                    <v-icon left>mdi-account-circle</v-icon> Profile
                  </v-list-item-title>
                </v-list-item>

<!--                <v-list-item @click="$auth.signoutRedirect()">-->
                <v-list-item @click="logoutHandler">
                  <v-list-item-title>
                    <v-icon left>mdi-logout</v-icon> Logout
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </template>

       <template v-slot:forbidden="{login}">
          <v-btn outlined @click="login">
            <v-icon left>mdi-account-circle</v-icon> Log In
          </v-btn>
        </template>

      </IfAuthenticated>

<!--      <v-skeleton-loader-->
<!--          :loading = "loading"-->
<!--          transition="fade-transition"-->
<!--          type="button"-->
<!--          v-if="authenticated"-->
<!--      >-->
<!--      </v-skeleton-loader>-->

<!--      <v-skeleton-loader-->
<!--          :loading = "loading"-->
<!--          transition="fade-transition"-->
<!--          type="button"-->
<!--      >-->
<!--        <v-menu offset-y  v-if='authenticated'>-->
<!--          <template v-slot:activator="{ on, attrs }">-->
<!--            <v-btn-->
<!--              icon-->
<!--              color="primary"-->
<!--              dark-->
<!--              v-bind="attrs"-->
<!--              v-on="on"-->
<!--            >-->
<!--              <v-avatar size="36">-->
<!--                <img v-if="profile.image"-->
<!--                     :src="profile.image"-->
<!--                     alt="profile image"-->
<!--                />-->
<!--                <v-icon v-else>mdi-account</v-icon>-->
<!--              </v-avatar>-->
<!--            </v-btn>-->
<!--          </template>-->
<!--          <v-list>-->
<!--            <v-list-item @click="$router.push('/profile')">-->
<!--              <v-list-item-title>-->
<!--                <v-icon left>mdi-account-circle</v-icon> Profile-->
<!--              </v-list-item-title>-->
<!--            </v-list-item>-->

<!--            <v-list-item @click="$auth.signoutRedirect()">-->
<!--              <v-list-item-title>-->
<!--                <v-icon left>mdi-logout</v-icon> Logout-->
<!--              </v-list-item-title>-->
<!--            </v-list-item>-->
<!--          </v-list>-->
<!--        </v-menu>-->

<!--        <v-btn depressed outlined v-else @click="loginHandler">-->
<!--          <v-icon left>mdi-account-circle</v-icon> Log In-->
<!--        </v-btn>-->
<!--      </v-skeleton-loader>-->

    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex'
//import Upload from '../components/Upload.vue'
import ContentCreationDialog from "../components/content-creation/ContentCreationDialog.vue";
import IfAuthenticated from "../components/auth/IfAuthenticated";

export default {
  name:'default',
  components: {
    IfAuthenticated,
    //Upload,
    ContentCreationDialog
  },

  data() {
    return {};
  },

  computed:{
    ...mapState('auth',['profile']),
    ...mapGetters('auth',['moderator']),
  },

  // beforeMount(){
  //   this.$store.dispatch('clientInit')
  // },

  // computed:{
  //   ...mapState('auth',['loading','profile']),
  //   ...mapGetters('auth',['authenticated','moderator']),
  // },

  // fetch(){
  //   return this.$store.dispatch('clientInit')
  // }

  methods: {
    ...mapActions('auth',['logoutHandler']),
  },
};
</script>
