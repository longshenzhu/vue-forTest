<template>
  <div class="wrapper">
    <div class="pure-form">
        <input type="file" multiple="multiple" id="imgInput" />
    </div>
    <div class="pure-g">
        <div class="pure-u-1-3" v-for="(img,index) in imgs" v-bind:key="index" >
            <img :src="img" />
        </div>
        <div class="pure-u-1-3"><p>Thirds</p></div>
        <div class="pure-u-1-3"><p>Thirds</p></div>
    </div>
    <button @click="upload">点击上传</button>
  </div>
</template>

<script>

export default {
  name: 'imgUpload',
  computed:{
    count1(){
      return ""
    },
  },
  data () {
    return {
        imgs:[],
        msg: 'Welcome to Your Vue.js App',
    }
  },
  mounted() {
      this.watchInput();
    // console.log(add.add(8,9));
  },
  methods:{
      watchInput(){
          var self = this;
          let input = document.getElementById("imgInput");
          input.addEventListener("change",function(event){
              let files = this.files;
              let len = files.length;
              for(let i= 0;i<len;i++){
                  let fileReader = new FileReader();
                  let file = files[i];
                  fileReader.onload = function(){
                      self.imgs.push(this.result);
                      var params = {
                          Id: '123',
                          FileName: 'testImg.jpeg',
                          Type: 'jpeg' ,
                          Base64: this.result
                      };
                      // fetch('http://localhost:5000/api/file/test',{
                      //     method: 'GET',
                      //     headers: { 'Content-Type': 'application/json;charset=utf-8'}
                      // })
                      // fetch('https://localhost:44350/api/file/UploadBase64',{
                      //     method: 'POST',
                      //     body: JSON.stringify(params),
                      //     headers: { 'Content-Type': 'application/json;charset=utf-8'}
                      // })
                      fetch('http://localhost:5000/api/file/UploadBase64',{
                          method: 'POST',
                          body: JSON.stringify(params),
                          headers: { 'Content-Type': 'application/json;charset=utf-8'}
                      })
                  }
                  fileReader.readAsDataURL(file);
                  
              }

          });
      },
      upload(){

      }


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
