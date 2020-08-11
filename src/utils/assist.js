//适用于独立组建的找到任意组件实例——findComponents 系列方法
//分为5种类型
//由一个组件，向上找到最近的指定组件；
//由一个组件，向上找到所有的指定组件；
//由一个组件，向下找到最近的指定组件；
//由一个组件，向下找到所有的指定组件；
//由一个组件，找到指定组件的兄弟组件；


function findComponentUpward(context, componentName){
    let parent = context.$parent;
    // console.log('parent',parent);
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

function findComponentDownward(context, componentName){
    const childrens = context.$children;
    let children = null;
    if(childrens.length){
        for (const child of childrens) {
            console.log('child',child);
            const name = child.$options.name;

            if(name === componentName){
                children = child;
                break;
            }else{
                children = findComponentDownward(child, componentName);
                if(children)break;
            }
        }
    }
    return children;
}

function findComponentsDownward(context, componentName){
    return context.$children.reduce((components,child)=>{
        if(child.$options.name === componentName)components.push(child);
        const foundChilds = findComponentsDownward(child,componentName);
        return components.concat(foundChilds);
    },[]);
    // const childrens = context.$children;
    // let childs = [];
    // if(childrens.length){
    //     for (const child of childrens) {
    //         if(child.name === componentName){
    //             childs.push(child); 
    //         }
    //         childs.concat(findComponentsDownward(child,componentName));
    //     }
    // }
    // return childs;
}

function findBrothersComponents(context, componentName, exceptMe = true){
    let childrens = context.$parent.$children.filter(child => {
        return child.$options.name === componentName;
    });
    let selfIndex = childrens.findIndex(item => item._uid == context._uid);
    if(exceptMe) childrens.splice(selfIndex, 1);
    return childrens;
}

export {
    findComponentUpward,
    findComponentsUpward,
    findComponentDownward,
    findComponentsDownward,
    findBrothersComponents
}