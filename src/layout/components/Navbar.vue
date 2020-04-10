<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb v-show="breadcrumb" id="breadcrumb-container" class="breadcrumb-container" />
    <div class="hall_list">
      <span style="margin:0 10px 0 0;">店铺</span>
      <el-dropdown
        trigger="click"
        placement="bottom-start"
      >
        <el-button icon="el-icon-menu">{{ menuText() }} <i class="el-icon-caret-bottom el-icon--right" /></el-button>
        <el-dropdown-menu v-if="hall_list.length>1" slot="dropdown">
          <el-dropdown-item v-for="(item,index) in hall_list" :key="index" :divided="index!==0">
            <div class="dropdown-item-box" @click="change(item.Id)">{{ item.HallName }}</div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <div class="right-menu">
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar size="medium" :src="th+'?imageView2/1/w/80/h/80'" />
          <div style="display: inline-block; position: relative; top: -10px;">
            {{ name }}
            <i class="el-icon-caret-bottom" />
          </div>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="$refs.editPassWord.handleOpen()">
            <span style="display:block;">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <EditPassWord ref="editPassWord" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import EditPassWord from './edit-password'
export default {
  name: 'Navbar',
  components: {
    Breadcrumb,
    Hamburger,
    EditPassWord
  },
  props: {
    breadcrumb: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      th: 'https://static.getfitvip.com/kepulogo.png'
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name',
      'device',
      'hall_list',
      'hall_key'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    UpdatePassword() {

    },
    change(id) {
      if (!id) return
      this.$store.dispatch('user/changeHallKey', id)
    },
    menuText() {
      const find = this.hall_list.find(i => {
        return i.Id === this.hall_key
      })
      let HallName = ''
      if (find) {
        HallName = find.HallName
      }
      return HallName
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }
  .hall_list {
    float: left;
    width: 300px;
    height: 100%;
    line-height: 50px;
    font-size: 16px;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
