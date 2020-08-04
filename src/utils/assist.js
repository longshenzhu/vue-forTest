//适用于独立组建的找到任意组件实例——findComponents 系列方法
//分为5种类型
//由一个组件，向上找到最近的指定组件；
//由一个组件，向上找到所有的指定组件；
//由一个组件，向下找到最近的指定组件；
//由一个组件，向下找到所有的指定组件；
//由一个组件，找到指定组件的兄弟组件；


function findComponentUpward(context, componentName){
    let parent = context.$parent;
    let name = parent.$options.name;

    while(parent && (!name || [componentName].indexOf(name) < 0)){
        parent = parent.$parent;
        if(parent)name = parent.$options.name;
    }
    return parent;
}

function findComponentsUpward(context,componentName){
    let parents = [];
    let parent = context.$parent;
    if(parent){
        if(parent.$options.name === componentName){
            parents.push(parent);
        }
        return parents.concat(findComponentsUpward(parent, componentName));
    }else{
        return [];
    }
}