<template>
  <v-app dark>
    <v-app-bar app color="deep-purple accent-4" dense dark>
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
      <nuxt-link
        to="/"
        style="text-decoration: none"
        class="text-h5 text--primary mr-2"
      >
        <span class="d-none d-md-flex">Tricking Library</span>
        <span class="d-flex d-md-none">TL</span>
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


      <IfAuthenticated>
        <template v-slot:allowed="{moderator,admin}">
          <div class="d-flex align-center">
<!--            <v-btn-->
<!--              v-if="moderator"-->
<!--              to="/moderation"-->
<!--              depressed-->
<!--              class="mx-2 d-none d-md-flex"-->
<!--            >-->
<!--              Moderation-->
<!--            </v-btn>-->
            <ContentCreationDialog />

            <v-menu offset-y >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  color="primary"
                  v-bind="attrs"
                  v-on="on"
                >
                  <UserHeader :link="false" :image-url="profile.image" size="36"/>
<!--                  <v-avatar size="36">-->
<!--                    <img v-if="profile.image"-->
<!--                         :src="profile.image"-->
<!--                         alt="profile image"-->
<!--                    />-->
<!--                    <v-icon v-else>mdi-account</v-icon>-->
<!--                  </v-avatar>-->
                </v-btn>
              </template>
              <v-list>
                <v-list-item to="/admin" v-if="admin">
                  <v-list-item-title>
                    <v-icon left>mdi-cogs</v-icon> Control Panel
                  </v-list-item-title>
                </v-list-item>

                <v-list-item to="/moderation" v-if="moderator">
                  <v-list-item-title>
                    <v-icon left>mdi-clipboard</v-icon> Moderation
                  </v-list-item-title>
                </v-list-item>

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
          <v-btn outlined @click="login" class="d-none d-md-flex">
            <v-icon left>mdi-login</v-icon> Log In
          </v-btn>
         <v-btn
           class="d-flex d-md-none"
           icon
           @click="login"
         >
           <v-icon>mdi-login</v-icon>
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
    <popup/>
  </v-app>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex'
import Popup from '@/components/Popup'
import ContentCreationDialog from "@/components/content-creation/ContentCreationDialog.vue";
import IfAuthenticated from "@/components/auth/IfAuthenticated";

export default {
  name:'default',

  components: {
    IfAuthenticated,
    Popup,
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
