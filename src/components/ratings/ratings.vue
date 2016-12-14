<template>
  <div class="ratings" ref="ratingsContent">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect :ratings="ratings"></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-for="rating in ratings" class="rating-item">
            <div class="avatar">
              <img :src="rating.avatar" 　width="28" height="28">
            </div>
            <div class="content">
              <h1 class="name" >{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
                <p class="text">{{rating.text}}</p>
                <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                  <i class="icon-thumb_up"></i>
                  <span v-for="item in rating.recommend" class="item">{{item}}</span>
                </div>
                <div class="time">
                  {{rating.rateTime |　formatDate}}
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  @import "../../common/stylus/icon.styl";
  .ratings
    position absolute
    top 174px
    bottom 0
    width 100%
    overflow hidden
    .overview
      display flex
      padding 0 18px
      .overview-left
        flex 0 0 137px
        padding 6px 0
        width 137px
        border-right 1px solid rgba(7, 17, 27, .1)
        text-align center
        @media only screen and (max-width 320px)
          flex 0 0 120px
          width 120px
        .score
          margin-bottom 6px
          line-height 28px
          font-size 24px
          color rgb(255, 153, 0)
        .title
          margin-bottom 8px
          line-height 12px
          font-size 12px
          color rgb(7, 17, 27)
        .rank
          line-height 10px
          font-size 10px
          color rgb(147, 153, 159)
      .overview-right
        flex 1
        padding 6px 0 6px 24px
        @media only screen and (max-width 320px)
          padding 6px 0 6px 6px
        .score-wrapper
          margin-bottom 8px
          line-height 18px
          font-size 0
          .title
            display inline-block
            line-height 18px
            vertical-align top
            font-size 12px
            color rgb(7, 17, 27)
          .star
            display inline-block
            margin 0 12px
            vertical-align top
          .score
            display inline-block
            line-height 18px
            vertical-align top
            font-size 12px
            color rgb(255, 253, 0)

      .delivery-wrapper
        font-size 0
        .title
          line-height 12px
          font-size 12px
          color rgb(7, 17, 27)
        .delivery
          font-size 12px
          margin-left 12px
          color rgb(147, 153, 159)

    .rating-wrapper
      padding 0 18px
      .rating-item
        display flex
        padding 18px 0
        border-1px(rgba(7, 17, 27, .1))
        .avatar
          flex 0 0 28px
          width 28px
          margin-right 12px
          img
            border-radius 50%
      .content
        position relative
        flex 1
        .name
          margin-bottom 4px
          line-height 12px
          font-size 10px
          color rgb(7, 17, 27)
        .star-wrapper
          margin-bottom 6px
          font-size 0
          .star
            display inline-block
            margin-right 6px
            vertical-align top
          .delivery
            display inline-block
            vertical-align top
            line-height 12px
            font-size 10px
            color rgb(147, 153, 159)
        .text
          margin-bottom 8px
          line-height 18px
          color rgb(7, 17, 27)
          font-size 12px
        .recommend
          line-height 16px
          .item
            display inline-block
            margin 0 8px 4px 0
            font-size 9px
          .icon-thumb_up
            display inline-block
            margin 0 8px 4px 0
            font-size 9px
            color rgb(0, 160, 220)
          .item
            padding 0 6px
            border 1px solid rgba(7, 17,27 ,.1)
            border-radius 1px
            color  rgb(147,153,159)
            background #ffffff
        .time
          position absolute
          top 0
          right 0
          line-height 12px
          font-size 10px
          color rgb(147,153,159)
</style>
<script>
  import star from 'components/star/star';
  import ratingselect from 'components/ratingselect/ratingselect';
  import split from 'components/split/split';
  import axios from 'axios';
  import ParseTime from 'chen-parse-time';
  import BScroll from 'better-scroll';
  const ERR_OK = 0;
  const ALL = 2;
  export default{
    data() {
      return {
        ratings: [],
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        scroll: {}
      };
    },
    filters: {
      formatDate(time) {
        return ParseTime.getTime(Number(time) / 1000, 'YYYY-MM-dd hh:mm');
      }
    },
    methods: {
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false;
        };
        if (this.selelctType === ALL) {
          return true;
        } else {
          return type === this.selelctType;
        }
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      axios.get('/api/ratings')
        .then((res) => {
          var data = res.data;
          if (data.errno === ERR_OK) {
              this.ratings = data.data;
                this.$nextTick(() => {
                  this.scroll = new BScroll(this.$refs.ratingsContent, {
                    click: true
                  });
              });
            };
        });
    },
    computed: {
      selelctType() {
        this.$nextTick(() => {
            this.scroll.refresh();
          });
        return this.$store.state.goods.foodType;
      },
      onlyContent() {
        this.$nextTick(() => {
            this.scroll.refresh();
          });
        return this.$store.state.goods.onlyContent;
      }
    },
    components: {
      star,
      ratingselect,
      split
    },
    props: {
      seller: {
        type: Object
      }
    }
  };

</script>
