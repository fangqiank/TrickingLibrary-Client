import https from 'https'

const agent = new https.Agent({
  rejectUnauthorized: false
})

export const feed = (order) =>({
  data:()=>(
    {
      content: [],
      started: false,
      cursor: 0,
      limit: 10,
      order: order,
      finished: false,
      loading: false
    }
  ),

  props:{
    contentEndPoint:{
      required: false,
      type: String
    }
  },

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

      return this.$axios.$get(this.getContentUrl(),{httpsAgent: agent })
        .then(content => {
          console.log(content)
          this.finished= content.length < this.limit
          content.forEach(x => this.content.push(x))
          this.cursor += content.length
          
        })
        .finally(()=>this.loading = false)
    },
  },
})
