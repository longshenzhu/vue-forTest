import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
    state:{                                                  //状态集合,只读
        count : 2,
        messages: [
            {
            title:"hello",
            read : true
        },
        {
            title:"i love",
            read : false
        },
        {
            title:"you",
            read : false
        }],
        courseId : "first"
    },
    getters:{                                                  //提供通用的对state的计算属性
        messageCount: state => state.messages.length,
        messageUnread : state => state.messages.filter(item=> !item.read),
        messageReadCount: (state,getters) => getters.messageCount - state.messages.filter(item => !item.read).length

    },
    //mutations 必须是同步的数据变更。
    mutations:{                                                //对状态集合的修改,里面的方法需要通过$store.commit方法来调用
        addMessage(state,message){                             //方法第一个参数为state
            state.messages.push(message);              
        },
        removeMessage(state,times){
            for(var i=0;i< times;i++){
                state.messages.shift()
            }
            
        }
    },
    //actions 中可包含异步请求，actions是架构层的概念。需要改变状态时，触发mutations就可以。
    actions: {
        
        getMessages(context){                               //context：当前的vuex模块的$store
            fetch("http://192.168.1.49:8888/Api/Hbl/Test/GetMessages")
            .then( response => response.json())
            .then(data => {
                if(data.messages.length){
                    context.commit('addMessage',data.messages);
                }
            })
        }
    }
})