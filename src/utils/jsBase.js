console.dir('Function',Function);
Function.prototype.call1 = function(context){
    context = context ? Object(context) : window;
    context.fn = this;
    let args = [];
    for(let i = 1;i < arguments.length; i++){
        // args.push('arguments['+ i + '']')
    }
}