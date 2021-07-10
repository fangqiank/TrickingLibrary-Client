import agent from "@/store/httpsAgent";

export const feed = (order, /*waitAuth = false*/) =>({
  data:()=>(
    {
      content: [],
      started: false,
      cursor: 0,
      limit: 10,
      order: order,
      finished: false,
      loading: false,
      //enabled: !waitAuth
    }
  ),

  props:{
    contentEndPoint:{
      required: false,
      type: String
    }
  },

  //remove oidc approach
  /* created(){
    return this.$store.dispatch('auth/watchUserLoaded')
      .then(() => {
        this.enabled = true
        this.loadContentsHandler()
      })
  },*/

  watch:{
    'order': function (){
      this.content= []
      this.cursor= 0
      this.finished= false
      this.started= false
      this.loadContentsHandler()
    }
  },

  computed:{
    query(){
      return `?order=${this.order}&cursor=${this.cursor}&limit=${this.limit}`
    }
  },

  methods:{
    getContentUrl(){
      return `${this.contentEndPoint}${this.query}`
    },

    scrollHandler(){
      if(this.finished || this.loading)
        return

      const loadMore = document.body.offsetHeight -(window.pageYOffset + window.innerHeight) < 500
      if(loadMore){
        this.loadContentsHandler()
      }
    },

    loadContentsHandler(){
      this.loading = true
      this.started = true

      return this.$axios.$get(this.getContentUrl(),{httpsAgent: agent() })
        .then(content => {
         // console.log('load content: ', content)
          this.finished= content.length < this.limit
          this.parseContentHandler(content)
          this.cursor += content.length
        })
        .finally(()=>this.loading = false)
    },

    parseContentHandler(content){
      content.forEach(x => {
        if(!this.content.some(y => y.id === x.id))
        this.content.push(x)
      })
    }
  },
})
