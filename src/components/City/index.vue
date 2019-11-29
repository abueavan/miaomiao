<template>
    <div class="city_body">
        <!-- <div class="city_list">
            <div class="city_hot">
                <h2>热门城市</h2>
                <ul class="clearfix">
                    <li>上海</li>
                </ul>
            </div>
            <div class="city_sort">
                <div>
                    <h2>A</h2>
                    <ul>
                        <li>阿拉善盟</li>
                        <li>鞍山</li>
                        <li>安庆</li>
                        <li>安阳</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="city_index">
            <ul>
                <li>A</li>
                <li>B</li>
                <li>C</li>
                <li>D</li>
                <li>E</li>
            </ul>
        </div> -->
        <div class="city_list">
          <loading v-if="isLoading" />
          <Scroller v-else ref="city_list">
            <div>
              <div class="city_hot">
                <h2>热门城市</h2>
                <ul class="clearfix">
                    <li v-for="item in hotList" :key="item.id" @tap="handleToCity(item)">{{ item.nm }}</li>
                </ul>
              </div>
              <div class="city_sort" ref="city_sort">
                  <div v-for="item in cityList" :key="item.index">
                      <h2>{{ item.index }}</h2>
                      <ul>
                          <li v-for="city in item.list" :key="city.id" @tap="handleToCity(city)">{{ city.nm }}</li>
                      </ul>
                  </div>
              </div>
            </div>
          </Scroller>
        </div>
        <div class="city_index">
            <ul>
                <li v-for="(item, index) in cityList" :key="item.index" @touchstart="handeToIndex(index)">{{ item.index }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  name: 'City',

  data () {
    return {
      cityList: [],
      hotList: [],
      isLoading: true
    }
  },

  mounted () {
    var cityList = window.localStorage.getItem('cityList')
    var hotList = window.localStorage.getItem('hotList')
    if (cityList && hotList) {
      this.cityList = JSON.parse(cityList)
      this.hotList = JSON.parse(hotList)
      this.isLoading = false
    } else {
      this.axios.get('/api/cityList').then((res) => {
        var msg = res.data.msg
        if (msg === 'ok') {
          var cities = res.data.data.cities
          this.isLoading = false
          var { cityList, hotList } = this.formatCityList(cities)
          this.cityList = cityList
          this.hotList = hotList
          window.localStorage.setItem('cityList', JSON.stringify(cityList))
          window.localStorage.setItem('hotList', JSON.stringify(hotList))
        }
      })
    }
  },

  methods: {
    formatCityList (cities) {
      let arr = []
      for (let i = 65; i < 91; i++) {
        arr.push(String.fromCharCode(i))
      }
      var cityList = []
      var hotList = []

      for (let i = 0; i < cities.length; i++) {
        if (cities[i].isHot === 1) {
          hotList.push(cities[i])
        }
      }
      for (let i = 0; i < arr.length; i++) {
        let cityArr = cities.filter(item => item.py.substring(0, 1) === arr[i].toLowerCase())
        if (cityArr.length !== 0) {
          cityList.push({
            index: arr[i],
            list: cityArr
          })
        }
      }

      return {
        cityList,
        hotList
      }
    },
    handeToIndex (index) {
      var h2 = this.$refs.city_sort.getElementsByTagName('h2')
      // this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop
      this.$refs.city_list.toScrollTop(-h2[index].offsetTop)
    },
    handleToCity (city) {
      this.$store.commit('city/CITY_INFO', { nm: city.nm, id: city.id })
      window.localStorage.setItem('nowNM', city.nm)
      window.localStorage.setItem('nowId', city.id)
      this.$router.push('/movie/nowplaying')
    }
  }
}
</script>

<style scoped>
#content .city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
.city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
.city_body .city_list::-webkit-scrollbar{
    background-color:transparent;
    width:0;
}
.city_body .city_hot{ margin-top: 20px;}
.city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
.city_body .city_sort div{ margin-top: 20px;}
.city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
.city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
.city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}
</style>
