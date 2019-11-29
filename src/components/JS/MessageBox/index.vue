<template>
  <div class="messageBox">
    <h2>{{ title}}</h2>
    <p>{{ content }}</p>
    <div class="choice">
      <div @touchstart="handleCancel">{{ cancel }}</div>
      <div @touchstart="handleOk">{{ ok }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageBox'
}
</script>

<style lang="scss" scoped>
.messageBox{
  width: 200px;
  height: 140px;
  border: 1px #ccc solid;
  border-radius: 4px;
  background: white;
  box-shadow: 3px 3px 3px 3px #ccc;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  h2{
    text-align: center;
    line-height: 40px;
    font-size: 18px;
  }
  p{
    text-align: center;
    line-height: 40px;
  }
  .choice{
    display: flex;
    position: absolute;
    bottom: 0;
    width: 100%;
    border-top: 1px #ccc solid;
    div{
      flex:1;
      text-align: center;
      line-height: 30px;
      border-right: 1px #ccc solid;
      &:last-child{
        border: none;
      }
    }
  }
}
</style>
