<template>
    <div class="guide">
        <div class="banner">
            <img class="before-class" src="~@/assets/images/guide_bg_1.png" />
        </div>
        <div class="main">
            <div class="list">
                <div class="li">
                    <svg class="svg-icon" aria-hidden="true">
                        <use xlink:href="#icon-place"></use>
                    </svg>
                    <div class="describe">
                        <div class="title">教室信息</div>
                        <div class="info">高教事业部</div>
                        <el-button type="text" @click="dialog = true">打开嵌套 Form 的 Drawer</el-button>
                    </div>
                </div>
            </div>
            <div class="footer">
                <button type="button" class="btn btn-lg" @click="readyClass">进入课堂</button>
            </div>
        </div>
        
        <el-drawer
            title="注册用户"
            :before-close="handleClose"
            :visible.sync="dialog"
            direction="ltr"
            custom-class="demo-drawer"
            ref="drawer"
            >
            <div class="demo-drawer__content">
                <el-form :model="form">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="form.userName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码确认" :label-width="formLabelWidth">
                    <el-input v-model="form.conformPassword" autocomplete="off"></el-input>
                </el-form-item>
                </el-form>
                <div class="demo-drawer__footer">
                <el-button @click="cancelForm">取 消</el-button>
                <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
    export default {
        name: "ready",
        data(){
            return {
                dialog: false,
                loading: false,
                form: {
                    userName: '',
                    password: ''
                },
                formLabelWidth: '80px',
                timer: null
            }
        },
        methods:{
            readyClass(){
                this.$router.push("/ppt/default")
                console.log("进入课堂")
            },
            handleClose(done) {
                if (this.loading) {
                    return;
                }
                this.$confirm('确定要提交表单吗？')
                    .then(_ => {
                    this.loading = true;
                    
                    let url = 'http://192.168.1.49:8888/Api/user/register';
                    fetch(url, {
                        method: 'post',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(this.form)
                    }).then(response => response.json())
                        .then(data => {
                            this.loading = false;
                            if(!data.success){
                                alert(data.message);
                                return;
                            }
                            console.log("addUser", data);
                        })
                        .catch(error => console.log("error is: ", error));
                    })
                    .catch(_ => {});
                },
            cancelForm() {
                this.loading = false;
                this.dialog = false;
            }
        }
    }
</script>

<style lang="scss">
    @import "~@/assets/style/var.scss";
    .guide{
        position: relative;
        display: flex;
        flex-direction: column;
        height: 100%;
        text-align: center;
        &.bgposition {
            background: url("~@/assets/images/guide_bg_2.png") no-repeat;
            background-size: 100% 295px;
            background-position:0 100%;
        }

        .banner {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 670px;
            width: 100%;
            background: url("~@/assets/images/guide_bg.png") no-repeat center;
            background-size: cover;
            border-bottom: 6px solid rgba(0, 0, 0, 0.25);
        }

        .list{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 60%;
            margin: 60px auto;

            .li {
                flex: 1;
                padding: 0 50px;
                display: flex;
                justify-content: center;
                align-items: center;

                .describe {
                    text-align: left;
                }

                .title {
                    margin-bottom: 5px;
                    color: $gray-4;
                }

                .info {
                    color: $gray-1;
                    font-size: 18px;
                    font-weight: bold;
                }
            }
        }
        .svg-icon {
            font-size: 90px;
        }
    }
    /*上课前*/
    .before-class {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    // .guide{
    //     position: relative;
    //     display: flex;
    //     flex-direction: column;
    //     height: 100%;
    //     text-align: center;
    // }

    // .guide.bgposition {
    //     background: url("~@/assets/images/guide_bg_2.png") no-repeat;
    //     background-size: 100% 295px;
    //     background-position: 0 100%;
    // }

    // .guide .banner{
    //     display: flex;
    //     flex-direction: column;
    //     justify-content: center;
    //     align-items: center;
    //     height: 670px;
    //     width: 100%;
    //     background: url("~@/assets/images/guide_bg.png") no-repeat center;
    //     background-size: cover;
    //     border-bottom: 6px solid rgba(0, 0, 0, 0.25);
    // }
</style>