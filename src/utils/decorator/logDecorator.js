
function expCatch(componentPath){
    return function (target, name, descriptor){
        let oldValue = descriptor.value;
        if (typeof oldValue !== 'function') {
            console.error(`@time can only be used on functions, not: ${oldValue}`);
            return;
        }
        descriptor.value = function(){
            try {
                return oldValue.apply(this,arguments);
            } catch (error) {
                console.error(`bug所在组件：${componentPath}`);
                console.error(error)
            }
        }
        return descriptor;
    }
}

function log(target, name ,descriptor){
    var oldValue = descriptor.value;
    console.log(descriptor);
    descriptor.value = function(){
        console.log(`Calling ${name} with`,arguments);
        return oldValue.apply(this,arguments);
    }
    return descriptor;
}

export {
    expCatch,
    log
}