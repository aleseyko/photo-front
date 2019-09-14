<template>
  <div class="upload">
    <a-upload name="image" :multiple="false" :headers="headers" :before-upload="beforeUpload" :fileList="fileList">
      <a-button>
        <a-icon type="upload"/>
        Click to Upload
      </a-button>
    </a-upload>
    <button @click="handleUpload">CLICK</button>
    <button @click="openLocationInfoDrawer">Open Drawer</button>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'AppUpload',
    data() {
      return {
        headers: {
          authorization: 'authorization-text',
        },
        fileList: [],
        locationInfoDrawerVisible: false,
      }
    },
    methods: {
      beforeUpload(file) {
        this.fileList = [file];
        return false;
      },
      handleUpload() {
        const {fileList} = this;
        if (fileList.length > 0) {
          const formData = new FormData();
          fileList.forEach((file) => {
            formData.append('image', file);
          });
          this.fileList = [];
          axios.post(' http://192.168.43.210:3000/photo/upload', formData);
          return formData;
        } else {
          return null;
        }
      },
    }
  }
</script>
