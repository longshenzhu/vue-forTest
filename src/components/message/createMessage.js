import Vue from 'vue';
import main from './message.vue';

let MessageContructor = Vue.extend(main);

const Message = function(options){
    options = options || {};
    if(typeof options === 'string'){
        options = {
            message : options
        };
    }

    //
    let instance = new MessageContructor({data:options});
    instance.$mount();
    document.body.appendChild(instance.$el);

    //覆写onClose事件，删除消息提示
    let userOnClose = options.onClose;
    options.onClose = function(){
        document.body.removeChild(instance.$el);
        if(userOnClose && typeof userOnClose === 'function'){
            userOnClose(instance);
        }
        
    }

    return instance;
}

export default Message;