const app = Vue.createApp({
    data(){
        return{
            title: "Contador App", 
            count: 0
        }
        
    },
    methods: {
        // disCount(){
        //     this.count--
        // },
        // addCount(){
        //     this.count++
        // }
        modifiCount(instruction = "add"){
            if(instruction === "dis"){

                if(this.count <= 0){  
                    this.count
                }else{ this.count--}
                
            }else{
                this.count++
            }
        }


        
    }, 

})