import agent from "@/store/httpsAgent";

const initState = () => ({
    dictionaries:{
      tricks:null,
      categories:null,
      difficulties:null
    },
    lists:{
      tricks:[],
      categories:[],
      difficulties:[]
    },
})

// export const getters = {
//     trickById : state => id =>state.tricks.find(x=>x.slug === id),
//
//     categoryById : state => id =>state.categories.find(x=>x.slug === id),
//
//     difficultyById : state => id =>state.difficulties.find(x=>x.slug === id),
//
//     trickItems: state =>state.tricks.map(x =>(
//       {
//          text:x.name,
//          value:x.slug
//       }
//     )),
//
//     categoryItems: state => state.categories.map(x =>(
//         {
//            text:x.name,
//            value:x.slug
//         }
//     )),
//
//     difficultyItems: state => state.difficulties.map(x =>(
//         {
//            text:x.name,
//            value:x.slug
//         }
//     )),
// }

export const state = initState

const setEntities = (state,type, data) =>{
  state.dictionaries[type] = {}

  state.lists[type] = []

  data.forEach(x=>{
    state.lists[type].push(x)
    state.dictionaries[type][x.id] = x
    state.dictionaries[type][x.slug] = x
  })
}

export const mutations = {
    setTricks(state, payload){
        //console.log('payload',payload)
        const {tricks} = payload
        setEntities(state,'tricks', tricks)
    },

    setDifficulties(state, payload){
      //console.log('difficulty payload',payload)
      const {difficulties} = payload
      setEntities(state,'difficulties', difficulties)
    },

    setCategories(state, payload){
      //console.log(' category payload',payload)
      const {categories} = payload
      setEntities(state,'categories', categories)
    },

    reset(state){
        Object.assign(state,initState())
    }
}

export const actions = {
    async loadContents({commit}){
      return Promise.all(
        [
          this.$axios.$get('/api/tricks',{httpsAgent: agent() })
            .then(tricks => {
              //console.log('Tricks: ', tricks)
              commit('setTricks',{tricks})
             }),
          this.$axios.$get('/api/difficulties',{httpsAgent: agent() })
            .then(difficulties => commit('setDifficulties',{difficulties})),
          this.$axios.$get('/api/categories',{httpsAgent: agent() })
            .then(categories => commit('setCategories',{categories}))
        ]
      )
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

        const newTrick = this.$axios.$post(
           '/api/tricks',
           form,
          //{httpsAgent: agent() }
        )

        return newTrick
    },

  async updateTrick({state,commit,dispatch},{form}){

    this.$axios.setHeader('Content-Type', 'application/json', ['post','put'])

    // console.log(JSON.stringify(form))

    const updTrick = this.$axios.$put(
      '/api/tricks',
      form,
      {httpsAgent: agent()}
    )

    return updTrick
  }
}
