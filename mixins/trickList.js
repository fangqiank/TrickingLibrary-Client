export default{
    data:()=>(
        {
            filter:'',
            tricks:[],
        }
    ),
    
    computed:{
        filteredTricks(){
            if(!this.filter) 
                return null
                
            const searchItem = this.filter.trim().toLowerCase()
    
            return this.tricks.filter(x=>x.name.toLowerCase().includes(searchItem) ||
            x.description.toLowerCase().includes(searchItem))
        }
    }
}