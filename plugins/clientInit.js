import {UserManager,WebStorageStateStore} from 'oidc-client'

export default async ({app, store}, inject) =>{
    const userManager = new UserManager(
        {
            authority:'https://localhost:5001',
            client_id: 'nuxt-client',
            //redirect_uri: 'http://localhost:3000',
            redirect_uri: 'https://localhost:3000/oidc/sign-in-callback.html',
            response_type: 'code',
            
            // from backend:
            // AllowedScopes = new List<string>()
            //               {
                //                   IdentityServerConstants.StandardScopes.OpenId,
                //                   IdentityServerConstants.StandardScopes.Profile,
                //                   IdentityServerConstants.LocalApi.ScopeName
                //               },
            scope:'openid profile IdentityServerApi role',
            post_logout_redirect_uri: 'https://localhost:3000',
            silent_redirect_uri:'https://localhost:3000/oidc/sign-in-silent-callback.html',
            userStore: new WebStorageStateStore({store:window.localStorage}),  
            //monitorSession:  false,
        }
    )

    // userManager.events.addUserSignedOut(
    //     ()=>{
    //         console.log("user signed out")
    //     }
    // )

            
    inject('auth', userManager)

    app.fetch = () =>{
        return store.dispatch('clientInit')
    }

}