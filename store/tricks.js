import https from 'https'

const agent = new https.Agent({
    rejectUnauthorized: false
})

const initState = () => ({
    tricks:[],
    categories:[],
    difficulties:[]
})

export const getters = {
    trickById : state => id =>state.tricks.find(x=>x.slug === id),

    categoryById : state => id =>state.categories.find(x=>x.slug === id),

    difficultyById : state => id =>state.difficulties.find(x=>x.slug === id),

    trickItems: state =>state.tricks.map(x =>(
      {
         text:x.name,
         value:x.slug
      }
    )),

    categoryItems: state => state.categories.map(x =>(
        {
           text:x.name,
           value:x.slug
        }
    )),

    difficultyItems: state => state.difficulties.map(x =>(
        {
           text:x.name,
           value:x.slug
        }
    )),
}

export const state = initState

export const mutations = {
    setTricks(state, payload){
        //console.log('payload',payload)
        const {tricks,categories,difficulties} = payload
        state.tricks = tricks
        state.categories = categories
        state.difficulties = difficulties
    },

    reset(state){
        Object.assign(state,initState())
    }
}

export const actions = {
    async fetchTricks({commit}){
        try{

            const tricks = await this.$axios.$get('/api/tricks',{httpsAgent: agent })
            const categories = await this.$axios.$get('/api/categories',{httpsAgent: agent })
            const difficulties = await this.$axios.$get('/api/difficulty',{httpsAgent: agent })
            console.log(tricks)
            commit('setTricks', {tricks,difficulties,categories})
        }
        catch(err){
            console.log(err)
        }
    },

    async createTrick({},{form}){
        // const requestOptions = {
        //     method: 'POST',
        //     headers: {
        //        'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(form)
        //   }
        // return fetch('https://localhost:5001/api/tricks', requestOptions)
        //     .then(response => response.json())
        //     .then(data => console.log(data))

        this.$axios.setHeader('Content-Type', 'application/json', ['post','put'])

        console.log(JSON.stringify(form))

        const newTrick = this.$axios.$post(
           '/api/tricks',
           form,
          {httpsAgent: agent }
        )

        return newTrick
    },

  async updateTrick({state,commit,dispatch},{form}){

    this.$axios.setHeader('Content-Type', 'application/json', ['post','put'])

    // console.log(JSON.stringify(form))

    const updTrick = this.$axios.$put(
      '/api/tricks',
      form,
      {httpsAgent: agent }
    )

    return updTrick
  }
}
