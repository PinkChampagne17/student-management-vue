import { Grid, GridItem, Tabbar, TabbarItem } from 'vant';

export default {
  components: {
    VanGrid: Grid,
    VanTabbar: Tabbar,
    VanGridItem: GridItem,
    VanTabbarItem: TabbarItem,
  },
  setup () {
    return () => (
      <div>
        <router-view></router-view>
        <van-tabbar route placeholder>
          <van-tabbar-item to={{ name: "classes" }} icon="friends-o">
            班级
          </van-tabbar-item>
          <van-tabbar-item to={{ name: 'me' }} icon="user-o">
            我
          </van-tabbar-item>
        </van-tabbar>
      </div>
    )
  }
}
